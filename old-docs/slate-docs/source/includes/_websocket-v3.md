# V3 Websocket API

dYdX offers a WebSocket API for streaming v3 updates.

You can connect to the v3 WebSockets at:

* **Production**: `wss://api.dydx.exchange/v3/ws`
* **Staging (Goerli)**: `wss://api.stage.dydx.exchange/v3/ws`

The server will send pings every 30s and expects a pong within 10s. The server does not expect pings, but will respond with a pong if sent one.

## Accounts channel

This channel provides realtime information about orders, fills, funding updates and positions for a user. To subscribe, you will need to
be authenticated.

To subscribe:

| field         | type   | description                                      |
|---------------|--------|--------------------------------------------------|
| type          | string | Set to <code>subscribe</code>                    |
| channel       | string | Set to <code>v3_accounts</code>                  |
| accountNumber | string | The account number to subscribe to               |
| apiKey        | string | The apiKey for the user                          |
| signature     | string | validation signature. See below                  |
| timestamp     | string | timestamp used for the signature                 |
| passphrase    | string | The <code>passphrase</code> field of the API key |

**Authentication**

The authentication in the accounts channel is identical to [private endpoint authentication](#authentication) with one key difference. The `requestPath` is `/ws/accounts`.

### Initial Response:

The initial response will contain the information about the account, open positions, recent transfers, and open orders, i.e. everything from GET `/v3/accounts/:id`, GET `/v3/transfers`, GET `/v3/funding` and GET `/v3/orders` (with `accountId` in the header).

Note that the `freeCollateral` and `equity` (also called `total account value`) for an account are only sent in the initial response. To track these over time, refer to [this section](#margin).

> Example initial response

```json
{
  "type": "subscribed",
  "channel": "v3_accounts",
  "connection_id": "e2a6c717-6f77-4c1c-ac22-72ce2b7ed77d",
  "id": "e33a8007-57ca-52ab-887d-d162d1666f3b",
  "message_id": 1,
  "contents": {
    "orders": [
      {
        "id": "797fc129eeb7c54163f3947f1f250594",
        "clientId": "2",
        "market": "BTC-USD",
        "accountId": "e33a8007-57ca-52ab-887d-d162d1666f3b",
        "side": "BUY",
        "size": "112",
        "remainingSize": "0",
        "price": "34",
        "limitFee": "0.0005",
        "type": "LIMIT",
        "status": "OPEN",
        "signature": "0x456...",
        "timeInForce": "FOK",
        "postOnly": "false",
        "expiresAt": "2021-09-22T20:22:26.399Z",
        "createdAt": "2020-09-22T20:22:26.399Z"
      }
    ],
    "account": {
      "id": "e33a8007-57ca-52ab-887d-d162d1666f3b",
      "positionId": "9356",
      "userId": "fe71e7df-c633-4ba1-870e-61f36580cfc5",
      "accountNumber": "0",
      "starkKey": "041c2ae647ee91807eed6471488983ab4addc2a602d4ceeb04dfda470e33f148",
      "quoteBalance": "300",
      "pendingDeposits": "0",
      "pendingWithdrawals": "0",
      "lastTransactionId": "14",
      "equity": "1879.090000",
      "freeCollateral": "1879.090000",
      "createdAt": "2021-04-09T21:08:34.984Z",
      "openPositions": {
        "LINK-USD": {
          "id": "677dad3b-d848-5e7c-84bf-18760f3414f6",
          "accountId": "e33a8007-57ca-52ab-887d-d162d1666f3b",
          "market": "LINK-USD",
          "side": "LONG",
          "status": "OPEN",
          "size": "200",
          "maxSize": "300",
          "entryPrice": "36",
          "exitPrice": "38",
          "realizedPnl": "50",
          "createdAt": "2020-09-22T20:25:26.399Z",
          "openTransactionId": "2",
          "lastTransactionId": "14",
          "sumOpen": "300",
          "sumClose": "100"
        }
      }
    }
  },
  "transfers": [
    {
      "id": "8d303634-da14-56bb-99f5-122e34b1ce34",
      "type": "FAST_WITHDRAWAL",
      "debitAsset": "USDC",
      "creditAsset": "USDC",
      "debitAmount": "500",
      "creditAmount": "500",
      "transactionHash": "0xb86e98d05098de6249d7c10616ffefa0b001976238083dc34a8e747fd7960029",
      "status": "CONFIRMED",
      "createdAt": "2021-02-05T00:37:43.009Z",
      "confirmedAt": null,
      "clientId": "9407156494718159",
      "fromAddress": "0x3ebe6781be6d436cb7999cfce8b52e40819721cb",
      "toAddress": "0x14c2a496e5b7a52d54748cba0bd9f4b24ed27fdd"
    }
  ],
  "fundingPayments": [],
}
```

### Channel Data

Subsequent responses will contain any updates to open orders, or changes to account balance, or the open positions, or transfers, in a single message.

> A fill occurs, and a position is closed, and the account balance modified

```json
{
  "type": "channel_data",
  "channel": "v3_accounts",
  "connection_id": "e2a6c717-6f77-4c1c-ac22-72ce2b7ed77d",
  "id": "e33a8007-57ca-52ab-887d-d162d1666f3b",
  "message_id": 2,
  "contents": {
    "fills": [{
        "id": "677dad3b-d848-5e7c-84bf-18760f3414f6",
        "accountId": "e33a8007-57ca-52ab-887d-d162d1666f3b",
        "side": "BUY",
        "liquidity": "TAKER",
        "market": "LINK-USD",
        "orderId": "797fc129eeb7c54163f3947f1f250594",
        "size": "112",
        "price": "35",
        "fee": "10",
        "transactionId": "1",
        "orderClientId": "31391968951033844",
        "createdAt": "2020-09-22T20:25:26.399Z",
    }],
    "orders": [{
      "id": "797fc129eeb7c54163f3947f1f250594",
      "clientId": "2",
      "market": "BTC-USD",
      "accountId": "e33a8007-57ca-52ab-887d-d162d1666f3b",
      "side": "BUY",
      "size": "112",
      "remainingSize": "0",
      "price": "34",
      "limitFee": "0.0005",
      "type": "LIMIT",
      "status": "ENTIRELY_FILLED",
      "signature": "0x456...",
      "timeInForce": "FOK",
      "postOnly": "false",
      "expiresAt": "2021-09-22T20:22:26.399Z",
      "createdAt": "2020-09-22T20:22:26.399Z"
    }],
    "positions": [{
      "id": "677dad3b-d848-5e7c-84bf-18760f3414f6",
      "accountId": "e33a8007-57ca-52ab-887d-d162d1666f3b",
      "market": "LINK-USD",
      "side": "LONG",
      "status": "CLOSED",
      "size": "200",
      "maxSize": "300",
      "entryPrice": "36",
      "exitPrice": "38",
      "realizedPnl": "50",
      "createdAt": "2020-09-22T20:25:26.399Z",
      "openTransactionId": "2",
      "closeTransactionId": "23",
      "lastTransactionId": "23",
      "closedAt": "2020-14-22T20:25:26.399Z",
      "sumOpen": "300",
      "sumClose": "100"
    }],
    "accounts": [{
      "id": "e33a8007-57ca-52ab-887d-d162d1666f3b",
      "positionId": "b2759094-12af-4b59-8071-661e99148a14",
      "userId": "fe71e7df-c633-4ba1-870e-61f36580cfc5",
      "accountNumber": "0",
      "starkKey": "0x456...",
      "quoteBalance": "700",
      "pendingDeposits": "400",
      "pendingWithdrawals": "0",
      "lastTransactionId": "14"
    }]
  }
}
```

> a deposit occurs

```json
{
  "type": "channel_data",
  "channel": "v3_accounts",
  "connection_id": "e2a6c717-6f77-4c1c-ac22-72ce2b7ed77d",
  "id": "e33a8007-57ca-52ab-887d-d162d1666f3b",
  "message_id": 2,
  "contents": {
    "fills": [],
    "orders": [],
    "positions": [],
    "accounts": [{
      "id": "e33a8007-57ca-52ab-887d-d162d1666f3b",
      "positionId": "b2759094-12af-4b59-8071-661e99148a14",
      "userId": "fe71e7df-c633-4ba1-870e-61f36580cfc5",
      "accountNumber": "0",
      "starkKey": "0x456...",
      "quoteBalance": "7000",
      "pendingDeposits": "200",
      "pendingWithdrawals": "0",
      "lastTransactionId": "14"
    }],
    "transfers": [{
      "id" : "35bb84a8-d8b5-5f8e-a49e-8ad979fb7567",
      "accountId" : "e33a8007-57ca-52ab-887d-d162d1666f3b",
      "type" : "DEPOSIT",
      "debitAsset" : "USDC",
      "creditAsset" : "USDC",
      "debitAmount" : "10000",
      "creditAmount" : "10000",
      "transactionHash" : "0xec2bd16e73e4bb54c1ee25415233ded15f6e8c4edb8480ce9774a28c7846d4f0",
      "status" : "PENDING",
      "clientId" : "18",
      "updatedAt" : "2021-01-17 22:24:54.661+00",
      "createdAt" :  "2021-01-17 22:24:54.560426+00",
    }]
  }
}
```

## Orderbook

To subscribe:

| field                     | type    | description                                                                     |
|---------------------------|---------|---------------------------------------------------------------------------------|
| type                      | string  | Set to <code>subscribe</code>                                                   |
| channel                   | string  | Set to <code>v3_orderbook</code>                                                |
| id                        | string  | The market to subscribe to e.g. BTC-USD, LINK-USD                               |
| includeOffsets (optional) | boolean | If specified, this will return an initial response with per-price level offsets |

### Initial Response:

The initial response will contain the state of the orderbook and will be the same structure as GET `/v3/orderbook/:market`. If <code>includeOffsets</code> is sent and set to true in the subscription message, there will be an offset included for each price level. (See the example included)

| field    | description                                      |
|----------|--------------------------------------------------|
| type     | will be <code>subscribed</code>                  |
| channel  | the channel name, i.e. <code>v3_orderbook</code> |
| id       | the market subscribed to e.g. BTC-USD            |
| contents | the message contents                             |

The contents is structured as:

| field  | type               | description                                                             |
|--------|--------------------|-------------------------------------------------------------------------|
| offset | string             | A number used for ordering. See <code>offset</code> below.              |
| bids   | array<PublicOrder> | See <code>PublicOrder</code> below. Sorted by price in descending order |
| asks   | array<PublicOrder> | See <code>PublicOrder</code> below. Sorted by price in ascending order  |

PublicOrder:

| field  | type   | description                                                                       |
|--------|--------|-----------------------------------------------------------------------------------|
| price  | string | human readable price of the order (in quote / base currency)                      |
| size   | string | human readable size of the order (in base currency)                               |
| offset | string | (if <code>includeOffsets</code> is set to true) the offset for the specific price |


Offset:

The price updates are not guaranteed to be sent in order. So it is possible to receive an older price update later. For this reason, the offset is included in the message, to help order. The offset increases monotonically, and increasing values of offsets indicate more recent values.

<aside>
To keep a valid orderbook, you should store the offset for each price level independently. A given price level should be updated if and only if an update for the price level is received with a higher offset than what you have stored.

To get a per-price level offset in the initial response, you can set <code>includeOffsets</code> to true when subscribing.
</aside>

Example messages:


> Example initial response:

```json
{
  "type": "subscribed",
  "connection_id": "87b25218-0170-4111-bfbf-d9f0a506fcab",
  "message_id": 1,
  "channel": "v3_orderbook",
  "id": "ETH-USD",
  "contents": {
    "bids": [
      {
        "price": "1779",
        "size": "11.24"
      },
      {
        "price": "1778.5",
        "size": "18"
      }
    ],
    "asks": [
      {
        "price": "1782.8",
        "size": "10"
      },
      {
        "price": "1784",
        "size": "2.81"
      }
    ]
  }
}
```

> Example initial response if <code>includeOffsets</code> is set to true:

Request:

```json
{
  "type": "subscribe",
  "channel": "v3_orderbook",
  "id": "ETH-USD",
  "includeOffsets": "true"
}
```

Response:

```json
{
  "type": "subscribed",
  "connection_id": "14f7c481-1e1f-4f5c-8c5c-7b114209d8ce",
  "message_id": 1,
  "channel": "v3_orderbook",
  "id": "ETH-USD",
  "contents": {
    "bids": [
      {
        "price": "1778.8",
        "offset": "36850163",
        "size": "11"
      },
      {
        "price": "1776.7",
        "offset": "36849225",
        "size": "5.9"
      }
    ],
    "asks": [
      {
        "price": "1783",
        "offset": "36848764",
        "size": "13"
      },
      {
        "price": "1784",
        "offset": "36848433",
        "size": "4.3"
      }
    ]
  }
}
```

### Channel Data

Subsequent responses will contain the new order sizes for any price levels that have changed since the previous update:

e.g:

> Subsequent messages

```json
{
  "type": "channel_data",
  "id": "BTC-USD",
  "connection_id": "e2a6c717-6f77-4c1c-ac22-72ce2b7ed77d",
  "channel": "v3_orderbook",
  "message_id": 2,
  "contents": {
    "offset": "178",
    "bids": [["102", "12"]],
    "asks": [["104", "0" ]]
  }
}
```

E.g: if some orders at "102" price, get filled, then the update would be ["102", "12"], where "12" is the new size.
If there are no more asks at "104", then the ask update would be ["104", "0"].

## Trades

To subscribe:

| field   | type   | description                                       |
|---------|--------|---------------------------------------------------|
| type    | string | Set to <code>subscribe</code>                     |
| channel | string | Set to <code>v3_trades</code>                     |
| id      | string | The market to subscribe to e.g. BTC-USD, LINK-USD |

### Initial Response:

The initial response will contain the historical trades and will be the same structure as GET `/v3/trades/:market`.

| field    | description                                   |
|----------|-----------------------------------------------|
| type     | will be <code>subscribed</code>               |
| channel  | the channel name, i.e. <code>v3_trades</code> |
| id       | the market subscribed to e.g. BTC-USD         |
| contents | the message contents                          |

The contents is structured as:

| field  | type               | description                         |
|--------|--------------------|-------------------------------------|
| trades | array<PublicTrade> | See <code>PublicTrade</code> below. |

PublicTrade:

| field       | type                  | description                                                        |
|-------------|-----------------------|--------------------------------------------------------------------|
| side        | string                | <code>BUY</code> or <code>SELL</code>                              |
| size        | string                | size of the trade                                                  |
| price       | string                | price of the trade                                                 |
| createdAt   | ISO time of the trade | time of the trade                                                  |
| liquidation | boolean               | <code>true</code> if the trade was the result of a liquidation, <code>false</code> otherwise |

Example messages:

> Example initial response:

```json
{
  "type": "subscribed",
  "id": "BTC-USD",
  "connection_id": "e2a6c717-6f77-4c1c-ac22-72ce2b7ed77d",
  "channel": "v3_trades",
  "message_id": 1,
  "contents": {
    "trades": [
      {
        "side": "BUY",
        "size": "100",
        "price": "4000",
        "createdAt": "2020-10-29T00:26:30.759Z"
      },
      {
        "side": "BUY",
        "size": "100",
        "price": "4000",
        "createdAt": "2020-11-02T19:45:42.886Z"
      },
      {
        "side": "BUY",
        "size": "100",
        "price": "4000",
        "createdAt": "2020-10-29T00:26:57.382Z"
      }
    ]
  }
}
```

### Channel Data

Subsequent responses will contain the recently created trades. e.g:

> Subsequent responses

```json
{
  "type": "channel_data",
  "id": "BTC-USD",
  "connection_id": "e2a6c717-6f77-4c1c-ac22-72ce2b7ed77d",
  "channel": "v3_trades",
  "message_id": 2,
  "contents": {
    "trades": [
      {
        "side": "BUY",
        "size": "100",
        "price": "4000",
        "createdAt": "2020-11-29T00:26:30.759Z"
      },
      {
        "side": "SELL",
        "size": "100",
        "price": "4000",
        "createdAt": "2020-11-29T14:00:03.382Z"
      }
    ]
  }
}
```

## Markets

To subscribe:

| field   | type   | description                    |
|---------|--------|--------------------------------|
| type    | string | Set to <code>subscribe</code>  |
| channel | string | Set to <code>v3_markets</code> |

### Initial Response:

Same as [GET /v3/markets](#get-markets)

### Channel Data

Subsequent responses will contain an update for one or more markets. Updates will be sent any time a field(s) changes on a market(s). Updates will only contain the field(s) that have changed:

> Subsequent responses

```json
{
  "type": "channel_data",
  "connection_id": "e2a6c717-6f77-4c1c-ac22-72ce2b7ed77d",
  "channel": "v3_markets",
  "message_id": 2,
  "contents": {
    "ETH-USD": {
        "oraclePrice": "100.23"
    },
    "BTC-USD": {
        "indexPrice": "100.23",
        "priceChange24H": "0.12",
        "initialMarginFraction": "1.23"
    }
  }
}
```
