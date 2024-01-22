# Proposing a new market

**💡 Important: always test proposals on testnets before submitting to any production environment**.

## Proposal Messages

The proposal should consist of 4 messages to be executed **atomically and in order** when the proposal passes onchain.

| Message Index | Message | Description | Params Documentation |
|---------------|---------|-------------|----------------------|
| 0 | [MsgCreateOracleMarket](https://github.com/dydxprotocol/v4-chain/blob/0a01da5ba17b6ca26cef6c0e183c6676a1a4e5dc/proto/dydxprotocol/prices/tx.proto#L28) | Sets the oracle list and other parameters in `x/prices`, used by the protocol to track an oracle price | [MarketParams](https://github.com/dydxprotocol/v4-chain/blob/0a01da5ba17b6ca26cef6c0e183c6676a1a4e5dc/proto/dydxprotocol/prices/market_param.proto#L10) |
| 1 | [MsgCreatePerpetual](https://github.com/dydxprotocol/v4-chain/blob/316473cf115ee901a1371151512a8e97987f66da/proto/dydxprotocol/perpetuals/tx.proto#L31) | Sets the perpetual parameters in `x/perpetuals`, used by the protocol to represent a perpetual market. | [Params](https://github.com/dydxprotocol/v4-chain/blob/316473cf115ee901a1371151512a8e97987f66da/proto/dydxprotocol/perpetuals/params.proto#L7) |
| 2 | [MsgCreateClobPair](https://github.com/dydxprotocol/v4-chain/blob/35b87db422b0ef4138101ba73b0f00d16780ba89/proto/dydxprotocol/clob/tx.proto#L50) | Sets the orderbook parameters in `x/clob`, used by protocol to set up the market orderbook (in `INITIALIZING` status). | [ClobPair](https://github.com/dydxprotocol/v4-chain/blob/35b87db422b0ef4138101ba73b0f00d16780ba89/proto/dydxprotocol/clob/clob_pair.proto#L25) |
| 3 | [MsgDelayMessage](https://github.com/dydxprotocol/v4-chain/blob/35b87db422b0ef4138101ba73b0f00d16780ba89/proto/dydxprotocol/delaymsg/tx.proto#L18) | Transitions the orderbook created by `MsgCreateClobPair` to `ACTIVE` status, after some amount of blocks| [delay_blocks](https://github.com/dydxprotocol/v4-chain/blob/35b87db422b0ef4138101ba73b0f00d16780ba89/proto/dydxprotocol/delaymsg/tx.proto#L27) |

Notes:

- For guideline on choosing values for individual params, see next [section](./proposing_a_new_market.md#choosing-market-parameters).
- Liquidity tiers are mentioned throughout this page. The liquidity tier documentation can be found [here](https://v4-teacher.vercel.app/governance/functionalities#liquidity-tiers). 
- The exact ordering of messages above is necessary for successful onchain execution.
- Each of the 4 top-level messages should have `Authority = dydx10d07y265gmmuvt4z0w9aw880jnsr700jnmapky`, the [gov module](https://github.com/dydxprotocol/v4-chain/blob/5e72896719e2f8d2fe6e10fddbde18b363a6bbe3/protocol/app/module_accounts_test.go#L28).
- The `MsgCreateClobPair` message wrapped in `messages[3]: MsgDelayMessage` should have `Authority = dydx1mkkvp26dngu6n8rmalaxyp3gwkjuzztq5zx6tr`, the [delaymsg module](https://github.com/dydxprotocol/v4-chain/blob/5e72896719e2f8d2fe6e10fddbde18b363a6bbe3/protocol/app/module_accounts_test.go#L36).
- The identifier fields must be consistent for a perpetual market: `params.id`, `params.market_id`, `clob_pair.id`, `clob_pair.perpetual_clob_metadata.perpertual_id`.  An `id` value is valid as long as it's a `uint32` unique from existing markets (they do not need to follow existing market ids).

## Choosing Values for Market Parameters

The following decribes how to set various parameters for a new market and assumes that the market listed is:

- Safe (Not susceptible to market manipulation e.g. [Mango](https://www.coindesk.com/tech/2022/10/20/defi-exchange-mangos-114m-exploit-was-market-manipulation-not-a-hack-ex-fbi-special-agent-says/))
- Worth listing (Will this generate sufficient trading volume to consume throughput?)
- Oracle sources are known (Which spot exchanges should be selected when determining the oracle price?)

### Inputs

- Ticker Symbol (e.g. `BTC-USD` )
- Reference price (e.g. `40,000`) and `p` value
  - Defines the exponent on the reference price as `p:=FLOOR(log10(reference_price))`. For example: `p:=FLOOR(log10(40,000))=4`
- Exchanges required for oracles (`exchange_config_json`)
- Liquidity Tier (can be updated through governance vote at a later date.)
  - 0: Large Cap (BTC/ETH)
  - 1: Mid-Cap (Markets with at least 8 robust oracle sources with liquidity >= 50K on both sides and 30d daily spot trading volume >= $100M.)
  - 2: Long-tail (All others)

### Outputs

| Message Type | Field | Description | Value |
|--------------|-------|-------------|-------|
| `MsgCreateOracleMarket` | `exponent` | Denotes the number of decimals a value should be shifted in the price daemon | `p-9` |
| `MsgCreateOracleMarket` | `min_exchanges` | Used for an index price to be valid. | `3` |
| `MsgCreateOracleMarket` | `min_price_change_ppm` | The minimum amount the index price has to change for an oracle price update to be valid. | Liquidity Tier 0: `1000` <br> Liquidity Tier 1: `2500` <br> Liquidity Tier 2: `4000` |
| `MsgCreateOracleMarket` | `exchange_config_json` | Spot exchange query configuration for the oracle price | See [below](./proposing_a_new_market.md#Choosing-oracle-sources) |
| `MsgCreatePerpetual` | `atomic_resolution` | L the exponent for converting an atomic amount (`size = 1`) to a full coin. |  `-6 - p` |
| `MsgCreatePerpetual`  | `default_funding_ppm` | The default funding payment if there is no price premium. In parts-per-million. | `0` |
| `Msg[Update/Create]ClobPair` | `quantum_conversion_exponent` | `10^quantum_conversion_exponent` gives the number of quote quantum traded per base quantum. | `-9` |
| `Msg[Update/Create]ClobPair` | `subticks_per_tick` | Defines the tick size of the orderbook by defining how many subticks are in one tick. | Liquidity Tier 0: `100000` <br> Liquidity Tier 1 and 2 : `1000000` |
| `Msg[Update/Create]ClobPair` | `step_base_quantums` | (aka step size): min increment in the size of orders (number of coins) on the CLOB in base quantums. | `1000000` |
| `MsgDelayMessage` | `delay_blocks` | number of blocks before which the `MsgUpdateClobPair` is executed and transitions the market to `ACTIVE` | `3600` (equal to an hour at `1 sec` blocktime) |

## Choosing oracle sources

To select oracle sources, follow the procedure below: 

1. Find spot market tickers from eligible exchanges with the desired symbol as the base asset and USD or USDT as the quote asset. See below for a list of eligible exchanges.
  - If the quote asset is USDT, add the following flag `"adjustByMarket":"USDT-USD"`. This flag ensures that the base asset oracle price is adjusted by the USDT oracle price. 
2. Currently the software supports only one source from an exchange per market. Among the tickers from an exchange, choose the most liquid spot market with the highest trading volume. If one market is more liquid but another has more trading volume, choose the one with deeper liquidity. 
3. Exclude oracle sources that do not meet the depth and daily trading volume threshold over the past month. 
  - Both sides of liquidity at 2% from the midprice should be at least `$50,000`. 
  - The average daily trading volume should be at least `$100,000`. 
4. Ensure there are at least 6 sources. If there are less than 6 sources, this market should not be added to prevent potential market manipulation attacks and consensus failures from oracle price updates unless more robust oracle sources are available.

### List of eligible exchanges

Recommended Exchanges:
- Binance
- Coinbase
- OKX
- Bybit
- Gate
- Kraken
- Kucoin
- MEXC

Only use if necessary:
- HTX (previously Huobi)
- Bitstamp

Not recommended: 
- Bitfinex
- BinanceUS
- Crypto.com

Exchanges not included in the above list are not currently supported by the software.

## Example

### Example of markets with robust oracle sources
Here is a [list](https://docs.google.com/spreadsheets/d/1zjkV9R7R_7KMItuzqzvKGwefSBRfE-ZNAx1LH55OcqY/edit#gid=1489690476) of a few markets and their oracle sources evaluated based on the methodology above. 

### `exchange_config_json`

Below is an example `json` string for `exchange_config_json`. To convert this string into a single-line, quote-escaped string:

```bash
cat exchange_config.json | jq -c . | sed 's/"/\\"/g'
```

```json
{
   "exchanges":[
      {
         "exchangeName":"Binance",
         "ticker":"BTCUSDT",
         "adjustByMarket":"USDT-USD"
      },
      {
         "exchangeName":"Bybit",
         "ticker":"BTCUSDT",
         "adjustByMarket":"USDT-USD"
      },
      {
         "exchangeName":"CoinbasePro",
         "ticker":"BTC-USD"
      },
      {
         "exchangeName":"Huobi",
         "ticker":"btcusdt",
         "adjustByMarket":"USDT-USD"
      },
      {
         "exchangeName":"Kraken",
         "ticker":"XXBTZUSD"
      },
      {
         "exchangeName":"Kucoin",
         "ticker":"BTC-USDT",
         "adjustByMarket":"USDT-USD"
      },
      {
         "exchangeName":"Mexc",
         "ticker":"BTC_USDT",
         "adjustByMarket":"USDT-USD"
      },
      {
         "exchangeName":"Okx",
         "ticker":"BTC-USDT",
         "adjustByMarket":"USDT-USD"
      }
   ]
}
```

### Example Proposal Json

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

## Submitting an Onchain Proposal

Follow instructions [here](./submitting_a_proposal.md) to submit an onchain proposal.
