# Reading a New Market Proposal
A new market proposal is a JSON document that details configuration settings for a market to be added to the dYdX exchange. Users with governance tokens vote to add or reject new markets based on proposal documents. 

Users need to be able to interpret new market proposals in order to vote on them, and market makers need to derive additional values from the proposal to provide liquidity at launch.

## Example Proposal


Below is an example proposal JSON file to propose adding `BTC-USD` as a new perpetual market (if it had not been added yet).

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

### Reading a Proposal

### Voting on a Proposal

### (Market Makers) Compute Additional Values to Provide Liquidity to a New Market

| Value | Description | Equation |
| ----- | ----------- | -------- |
| Step Size | desc | xy |
| Tick Size | desc | xy |
| Minimum Order Size | desc | xy |
