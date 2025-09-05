# Terms of Service and Privacy Policy

By using any API provided by dYdX Trading Inc., you agree to its [Terms of Use](https://dydx.exchange/terms) and [Privacy Policy](https://dydx.exchange/privacy). If you do not agree to the foregoing, then do not use any such API.

# General

These docs describe the v3 API for the dYdX decentralized perpetual contracts exchange. The exchange runs on an L2 (layer-2) blockchain system, and operates independently of previous dYdX protocols and systems, including the v1 and v2 APIs.

Like the previous iteration of dYdX perpetuals, the exchange uses a centralized order book, but remains non-custodial, and settles trades and liquidations in a trustless manner.

<aside class="notice">
These docs describe the dYdX <a href="https://trade.dydx.exchange">layer-2 perpetuals exchange</a>.
</aside>

## Layer 2: ZK-Rollups

Trades are settled in an L2 (layer-2) system, which publishes ZK (zero-knowledge) proofs periodically to an Ethereum smart contract in order to prove that state transitions within L2 are valid. Funds must be deposited to the Ethereum smart contract before they can be used to trade on dYdX.

By settling trades on L2, the exchange is able to offer much higher trade throughput and lower minimum order sizes, compared with systems settling trades directly on Ethereum (i.e. L1). This is achieved while maintaining decentralization, and the exchange is fully non-custodial.

The L2 system was developed with, and is operated jointly with, Starkware. More information about the L2 design can be found in [Starkware's documentation](https://docs.starkware.co/starkex-docs/). (Note: Some of the details described there may be specific to Starkware's previous StarkEx system and may not apply to the dYdX system.)

## Data Centers

Our data centers are located in the AWS AP-NORTHEAST-1 region (Tokyo).

<aside class="warning">
It is strictly against our <a href="https://dydx.exchange/terms">Terms of Use</a> to use United States based IPs to trade on dYdX.
</aside>

## Number Formats

All amounts and prices in the clients and API are represented in “human readable,” natural units. For example, an amount of 1.25 ETH is represented as `1.25`, and a price of $31,000.50 per BTC is represented as `31000.5`.

## Base URLs

Base URLs for API endpoints are as follows:

* **Production (Mainnet)**: `https://api.dydx.exchange`
* **Staging (Goerli)**: `https://api.stage.dydx.exchange`

## Testnet

We have one testnet which is on `Goerli`. To use the testnet, use the above Staging URL for your endpoint. Also use a `networkId` of `5` (Goerli) instead of `1` (Mainnet).

The user interface for testnet can be found [here](https://trade.stage.dydx.exchange).

The `dYdX Goerli USDC` token address is `0xF7a2fa2c2025fFe64427dd40Dc190d47ecC8B36e`. Users can deposit via the Testnet website.

## Rate-Limits

All rate-limits are subject to change.

Please make use of the WebSockets API if you need real-time data.

### Rate Limit - API

Limits are enforced by IP Address for public endpoints, and by both IP Address and Account for private endpoints.

Each request consumes 1 point towards the rate limit. [`POST v3/orders`](#place-order-rate-limits) consumes variable points based on the order. Points refresh at the end of each time window. Please take note of the `RateLimit-Remaining` header to track points usage.

#### Response Headers

Field                                   | Description
----------------------------------------| -----------
`RateLimit-Remaining`                   | Points remaining in the time window.
`RateLimit-Reset`                       | Timestamp that the time window ends, in Epoch milliseconds.
`Retry-After`                           | Milliseconds until the next time window. Header included only when the limit has been reached.
`RateLimit-Limit`                       | The maximum amount of points allowed per time window.

Request                                 | Limit
----------------------------------------| -----------
`GET v3/*`                              | 175 requests per 10 seconds.
`PUT v3/emails/send-verification-email` | 2 requests for 10 minutes.
`DELETE v3/orders`                      | See `Cancel-Order Rate Limits`
`POST v3/orders`                        | See `Place-Order Rate-Limits`
`POST v3/testnet/tokens`                | 5 requests per 24 hours.
`GET v3/active-orders`                  | See `Active-Order Rate-Limits`
`DELETE v3/active-orders`               | See `Active-Order Rate-Limits`
`All other requests`                    | 10 requests per minute.

### Rate Limit - Websocket

Limits are enforced per `connectionId`.

<aside class="warning">
If your connection exceeds the request limit, we will terminate the connection, and you will need to reconnect to the websocket. Additionally, sending too many invalid messages will also result in your websocket being disconnected.
</aside>

Request                                 | Limit
----------------------------------------| -----------
`subscribe v3_accounts, v3_markets`     | 2 requests per 1 second.
`subscribe v3_orderbook, v3_trades`     | 2 requests for 1 second per market.
`ping`                                  | 5 requests per 1 second.

### Cancel-Order Rate Limits

Canceling orders is limited per asset-pair and is intended to be higher than the limit on placing orders.

`DELETE v3/orders` requests are limited to `3` requests per `10` seconds per asset-pair.

`DELETE v3/orders/:id` requests are limited to `250` requests per `10` seconds per asset-pair.

### Place-Order Rate-Limits

Order rate limits are limited to `maxPoints` spent (per asset-pair) in a fixed window of `windowSec` seconds.

We want to give priority to those who are making the largest orders and who are contributing the most liquidity to the exchange.
Therefore, placing larger orders is subject to higher limits (i.e. larger orders carry a lower point cost).
The point cost is based on the `orderNotional` which is equal to the `size * price` of the order.

Limit-order point consumption is equal to:

<pre class="center-column">
orderConsumption = clamp(
  ceil(targetNotional / orderNotional),
  minOrderConsumption,
  maxOrderConsumption
)
</pre>

The `minOrderConsumption` is different for each order type, and can be one of `minLimitConsumption`, `minMarketConsumption`, or `minTriggerableConsumption`. Limit orders that are Fill-or-Kill or Immediate-or-Cancel are considered to be market orders for the purposes of rate limiting.

The values of the above variables as of March 15th, 2022 are listed below, but the most up-to-date values can be found in the [v3/config endpoint](#get-global-configuration-variables).

Variable         | Value
---------------- | -------
`maxPoints`      | `1,750`
`windowSec`      | `10`
`targetNotional` | `40,000`
`minLimitConsumption` | `4`
`minMarketConsumption` | `20`
`minTriggerableConsumption` | `100`
`maxOrderConsumption` | `100`

### Active-Order Rate-Limits

Querying active orders is limited per endpoint and per asset and is intended to be higher than the respective DELETE and GET endpoints these new endpoints replace.

#### DELETE Active-Orders Rate Limits

`DELETE v3/active-orders/*`

- 425 points allotted per 10 seconds per market.
- 1 point consumed if order id included.
- 25 points consumed if order side included.
- 50 points consumed otherwise.

#### GET Active-Orders Rate Limits

`GET v3/active-orders/*`

- 175 points allotted per 10 seconds per market.
- 1 point consumed if order id included.
- 3 points consumed if order side included.
- 5 points consumed otherwise.

## Other Limits

Accounts may only have up to 20 open orders for a given market/side pair at any one time. (For example up to 20 open `BTC-USD` bids).
