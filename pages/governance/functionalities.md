# Governance Functionality

Below is a current list of all module parameters that `x/gov` has the ability to update directly. Further documentation will be released which outlines overviews of each custom module, how modules interact with one another, and technical guides regarding how to properly submit governance proposals. 

## Trading Stats & Fees

### Stats Module

The Stats Module tracks user maker and taker volumes over a period of time (aka look-back window). This is currently set to 30 days. The maker and taker volume info is used to place users in corresponding fee-tiers. 

Governance has the ability to update the params of the Stats Module, which defines the look-back window (measured in seconds). [Proto](https://github.com/dydxprotocol/v4-chain/blob/main/proto/dydxprotocol/stats/params.proto#L10-L14)

### FeeTiers Module

Governance has the ability to update fee tiers ([proto](https://github.com/dydxprotocol/v4-chain/blob/main/proto/dydxprotocol/feetiers/params.proto#L6-L10)). To read more about fee tiers head to [V4 Deep Dive: Rewards and Parameters](https://dydx.exchange/blog/v4-rewards-and-parameters). 

## Trading Core

### Insurance Fund

Governance has the ability to send funds from the Protocol’s Insurance Fund. Funds can be sent to individual accounts, or other modules. 

Note: any account has the ability to send assets to the Insurance Fund. 

### Liquidations Config

Governance has the ability to adjust how liquidations are processed. [Proto](https://github.com/dydxprotocol/v4-chain/blob/main/proto/dydxprotocol/clob/liquidations_config.proto#L8-L34)

- Max Insurance Fund quantums for deleveraging: The maximum number of quote quantums (exclusive) that the insurance fund can have for deleverages to be enabled.
- The maximum liquidation fee, in parts-per-million. 100% of this fee goes to the Insurance Fund
- The maximum amount of how much a single position can be liquidated within one block.
- The maximum amount of how much a single subaccount can be liquidated within a single block
- Fillable price config: configuration regarding how the fillable-price spread from the oracle price increases based on the adjusted bankruptcy rating of the subaccount.

### Funding Rate

Governance has the ability to adjust Funding Rate parameters: 

- Funding rate clamp factor, premium vote clamp factor, and min number of votes per premium sample. [Proto](https://github.com/dydxprotocol/v4-chain/blob/main/proto/dydxprotocol/perpetuals/params.proto#L6-L19)
- Epoch information, which defines the funding interval and premium sampling interval. [Proto](https://github.com/dydxprotocol/v4-chain/blob/main/proto/dydxprotocol/epochs/epoch_info.proto#L6-L43)
- Liquidity Tier, which defines the impact notional value. [Proto](https://github.com/dydxprotocol/v4-chain/blob/main/proto/dydxprotocol/perpetuals/perpetual.proto#L84-L113)

## Trading Rewards

### Vest Module

The Vest Module is responsible for determining the rate of tokens that vest from Vester Accounts to other accounts such as a Community Treasury Account and a Rewards Treasury Account. The rate of token transfers is linear with respect to time. Thus, block timestamps are used to vest tokens.

Governance has the ability to create, update, or delete a `VestEntry` ([proto](https://github.com/dydxprotocol/v4-chain/blob/main/proto/dydxprotocol/vest/vest_entry.proto#L9-L30)), which defines:   

- The start and end time of vesting
- The token that is vested
- The account to vest tokens to
- The account to vest tokens from

### Rewards Module

The Rewards Module distributes trading rewards to traders (previously written about [V4 Deep Dive: Rewards and Parameters](https://dydx.exchange/blog/v4-rewards-and-parameters)). Governance has the ability to adjust the following ([proto](https://github.com/dydxprotocol/v4-chain/blob/main/proto/dydxprotocol/rewards/params.proto#L6-L26)): 

- Which account Trading Rewards are funded from
- The token Trading Rewards are funded in
- The market which tracks the oracle price of the token that Trading Rewards are funded in
- `C` which is a protocol constant further explained in the post linked above

## Markets

### Oracles

Governance has the ability to adjust the list of oracles used for each market. [Proto](https://github.com/dydxprotocol/v4-chain/blob/main/proto/dydxprotocol/prices/market_param.proto#L31-L33) 

Note that this functionality does not include creating / removing an exchange-source supported by the protocol as a whole, which will require a binary upgrade. 

### Liquidity Tiers

Liquidity Tiers group markets of similar risk into standardized risk parameters. Liquidity tiers specify the margin requirements needed for each market and should be determined based on the depth of the relative market’s spot book as well as the token’s market capitalization. 

Current Liquidity Tiers include: 

| ID | Name | initial margin fraction | maintenance fraction (what fraction MMF is of IMF) | base position notional | impact notional |
| --- | --- | --- | --- | --- | --- |
| 0 | Large-Cap | 0.05 | 0.6 | 1_000_000 USDC | 500 USDC / IM |
| 1 | Mid-Cap | 0.1 | 0.5 | 1_000 USDC | 500 USDC / IM |
| 2 | Long-Tail | 0.2 | 0.25 | 1_000 USDC | 500 USDC / IM |
| 3 | Safety | 1 | .05 | 1_000 USDC | 2500 USDC / IM |

Governance has the ability to create and modify Liquidity Tiers as well as update existing markets’ Liquidity Tier placements. ([proto](https://github.com/dydxprotocol/v4-chain/blob/main/proto/dydxprotocol/perpetuals/perpetual.proto#L84-L113))

### Updating a Live Market

This functionality allows the community to update parameters of a live market, which can be composed of 4 parts

- Updating a liquidity tier
- Perpetual (`x/perpetuals`), governance-updatable through `MsgUpdatePerpetual` ([proto definition](https://www.notion.so/Governance-Parameter-Updates-ff8be9ebd380424d8fdd337e2bb1b355?pvs=21))
- Market (`x/prices`), governance-updatable through `MsgUpdateMarketParam` ([proto](https://github.com/dydxprotocol/v4-chain/blob/main/proto/dydxprotocol/prices/market_param.proto#L6-L34))
- Clob pair (`x/clob`), governance-updatable through `MsgUpdateClobPair` ([proto](https://github.com/dydxprotocol/v4-chain/blob/b2c6062b4e588b98a51454f50da9e8e712cfc2d9/proto/dydxprotocol/clob/tx.proto#L102))

### Adding New Markets

The action of a governance proposal is defined by the [list of messages that are executed](https://github.com/dydxprotocol/cosmos-sdk/blob/4fadfe5a4606b6dc76644d377ed34420f3b80801/x/gov/abci.go#L72-L90) when it’s accepted. A proposal to add a new market should include the following messages (in this particular order):

```
MsgCreateOracle (create objects in x/prices)
MsgCreatePerpetual (create object in x/perpetual)
MsgCreatePerpetualClobPair (create object in x/clob)
MsgDelayMessage (schedule a MsgSetClobPairStatus to enable trading in x/clob)
```

## Safety

### Spam Mitigation

To prevent spam on the orderbook and prevent the blockchain state from getting too large, governance has the ability to adjust: 

- How many open orders a subaccount can have based on its equity tier. [Proto](https://github.com/dydxprotocol/v4-chain/blob/main/proto/dydxprotocol/clob/equity_tier_limit_config.proto#L8-L19)
- Order placement rate limits. [Proto](https://github.com/dydxprotocol/v4-chain/blob/main/proto/dydxprotocol/clob/block_rate_limit_config.proto#L8-L35)

## Bridge

### Bridge Module

The Bridge Module is responsible for receiving bridged tokens from the Ethereum blockchain.

Governance has the ability to update: 

- Event Parameters: Specifies which events to recognize and which tokens to mint. [Proto](https://github.com/dydxprotocol/v4-chain/blob/main/proto/dydxprotocol/bridge/params.proto#L9-L20)
- Proposal Parameters: Determines how long a validator should wait until it proposes a bridge event to other validators, and how many or often to propose new bridge events. [Proto](https://github.com/dydxprotocol/v4-chain/blob/main/proto/dydxprotocol/bridge/params.proto#L22-L45)
- Safety Parameters: Determines if bridging is enabled/disabled and how many blocks mints are delayed after being accepted by consensus. [Proto](https://github.com/dydxprotocol/v4-chain/blob/main/proto/dydxprotocol/bridge/params.proto#L47-L55)

## Community Assets

### Community Pool + Community Treasury

There are two addresses intended for managing funds owned by the community: 

1. a Community Pool and 
2. a Community Treasury. 

The Community Pool is the recipient of any Community Tax that is implemented via the Distribution Module. The Community Pool is controllable by governance.  

The Community Treasury is an account controlled by governance and can be funded via any account or module sending tokens to it.  

## CosmosSDK Default Modules:

For more information on default modules, head to the [Cosmos SDK official documentation](https://docs.cosmos.network/v0.47/modules). dYdX Chain inherits the same governance properties of any standard CosmosSDK modules that are present on dYdX Chain,