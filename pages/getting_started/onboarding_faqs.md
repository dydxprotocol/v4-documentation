# Onboarding FAQs

## Intro

1. Can you give an overview of the structure of the network and the role full nodes/validators play in constructing the orderbook and participating in block building, and how trades are placed?
    - dYdX Chain (or "v4") is composed of full nodes and each maintains an in-memory order book. Anyone can use the open source software to run a full node. Traders can submit order placements and cancellations to full nodes, which gossip the transactions amongst themselves.
    - Full nodes with enough delegated layer 1 governance tokens participate in block building as validators. Validators on dYdX Chain take turns proposing blocks of trades every ~1 second. The validator whose turn it is to propose a block at a given height is called the proposer. The proposer uses its mempool orderbook to propose a block of matches, which validators either accept or reject according to CometBFT (Tendermint) consensus.
    - All full nodes have visibility into the consensus process and the transactions in the mempool. Another component of dYdX Chain is the indexer software, an application that reads data from full nodes and exposes it via REST / WebSocket APIs for convenience. 

2. What is the difference between a full node and a validator?
    - A full node does not participate in consensus. It receives data from other full nodes and validators in the network via the gossip protocol. A validator participates in consensus by broadcasting votes signed by each validator’s private keys. 

3. What are the benefits of running a full node as a market maker?
    - Running a full node will eliminate the latency between placing an order and when the actual order is gossipped throughout the network. Without your own node, your order will need to first be relayed to the nearest geographic node, which will then propagate it throughout the network for you. With your own node, your order will directly be gossiped. 
    - Instructions on how to set up a full node can be found [here](https://docs.dydx.exchange/validators/how_to_set_up_full_node).

4. What is the current block time?
    - The current block time is ~1 second on average

5. What is an indexer?
    - The indexer is a read-only service that consumes real time data from dYdX Chain to a database for visibility to users. The indexer consumes data from dYdX Chain via a connection to a full node. The full node contains a copy of the blockchain and an in-memory order book. When the full node updates its copy of the blockchain and in-memory order book due to processing transactions, it will also stream these updates to the indexer. The indexer keeps the data in its database synced with the full-node using these updates. This data is made available to users querying through HTTPS REST APIs and streaming via websockets. More info can be found [here](https://docs.dydx.exchange/architecture/indexer).

## Trading on an Exchange Run on dYdX Chain

1. What are the different order types in dYdX Chain?
    - There are two order types: Short-Term orders and stateful orders.
        - Short-Term orders are meant for programmatic, low-latency traders that want to place orders with shorter expirations.
        - Stateful orders are meant for retail that wants to place orders with longer expirations. These orders exist on chain.

2. How does the orderbook work in dYdX Chain for short-term orders?
    - Each validator runs their own in-memory orderbook (also known as mempool), and the set of orders each validator knows about is what order placement transactions are in their mempool.
    - User places a trade on a decentralized front end (e.g., website) or via the typescript or python client that places orders directly to a full node or validatorAPI
    - The consensus process picks one validator to be the block proposer. The selected validator will propose their view of the matches in the next proposed block.
    - If the matches are valid (orders cross, subaccounts well-collateralized, etc.) and accepted by ⅔+ of validator stake weight (consensus), then the block is committed and those matches are written to state as valid matches.
    - After the block is committed, the updated on-chain (and off-chain) data is streamed from full nodes to Indexers. The Indexer then makes this data available via API and websockets back to the front end and/or any other outside services querying for this data.
    - Note: the block proposer’s matches are the canonical matches for the next block assuming their block is accepted by consensus.
        - Other validators maintain a list of matches and those matches might differ from the block proposer’s matches, but if they’re not the block proposer those matches will not be proposed in the next block.
        - Similarly, the indexer is not the block proposer so its list of matches might be different from the block proposer’s matches, until the network reaches finality.

3. Why should market makers only use short-term orders?
    - Short-Term orders are placed and can be immediately matched after they’re added to the mempool, while stateful orders can only be placed and matched after they’re added to a block.
        - Short-Term orders should always have superior time priority to stateful orders.
        - Stateful orders have worse time priority since they can only be matched after they are included on the block, short-term orders can be matched in the same block
    - Short-Term orders have less restrictive rate limits than stateful order rate limits. See rate limits later on in this section
    - Short-Term orders can be replaced, and stateful orders currently don’t support replacement.
    - Short-Term orders can be canceled immediately after they’re placed, while stateful orders can only be canceled after they’ve been included in a block.
    - Short-Term orders can be received by validators in any order, while stateful orders have an ordering requirement and will fail to be placed if they’re received out of order.
        - This is because stateful orders use a “sequence number”, which is equivalent to a nonce on Ethereum. Short-Term orders don’t use this.

4. How can I understand how finality works on dYdX Chain?
    - When your order fills, a block proposer will propose a block containing the fill (visible to the whole network), and then the block will go through consensus. If the block is valid it will be finalized a couple seconds later (in Cosmos-speak this happens at the “commit” stage of consensus after all validators have voted). At that point, an indexer service will communicate the fill to you.
    - It is recommended to post orders with a “Good-Til-Block” of the current block height, and adjusting prices once per block. If the block is published without a match to your order, you know that it is no longer active and did not fill.

5. How can I place a short-term order?
    - Please use the latest dYdX Chain [typescript client](https://www.npmjs.com/package/@dydxprotocol/v4-client-js) to place orders
    - Please refer to the [order.proto](https://github.com/dydxprotocol/v4-chain/blob/main/proto/dydxprotocol/clob/order.proto) for parameter and field definitions
    - For more advanced order placements, please refer to the validator client [v4-proto-js](https://github.com/dydxprotocol/v4-chain/tree/76ef1aefc1bc7ab393c20512e0940ea2be018cdc/v4-proto-js) or [v4-proto-py](https://github.com/dydxprotocol/v4-chain/tree/76ef1aefc1bc7ab393c20512e0940ea2be018cdc/v4-proto-py).

6. How can I tell if the block proposer has placed my short-term order?
    - The block proposer has proposed and filled the order in the block.
    - The block proposer has the order in their mempool.

7. How can I tell if my short-term order is canceled?
    - Short-term order placements and cancellations are best-effort, and therefore their cancels and placement can't be considered actually canceled and unfillable until expiry
    - A FOK or IOC order can also be seen as canceled if a fill does not occur after expiry
    - The indexer does not send a websocket notification if a short-term order has been canceled
    - However, since the goodTilBlock for the cancel needs to be set when placing the cancel, the block height can be checked to ensure that the cancel was successful
    - This is lower latency than what a websocket notification could provide

8. How can I replace an order?
    - Replacing an order reuses the short-term order placement function with the [same order ID](https://github.com/dydxprotocol/v4-chain/blob/76ef1aefc1bc7ab393c20512e0940ea2be018cdc/proto/dydxprotocol/clob/order.proto#L10) and an equal-to-or-greater good til block
    - Note: when replacing partially-filled orders, the previous fill amount is counted towards your current order.
        - Example: Buy 1 BTC order @ $20k is filled for 0.5 BTC. After replacing that order with a Buy 2 BTC order @ $25k, that order can only be filled for a maximum of 1.5 BTC. This is because the previously replaced order was already filled for 0.5 BTC.

9. Are fills computed/updates steamed only when a block is finalized? How about order placements? 
    - Fills are computed only when a block is finalized
    - Short term order place / cancel (including IOC / FOK orders being canceled due to not filling / being on the book or POST-ONLY orders crossing) are streamed when the full node the Indexer deployment is listening to receives the order / cancel and not only when the block is finalized
        - This is why the status “BEST_EFFORT_OPENED” or “BEST_EFFORT_CANCELED” since the Indexer only knows that a full-node received the order / cancel, and it’s not guaranteed to be true across the whole network
    - For the orderbook updates, these are sent when the full-node the Indexer is listening to receives orders / cancels and not just when the block is finalized
        - For example, when the full-node receives a short term order it will be approximate how much is filled and how much would go on the orderbook. This is what the Indexer uses to stream orderbook updates. However, there is no guarantee that the orderbook looks the same in other nodes in the network
    - Note that you can now stream the orderbook directly through your full node for the orderbook. Read more about that [here](https://docs.dydx.exchange/guides/orderbook_stream).

10. Do orders get matched and removed from the book in between blocks?
    - For removal of short term orders, yes they can be removed in between blocks, however this is on a node-by-node basis and not across the whole network
        - E.g. a short-term order could be removed on one node, but still be present on another
        - When a short-term order expires (current block height > goodtilBlock), then it is guaranteed to be removed from all nodes
    - For removal of stateful orders, they can be removed from the book in-between blocks. This is on a node-by-node basis
        - If the node removing the stateful orders is the block proposer, these stateful order removals will also be propagated to all other nodes, an be entirely removed from the network
    - For all orders, regarding matching
        - For matching, each node on the network will attempt to match the orders as they are received in-between blocks
        - Per block, only 1 node (the block proposer) will propagate the matches it’s done during the block to all other nodes in the network. Validator nodes take turns being the block proposer based on their stake weight
        - If a set of validators with ⅔+ of the stake weight of the network see the matches propagated as valid, then those matches are included in the block when finalized
        - The only matches that occur on the network are the ones in the block

11. Do certain order types have priority? Are cancels prioritized?
    - Short term orders when received by a node will be matched against it’s in-memory orderbook
        - Cancels of short-term orders are also processed by a node when received
    - Stateful orders (long-term / conditional) are matched at the end of the block when they are received
        - E.g. Stateful orders have at least a 1 block-time delay (it’s possible the order does not get included in the block) between a node receiving the order, and it being matched
        - Stateful order placement will be processed AFTER short-term order placements and cancellations for a block
    - Stateful order cancellations are also done at the end of the block they are received
        - The stateful order cancellations are also processed AFTER short-term placements and cancellations for a block
    - As mentioned above, only the matches from the block proposer will be included in the block (if a set of validators with ⅔+ of the stake weight of the network see the matches as valid)

12. How does the order cancellation mechanism work? Is it necessary for the cancel instruction and the original order to be on the same validator for a successful cancel? What's the best practice to ensure order cancellation succeeds?
    - Short-term:
        - When validators receive a cancellation, if they don't already see a match for the order, they will remove the order from their order book
        - Only once every validator receives the cancellation is when the order will no longer be able to be matched
        - The other way an order would no longer be matchable is if the block height is past the good til block
    - Long-term:
        - Once a stateful order cancellation is included into a block, the order will be canceled and no longer matchable. This could take 1s+ for a cancelation to be included in a block

13. Why is it slower to cancel orders than place orders?
    - An order placement only needs to be on a single validator to have a match happen, but the cancellation has to have arrived at the block proposer, but since the BP rotates, to be completely sure that the order wont be matched, it has to arrive at all the validators who will be block proposer before the order expires. This is why cancelations seem to be guaranteed slower than placing / matching orders.

14. How do order statuses transition for the Indexer, for short-term and long-term orders?
    - Short-term
        - Once the order is placed and seen by the Indexer's full-node, the order has status BEST_EFFORT_OPENED
        - If the order is matched and has a fill in a block, the order has status OPEN
        - If the order is fully-filled, the order has status FILLED
        - If the order is canceled by a cancel order message, the order will be status BEST_EFFORT_CANCELED , the order may still have fills if other validator nodes haven't received the cancel message yet
        - If the order expires due to the block height exceeding the good til block of the order, the order status will be CANCELED, the order no longer can be filled
    - Long-term
        - Once the order is placed and included in a block, the order has status OPEN
        - If the order is fully filled, the order has status FILLED
        - If the cancelation of the order is included in a block, the order has status CANCELED the order can no longer be filled

15. How do subaccounts work on dYdX Chain?
    - Each address’s subaccounts all fall under a single address, but they are labeled subaccount0, subaccount1, etc. This is unlike v3, where each subaccount was a secondary address.
    - To begin trading, you need to make sure your funds are in your subaccount. You can do this two ways: 
        - Frontend: Simply leave your frontend open and it will automatically sweep.
        - Backend: Simply transfer USDC to it like in [this example](https://github.com/dydxprotocol/v4-clients/blob/main/v4-client-js/examples/transfer_example_subaccount_transfer.ts).

16. When I transfer funds to create a new subaccount (the only way to create new subaccount btw), do I need gas?
    - Yes, you will need gas. Fortunately, both USDC and cosmos native DYDX can be used to pay for gas fees. This USDC must be in the main wallet and not another subaccount to pay for fees.
    - To ensure this, the frontend leaves a small amount of USDC in your wallet when sweeping into your subaccount, to ensure there's enough to pay for gas.

17. What impact do subaccounts have on rate limits?
    - Rate limits are per account, and not per subaccount. 

18. How do we compete for liquidation orders?
    - If you run a full-node, there is a liquidations daemon that has metrics on what accounts are up for liquidation orders, and they could try and compete for liquidations that way.
    - However, this is not at all documented so you'll have to work it out by reading code.

## Trading as it Relates to Validators

1. How much throughput and latency can be expected from a self-hosted full node? Would having multiple full nodes in different regions improve speed?
    - Throughput of up to 1500 orders / second from our load-testing. Latency depends on which validator is the proposer. Having multiple full-nodes in different regions where there are validators (so maybe 1 in Europe + 1 in Tokyo) would lead to improved latency.

2.  0 Do validators communicate through a public P2P network, or is there an internal network?
    - It's a public P2P network.

3. What is the expected order-to-trade latency under normal conditions?
    - Expected order → trade latency would be:
        - Time for order to get from the node it was submitted to, to the proposer, so location dependent.
        - Order match -> trade, probably at least 1 block so ~1.1s, could be more than 1 block.

4. Compared to a full node, is it faster to submit transactions directly to the validator, or is it faster to broadcast to the next validator with block-producing rights?
    - It would be faster to submit a transaction directly to the block proposer, the difference between a full-node / validator is negligible unless that validator was the proposer.

5. Do you have some faster validators that we can send orders to?
    - Validators usually don't expose the RPC endpoints for orders to be submitted to, and we also don't have a list of validator IPs.

6. How do other teams improve their speed?
    - Some teams are trying to get data about the order book / order updates from a full-node they are running to improve the latency to receiving data, as there is additional latency to getting order updates due to the Indexer systems having additional latency. We currently do not have documentation around this, but are working on it.

## Indexer 

1. How does the indexer reconstruct the orderbook when it started/initial snapshot of the book?
    - A full node is run alongside the Indexer and sends messages to the indexer when it receives orders either from the RPC or gossiped from other nodes, as well as any updates from:
        - node pruning the order when it expires
        another order that matches an order that the node received earlier
        node removing order due to receiving a cancel from RPC or gossip
    - The indexer also updates the order book whenever it receives these order messages.

2. How does the indexer know what orders are in the book on start up?
    - On a cold-start, a full-node would still have all the stateful orders and would send them to the indexer. For short-term orders, the full-node would not know them, nor would the indexer. Since short-term orders only are valid for 20 blocks, within 20 blocks the indexer would have an accurate view of the order book, but for the first 20 blocks it would not.

## MEV

1. How will dYdX Chain handle MEV?
    - Unlike general purpose smart contract environments, the Cosmos infrastructure enables unique MEV solutions to be built that align a validator’s incentives with a user’s incentives. dYdX Chain has a framework where MEV is measured via a [dashboard](https://dydx.exchange/blog/distinguishing-mev-from-expected-noise) created by Skip Protocol. The first step would be to punish validators with slashing. Further proposed solutions are still being considered, and will be announced once finalized. 

2. When do I have finality related to fills?
    - When your order fills, a block proposer proposes a block containing the fill (visible to the whole network), and then the block undergoes consensus. If the block is valid, it finalizes shortly thereafter (in Cosmos-speak this happens at the “commit” stage of consensus, after all validators have voted). In Cosmos, every block is final (no reorgs or forks). 
    - If you’re connected via full node, you’ll see each step of this process. If you’re connected via the indexer service, you’ll see order updates over webSocket as soon as each block is confirmed.

3. Would deliberately taking already-canceled orders be considered an attack against makers? How can such attacks be mitigated?
    - Nodes should respect cancels as soon as they receive them, if they don't then we see that as MEV and the aforementioned dashboard / metrics tracking MEV will track that. 

## Pricing 

1. How is the oracle price is computed?
    - The oracle price has five parts:
        - Skip Protocol Sidecar: side car that pulls price data from external sources and caches them for the validator to use [link](https://docs.skip.money/slinky/integrations/dydx)
        - Vote Extensions: Every block during the Precommit stage, all validators will submit vote extensions for what they believe the oracle price of all tracked assets should be.
        - Consensus: The block after VE are submitted, Slinky deterministically aggregates all VE from the previous block and proposes a new updated price which is voted into consensus.
        - Module: updates the state based on the new price, also has logic for validation and etc [link](https://github.com/dydxprotocol/v4-chain/tree/af8b6a46fdecc77ef154fd7b32377b4fea92b3f8/protocol/x/prices) 
        - Params: determines the external sources and sensitivity [link](https://github.com/dydxprotocol/v4-testnets/blob/aa1c7ac589d6699124942a66c2362acad2e6f50d/dydx-testnet-4/genesis.json#L6106), these are configured per network (testnet genesis example), but should query the network config for these `dydxprotocold query prices list-market-param`

## Rewards

1. How will trading rewards work on dYdX Chain?
    - Trading rewards are not controlled by dYdX. dYdX recommends that trading rewards could be calculated primarily based on total taker fees paid, along with a few other variables. The full proposed formula can be found [here](https://docs.dydx.exchange/getting_started/fees_rewards_parameters). These rewards could be distributed on a block by block basis (1-2 seconds). 

2. Will liquidity provider rewards exist in v4?
    - Liquidity provider rewards in v4 are not controlled by dYdX. dYdX recommends that liquidity provider rewards should cease to exist in v4. Makers could be rewarded with a maker rebate ranging from 0.5bps to 1.1bps, based on their nominal volume and volume share. The full proposed fee schedule can be found [here](https://docs.dydx.exchange/getting_started/fees_rewards_parameters). 
