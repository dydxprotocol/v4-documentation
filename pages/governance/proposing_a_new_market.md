# Proposing a new market

## Example Proposal Json
Below is an example proposal JSON file to propose adding `BTC-USD` as a new perpetual market (if it had not been added yet).

```
{
    "title": "Add BTC-USD perpetual market",
    "deposit": "10000000000000000000000adv4tnt",
    "summary": "Add the `x/prices`, `x/perpetuals` and `x/clob` parameters needed for a BTC-UTC perpetual market. Create the market in `INITIALIZING` status and transition it to `ACTIVE` status after 3600 blocks."
    "messages": [
      {
        "@type": "/dydxprotocol.prices.MsgCreateOracleMarket",
        "authority": "dydx10d07y265gmmuvt4z0w9aw880jnsr700jnmapky",
        "params": {
            "exchange_config_json": '{"exchanges":[{"exchangeName":"Binance","ticker":"BTCUSDT","adjustByMarket":"USDT-USD"},{"exchangeName":"Bybit","ticker":"BTCUSDT","adjustByMarket":"USDT-USD"},{"exchangeName":"CoinbasePro","ticker":"BTC-USD"},{"exchangeName":"Huobi","ticker":"btcusdt","adjustByMarket":"USDT-USD"},{"exchangeName":"Kraken","ticker":"XXBTZUSD"},{"exchangeName":"Kucoin","ticker":"BTC-USDT","adjustByMarket":"USDT-USD"},{"exchangeName":"Mexc","ticker":"BTC_USDT","adjustByMarket":"USDT-USD"},{"exchangeName":"Okx","ticker":"BTC-USDT","adjustByMarket":"USDT-USD"}]}',
            "exponent": -5,
            "id": 0,
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
            "id": 0,
            "liquidity_tier": 0,
            "market_id": 0,
            "ticker": "BTC-USD"
        }
      },
      {
        "@type": "/dydxprotocol.clob.MsgCreateClobPair",
        "authority": "dydx10d07y265gmmuvt4z0w9aw880jnsr700jnmapky",
        "clob_pair": {
            "id": 0,
            "perpetual_clob_metadata": {
              "perpetual_id": 0
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
                "id": 0,
                "perpetual_clob_metadata": {
                  "perpetual_id": 0
                },
                "quantum_conversion_exponent": -9,
                "status": "STATUS_ACTIVE",
                "step_base_quantums": 1000000,
                "subticks_per_tick": 100000
            }
        },
        "delay_blocks" : 3600
      }
    ],
  }
  ```

## Breakdown of Example Proposal

The above proposal consists of 4 messages to be executed **atomically and in order** when the proposal passes onchain. The message ordering above is required to enable successful onchain execution.

#### 1. MsgCreateOracleMarket

This [message](https://github.com/dydxprotocol/v4-chain/blob/0a01da5ba17b6ca26cef6c0e183c6676a1a4e5dc/proto/dydxprotocol/prices/tx.proto#L28) sets the oracle list and other parameters in `x/prices`, used by the protocol to track an oracle price. See [MarketParams](https://github.com/dydxprotocol/v4-chain/blob/0a01da5ba17b6ca26cef6c0e183c6676a1a4e5dc/proto/dydxprotocol/prices/market_param.proto#L10) proto definitions for detailed documentations on each field.

#### 2. MsgCreatePerpetual

This message sets the perpetual parameters in `x/perpetuals`, used by the protocol to represent a perpetual market.

#### General Notes

Authority


## Submitting an Onchain Proposal

**💡 Important: always test proposal on the testnet before submitting to any production environments**.

Follow instructions [here](./submitting_a_proposal.md) to submit an onchain proposal.
