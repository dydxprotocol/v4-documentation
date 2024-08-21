# Reading a Proposal
dYdX Chain users add markets to the exchange by submitting new market proposals. A new market proposal is a JSON document that details market values, such as the name of the proposed market, the submitter's asset price quote, the oracle sources it will use, and many others. Users with governance tokens vote to accept or reject new markets based on proposal documents. 

For dYdX Chain users, reading new market proposals is important to be able to assess and vote on adding new markets.

For market makers, new market proposals contain key information that helps configure programmatic trading strategies to provide liquidity to that market at launch.

## Example Proposal
Below is an example proposal JSON file for adding a perpetual market, `BTC-USD`.

```json
{
    "title": "Add BTC-USD perpetual market",
    "deposit": "10000000000000000000000adv4tnt",
    "summary": "Add the `x/prices`, `x/perpetuals` and `x/clob` parameters needed for a BTC-UTC perpetual market. Create the market in `INITIALIZING` status and transition it to `ACTIVE` status after 3600 blocks.",
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

### Proposal Values
The following values are visible in a new market proposal.

| Name | Field | Description | Proposer Input |
| ---- | ---- | ------------------- | -------- |
| Reference Price | `reference_price` | Starting price of the proposed asset on the exchange. A user proposing a new market should set this based on the price of the asset at the time they create the proposal. | yes |
| Liquidity Tier | `liquidity_tier` | Liquidity tier of the proposed asset. A user proposing a new market should set this based on [dYdX liquidity tier guidelines](../users-governance/functionalities#liquidity-tiers). | yes |
| Atomic Resolution | `atomic_resolution` | Precision of the size of the coin.  | no |
| Minimum Exchanges | `min_exchanges` | Number of exchanges required to list this asset. | no |
| Minimum Price Change PPM | `min_price_change_ppm` | The minimum price change that causes the oracle price to update. | no |
| Exponent | `exponent` | Number of decimal places to use to show prices.  | no |
| Step Base Quantums | `step_base_quantums` | Minimum amount by which you can increase or decrease an order. Same as `step_size`. | no |
| Subticks Per Tick | `subticks_per_tick` | Determines the `ticksize` when multiplied by `subtick_size`. | no |
| Quantum Conversion Exponent | `quantum_conversion_exponent` | Determines the `subticks_per_tick` based on `ticksize_exponent`. | no |

### Derived Values
You can calculate the following values based on values in a new market proposal.

| Name | Field | Description | Equation |
| ----- | -- |----------- | -------- |
| Step Size | `stepsize` | Minimum amount in USDC by which you can increase or decrease an order. Same as `step_base_quantums`.  | `step_base_quantums` |
| Tick Size | `ticksize` | Minimum amount in USDC by which an asset's price can increase or decrease. The market ignores price changes below this threshold. | `subtick_size` * `subticks_per_tick` |
| Minimum Order Size | `min_order_size` | Minimum amount in USDC required to place an order. | `atomic_resolution` * `step_base_quantums` |

## Next Steps
If you are a dYdX Chain user, you can [vote on a proposal](../users-governance/voting.md) or [submit your own](../users-governance/submitting_a_proposal.md).

If you are a market maker aiming to provide liquidity to a new market, you can configure a trading strategy using values and derived values from the proposal.