# Reading a Proposal
A governance proposal is a json document submitted to the dYdX Chain governance module. One of the most popular types of governance proposals is a new market proposal which add new markets to the dYdX Chain if passed. A new market proposal specifies parameters necessary to specify a market, such as the name of the market, oracle sources, and liquidity tier. This page will outline how to interpret the market parameters so that the community can assess the proposal and be prepared to trade with correct configurations if the market becomes live. See [proposing a new market](../users-governance/proposing_a_new_market.md) for more information on how the market parameters can be calculated.


## Example Proposal
Below is an example proposal JSON file for adding a perpetual market, `BTC-USD`.

```json
{
    "title": "Add BTC-USD perpetual market",
    "deposit": "10000000000000000000000adv4tnt",
    "summary": "Add the `x/prices`, `x/perpetuals` and `x/clob` parameters needed for a BTC-USD perpetual market. Create the market in `INITIALIZING` status and transition it to `ACTIVE` status after 3600 blocks.",
    "messages": [
      {
        "@type": "/dydxprotocol.prices.MsgCreateOracleMarket",
        "authority": "dydx10d07y265gmmuvt4z0w9aw880jnsr700jnmapky",
        "params": {
            "exchange_config_json": "{\"exchanges\":[{\"exchangeName\":\"Binance\",\"ticker\":\"BTCUSDT\",\"adjustByMarket\":\"USDT-USD\"},{\"exchangeName\":\"Bybit\",\"ticker\":\"BTCUSDT\",\"adjustByMarket\":\"USDT-USD\"},{\"exchangeName\":\"CoinbasePro\",\"ticker\":\"BTC-USD\"},{\"exchangeName\":\"Huobi\",\"ticker\":\"btcusdt\",\"adjustByMarket\":\"USDT-USD\"},{\"exchangeName\":\"Kraken\",\"ticker\":\"XXBTZUSD\"},{\"exchangeName\":\"Kucoin\",\"ticker\":\"BTC-USDT\",\"adjustByMarket\":\"USDT-USD\"},{\"exchangeName\":\"Mexc\",\"ticker\":\"BTC_USDT\",\"adjustByMarket\":\"USDT-USD\"},{\"exchangeName\":\"Okx\",\"ticker\":\"BTC-USDT\",\"adjustByMarket\":\"USDT-USD\"}]}",
            "exponent": -5,
            "id": 1001,
            "min_exchanges": 3,
            "min_price_change_ppm": 1000,
            "pair": "BTC-USD"
        }
      },
      {
        "@type": "/dydxprotocol.perpetuals.MsgCreatePerpetual",
        "authority": "dydx10d07y265gmmuvt4z0w9aw880jnsr700jnmapky",
        "params": {
            "atomic_resolution": -10,
            "default_funding_ppm": 0,
            "id": 1001,
            "liquidity_tier": 0,
            "market_id": 1001,
            "ticker": "BTC-USD"
        }
      },
      {
        "@type": "/dydxprotocol.clob.MsgCreateClobPair",
        "authority": "dydx10d07y265gmmuvt4z0w9aw880jnsr700jnmapky",
        "clob_pair": {
            "id": 1001,
            "perpetual_clob_metadata": {
              "perpetual_id": 1001
            },
            "quantum_conversion_exponent": -9,
            "status": "STATUS_INITIALIZING",
            "step_base_quantums": 1000000,
            "subticks_per_tick": 100000
        }
      },
      {
        "@type": "/dydxprotocol.delaymsg.MsgDelayMessage",
        "authority": "dydx10d07y265gmmuvt4z0w9aw880jnsr700jnmapky",
        "msg": {
            "@type": "/dydxprotocol.clob.MsgUpdateClobPair",
            "authority": "dydx1mkkvp26dngu6n8rmalaxyp3gwkjuzztq5zx6tr",
            "clob_pair": {
                "id": 1001,
                "perpetual_clob_metadata": {
                  "perpetual_id": 1001
                },
                "quantum_conversion_exponent": -9,
                "status": "STATUS_ACTIVE",
                "step_base_quantums": 1000000,
                "subticks_per_tick": 100000
            }
        },
        "delay_blocks" : 3600
      }
    ]
  }
```

### Understanding Proposal Values

A new market proposal consists of 4 messages: 

1. Create Oracle Market
2. Create Perpetual
3. Create CLOB Pair
4. Delay Message

#### Create Oracle Market
Create Oracle Market message specifies the oracle sources and their parameters that will be used to compute the oracle price. 
- `exchange_config_json` includes the exchange, ticker, and parameters (if applicable) that constitute oracle sources. 
  - adjust_by_market specifies the ticker to adjust the returned price if the quote asset for the spot ticker is not USD. ex: If the spot ticker is BTCUSDT, the adjust_by_market may be USDT-USD.
  - invert specifies whether to invert the price. ex: If the oracle market is TRY-USD and the spot ticker is USDTTRY, the invert may be true.
- `exponent` is the number of decimal places to use to show prices.
- `id` is the id of the oracle market. This should be the same as the perpetual_id and clob_pair_id.
- `min_exchanges` is the number of exchanges that should be responsive for the oracle price to be updated in that block.
- `min_price_change_ppm` is the threshold for which the oracle price will update only if the proposed price change is greater than min_price_change_ppm. 
- `pair` is the ticker of the market being added.

#### Create Perpetual
Create Perpetual message specifies the parameters specific to the perpetual.
- `atomic_resolution` determines the precision of the size of the coin. If the atomic resolution is -10, then the perpetual positions are represented as multiples of 10^-10.
- `default_funding_ppm` is the default funding rate in parts per million.
- `id` is the id of the perpetual. This should be the same as the oracle_market_id and clob_pair_id.
- `liquidity_tier` is the liquidity tier of the proposed market. This should be set based on [dYdX liquidity tier guidelines](../users-governance/functionalities#liquidity-tiers).
- `market_id` is the id of the oracle market. This should be the same as the id.
- `ticker` is the ticker of the market being added.

#### Create CLOB Pair
Create CLOB Pair message sets up the orderbook parameters for the market.
- `id` is the id of the CLOB pair. This should be the same as the oracle_market_id and perpetual_id.
- `perpetual_clob_metadata.perpetual_id` is the id of the perpetual. This should be the same as the id.
- `quantum_conversion_exponent`is used to convert the value of a position in protocol to/from a human readable value in $.
- `status` is set to "STATUS_INITIALIZING" to create the market in initializing status.
- `step_base_quantums` deteremines `step_size`, which is the minimum amount by which you can increase or decrease an order.
- `subticks_per_tick` determines the `tick_size` for the market. 

#### Delay Message
Delay Message is used to transition the market from INITIALIZING to ACTIVE status after a specified number of blocks.
- `clob_pair` contains the same parameters as in the Create CLOB Pair message, but with `status` set to "STATUS_ACTIVE".
- `delay_blocks` specifies the number of blocks to wait before activating the market.

### Derived Values
You can calculate the following values based on parameters in a new market proposal.

- Tick Size:
  - Minimum amount in USDC by which valid prices for an order increment by. The formula corresponds to the tick size falling between 1 and 10 bps of the base asset price in USDC.
  -`tick_size` = `subtick_size` * `subticks_per_tick` where `subtick_size` = 10^(-`atomic_resolution` + `quantum_conversion_exponent` + `quote_quantum_resolution`) and `quote_quantum_resolution := -6` for USDC.

- Step Size:
  - Minimum amount in base_asset by which you can increase or decrease an order. This formula corresponds to the step size falling between 1 and 10 USDC.
  - `step_size` = 10^(`atomic_resolution`) * `step_base_quantums`

- Minimum Order Size:
  - Minimum amount in base_asset required to place an order. Protocol uses the same values for step size and minimum order size.
  - `min_order_size` = 10^ (`atomic_resolution`) * `step_base_quantums`

- From the example proposal above, we can calculate the above values for `BTC-USD` as the following:
  - `tick_size` = `subtick_size` * `subticks_per_tick` = 10^(10 - 9 - 6) * 100000 = $1
  - `step_size` = 10^(-10) * 1000000 = 0.0001 BTC
  - `min_order_size` = 10^(-10) * 1000000 = 0.0001 BTC

## Next Steps
If you are a dYdX Chain user, you can [vote on a proposal](../users-governance/voting.md) or [submit your own](../users-governance/submitting_a_proposal.md).

If you are a market maker aiming to provide liquidity to a new market, you can configure a trading strategy using values and derived values from the proposal.