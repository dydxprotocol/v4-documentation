# Proposing a new market

**💡 Important: always test proposals on testnets before submitting to any production environment**.

## Proposal Messages

The proposal should consist of 4 messages to be executed **atomically and in order** when the proposal passes onchain.

| Message Index | Message | Description | Params Documentation | How to Set Params for New Market |
|---------------|---------|-------------|----------------------|----------------------------------|
| 0 | [MsgCreateOracleMarket](https://github.com/dydxprotocol/v4-chain/blob/0a01da5ba17b6ca26cef6c0e183c6676a1a4e5dc/proto/dydxprotocol/prices/tx.proto#L28) | Sets the oracle list and other parameters in `x/prices`, used by the protocol to track an oracle price | [MarketParams](https://github.com/dydxprotocol/v4-chain/blob/0a01da5ba17b6ca26cef6c0e183c6676a1a4e5dc/proto/dydxprotocol/prices/market_param.proto#L10) | See Below |
| 1 | [MsgCreatePerpetual](https://github.com/dydxprotocol/v4-chain/blob/316473cf115ee901a1371151512a8e97987f66da/proto/dydxprotocol/perpetuals/tx.proto#L31) | Sets the perpetual parameters in `x/perpetuals`, used by the protocol to represent a perpetual market. | [Params](https://github.com/dydxprotocol/v4-chain/blob/316473cf115ee901a1371151512a8e97987f66da/proto/dydxprotocol/perpetuals/params.proto#L7) | See Below |
| 2 | [MsgCreateClobPair](https://github.com/dydxprotocol/v4-chain/blob/35b87db422b0ef4138101ba73b0f00d16780ba89/proto/dydxprotocol/clob/tx.proto#L50) | Sets the orderbook parameters in `x/clob`, used by protocol to set up the market orderbook (in `INITIALIZING` status). | [ClobPair](https://github.com/dydxprotocol/v4-chain/blob/35b87db422b0ef4138101ba73b0f00d16780ba89/proto/dydxprotocol/clob/clob_pair.proto#L25) | See Below |
| 3 | [MsgDelayMessage](https://github.com/dydxprotocol/v4-chain/blob/35b87db422b0ef4138101ba73b0f00d16780ba89/proto/dydxprotocol/delaymsg/tx.proto#L18) | Transitions the orderbook created by `MsgCreateClobPair` to `ACTIVE` status, after some amount of blocks| [delay_blocks](https://github.com/dydxprotocol/v4-chain/blob/35b87db422b0ef4138101ba73b0f00d16780ba89/proto/dydxprotocol/delaymsg/tx.proto#L27) | See Below |

Notes:

- The exact ordering of messages above is necessary for successful onchain execution.
- Each of the 4 top-level messages should have `Authority = dydx10d07y265gmmuvt4z0w9aw880jnsr700jnmapky`, the [gov module](https://github.com/dydxprotocol/v4-chain/blob/5e72896719e2f8d2fe6e10fddbde18b363a6bbe3/protocol/app/module_accounts_test.go#L28)
- The `MsgCreateClobPair` message wrapped in `messages[3]: MsgDelayMessage` should have `Authority = dydx1mkkvp26dngu6n8rmalaxyp3gwkjuzztq5zx6tr`, the [delaymsg module](https://github.com/dydxprotocol/v4-chain/blob/5e72896719e2f8d2fe6e10fddbde18b363a6bbe3/protocol/app/module_accounts_test.go#L36).
- The identifier fields must be consistent for a perpetual market: `params.id`, `params.market_id`, `clob_pair.id`, `clob_pair.perpetual_clob_metadata.perpertual_id`.  An `id` value is valid as long as it's a `uint32` unique from existing markets (they do not need to follow existing market ids).
- `MsgDelayMessage.delay_blocks` is recommended to be `3600` blocks (`1 hour` at `1 sec` blocktime).


## Example Proposal Json

Below is an example proposal JSON file to propose adding `BTC-USD` as a new perpetual market (if it had not been added yet).

```json
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
    ],
  }
  ```

## Submitting an Onchain Proposal

Follow instructions [here](./submitting_a_proposal.md) to submit an onchain proposal.
