# Limit Order Book and Matching

Perpetuals on dYdX Chain trade on a decentralized limit order book and matching engine.

This document helps traders accustomed to centralized exchanges to understand the differences they will encounter when trading on dYdX Chain.

## Blockchain Overview
<!-- TODO: Move this to a general explainer section and link to it -->
dYdX Chain is a p2p blockchain network built with [CosmosSDK](https://github.com/cosmos/cosmos-sdk) (a blockchain application framework) and [CometBFT](https://github.com/cometbft/cometbft) (a consensus protocol, formerly Tendermint). 

Anyone can use the open source software to run a full node. Full nodes with enough delegated governance tokens participate in block-building as validators. 

The software repository is: https://github.com/dydxprotocol/v4-chain/

## Limit Order Book
Each full node in the network maintains an in-memory order book, which undergoes state changes in real time as traders submit order instructions.

To build a block, the block proposer uses the set of trades resulting from order matches seen in the proposer's local version of the order book. Matches are generated according to price-time priority.

The order of message arrival differs between full nodes. As a result, the order book is not guaranteed to be identical across the network at any given point in time. To address this, each time a new block is committed by consensus, nodes update their local books to reflect the committed block.

### Subscribing to the Order Book State

Use the [Full Node Streaming](./api_integration-full-node-streaming.md) API to subscribe to a full node's book state.

## Matching and Block Processing

In addition to ordinary limit order matching rules:
1. Cancel instructions are cached, in case a cancel arrives before an order's placement.
2. Every block, the node's local changes are undone, the block's changes are applied, and the node's local changes are reapplied on top. This partially syncs the local state with the network's state.

### Details 

1. When a cancel instruction is received, the node cancels the existing order (removing it from its local order book).
    - If the order is already matched locally, the node is unable to cancel the order.
    - The node will also store the cancel instruction locally until it expires (based on [the GTB field of the cancel message](https://github.com/dydxprotocol/v4-chain/blob/4780b4cba2cab75e0af5675c3e87e551162ecf33/proto/dydxprotocol/clob/tx.proto#L90)).
2. When an order is received, it will fail to place if it has already been cancelled.
    - Otherwise, it will be matched and/or placed on the order book accordingly. These optimistic matches are stored locally.
3. When a validating node proposes a block, it proposes all of its local matches.
4. When a node processes a block approved by consensus, it starts from the state of the prior block (i.e. the local state used to propose will not be considered):
    - First, the block’s proposed changes are persisted.
    - Then, a new local state is created on top of this new block. The prior local state is replayed onto this new local state.
        - Cancels are persisted.
        - All orders that matched in the prior local state are re-placed using the normal placement process.
        - These orders may end up matching with different orders or not matching at all this time. They also might fail to place due to cancellation.

### Source Code References

- See [here](https://github.com/dydxprotocol/v4-chain/blob/dc6e0a004fd81e3139a24f88b10605ab5ce16cfd/protocol/x/clob/ante/clob.go#L90) and [here](https://github.com/dydxprotocol/v4-chain/blob/2d5dfa55357abd5ead46f8baa03ed76d420849cc/protocol/x/clob/memclob/memclob.go#L103) for how the protocol reacts when (1) a cancel is seen.

- When (2) [an order is placed](https://github.com/dydxprotocol/v4-chain/blob/dc6e0a004fd81e3139a24f88b10605ab5ce16cfd/protocol/x/clob/ante/clob.go#L132) and [checked to not be already cancelled](https://github.com/dydxprotocol/v4-chain/blob/749dff9cbca56eb2a6ab3a19feeb338de8db80e6/protocol/x/clob/keeper/orders.go#L780).

- When (3) [proposing a block](https://github.com/dydxprotocol/v4-chain/blob/189b11217490aa5a87a4108dde0f679b0190511b/protocol/app/prepare/prepare_proposal.go#L157).

- And (4) when [nodes process blocks committed by consensus](https://github.com/dydxprotocol/v4-chain/blob/4780b4cba2cab75e0af5675c3e87e551162ecf33/protocol/x/clob/abci.go#L152).

## Order Messages

Order instructions are limit order placements, replacements, and cancellations.

> Note: this section applies to short-term orders, which live off-chain in the node's memory.
> 
> There is a second type of order (stateful) which lives fully on-chain (i.e. can only match at the speed of consensus) used for longer-lived limit orders. We do not recommend API traders use stateful orders. 
> 
> See [here](./api_integration-trading/short_term_vs_stateful) for more information.

### Finality and GTB
Each limit order placement or cancellation [has a GTB (good-til-block) field](https://github.com/dydxprotocol/v4-chain/blob/dc6e0a004fd81e3139a24f88b10605ab5ce16cfd/proto/dydxprotocol/clob/order.proto#L114-L146), which specifies the block height after which the instruction expires.

It is rare but possible for a cancel instruction to be seen by the current block proposer but not by one or more subsequent proposers. In such cases, the order could still match after the sender expects it to have been cancelled.

Therefore, we recommend that API traders consider setting tight GTB values (e.g. the current chain height + 3) because expiry due to GTB is the only guaranteed way for an order to become unfillable. Consensus does not permit any order to fill at a height greater than its GTB.

### Replacements

Similarly, we recommend traders use replacement instructions instead of cancelling and placing a new order.

This is because replacing an order limits the trader's total exposure compared to "place order A, cancel order A, place order B", where theoretically both A and B could fill at once, unless the chain height had passed A’s GTB.

#### Replacement Instruction Fields

To replace an order, send a placement with the same order ID **and a larger GTB value**.

Note that two orders have the same order ID if the following client-specified fields are equal (from [OrderId proto definition](https://github.com/dydxprotocol/v4-chain/blob/dcd2d9c2f6170bd19218d92cf6f2f88216b2ffe1/proto/dydxprotocol/clob/order.proto#L9-L41)):
- [Subaccount ID](https://github.com/dydxprotocol/v4-chain/blob/dcd2d9c2f6170bd19218d92cf6f2f88216b2ffe1/proto/dydxprotocol/subaccounts/subaccount.proto#L10-L17).
   - order.subaccount_id.owner should be set to the address that is signing the order transaction.
   - order.subaccount_id.number should be set to 0 unless using a different subaccount.
- Client ID.
- Order flags (always 0 for short-term orders).
- CLOB pair ID.
