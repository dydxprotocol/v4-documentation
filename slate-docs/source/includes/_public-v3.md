# Public HTTP API

## Get Markets
> Get Markets

```python
markets = client.public.get_markets()
```

```typescript
const markets: { markets: MarketsResponseObject } = await client.public.getMarkets();
```

```json
{
  "markets": {
    "LINK-USD": {
    "market": "LINK-USD",
    "status": "ONLINE",
    "baseAsset": "LINK",
    "quoteAsset": "USD",
    "stepSize": "0.1",
    "tickSize": "0.01",
    "indexPrice": "12",
    "oraclePrice": "101",
    "priceChange24H": "0",
    "nextFundingRate": "0.0000125000",
    "nextFundingAt": "2021-03-01T18:00:00.000Z",
    "minOrderSize": "1",
    "type": "PERPETUAL",
    "initialMarginFraction": "0.10",
    "maintenanceMarginFraction": "0.05",
    "baselinePositionSize": "1000",
    "incrementalPositionSize": "1000",
    "incrementalInitialMarginFraction": "0.2",
    "volume24H": "0",
    "trades24H": "0",
    "openInterest": "0",
    "maxPositionSize": "10000",
    "assetResolution": "10000000",
    "syntheticAssetId": "0x4c494e4b2d37000000000000000000",
  },
  ...
}
```

### HTTP Request
`GET v3/markets`

Description: Get one or all markets as well as metadata about each retrieved market.

### Request

Parameter         | Description
------------------| -----------
market            | (Optional): Specific market to be fetched.

### Response

### Market

Parameter         | Description
------------------| -----------
markets           | Map of market objects. See below for individual market.

Parameter                | Description
-------------------------| -----------
market                   | Symbol of the market.
status                   | Status of the market. Can be one of <code>ONLINE</code>, <code>OFFLINE</code>, <code>POST_ONLY</code> or <code>CANCEL_ONLY</code>.
baseAsset                | Symbol of the base asset. e.g. "BTC".
quoteAsset               | Symbol of the quote asset. e.g. "BTC".
stepSize                 | The minimum step size (in base currency) of trade sizes for the market.
tickSize                 | The Tick size of the market.
indexPrice               | The current [index price](#index-price-sources) of the market.
oraclePrice              | The current oracle price of the market.
priceChange24H           | The absolute price change of the [index price](#index-price-sources) over the past 24 hours.
nextFundingRate          | The predicted next funding rate (as a 1-hour rate). Can be up to 5 seconds delayed.
nextFundingAt            | The timestamp of the next funding update.
minOrderSize             | Minimum order size for the market.
type                     | Type of the market. This will always be <code>PERPETUAL</code> for now.
initialMarginFraction    | The margin fraction needed to open a position.
maintenanceMarginFraction| The margin fraction required to prevent liquidation.
baselinePositionSize|The max position size (in base token) before increasing the initial-margin-fraction.
incrementalPositionSize|The step size (in base token) for increasing the `initialMarginFraction` by (`incrementalInitialMarginFraction` per step).
incrementalInitialMarginFraction|The increase of `initialMarginFraction` for each `incrementalPositionSize` above the `baselinePositionSize` the position is.
maxPositionSize          | The max position size for this market in base token.
volume24H                | The USD volume of the market in the previous 24 hours.
trades24H                | The number of trades in the market in the previous 24 hours.
openInterest             | The open interest in base token.
assetResolution          | The asset resolution is the number of quantums (Starkware units) that fit within one "human-readable" unit of the asset.
syntheticAssetId         | The id of the synthetic asset traded in the market. Only used for cryptographically signing orders.

## Get Orderbook
> Get Orderbook

```python
from dydx3.constants import MARKET_BTC_USD

orderbook = client.public.get_orderbook(
  market=MARKET_BTC_USD,
)
```

```typescript
const orderbook: OrderbookResponseObject = await client.public.getOrderbook(
  Market.BTC_USD,
);
```

```json
{
  "bids": [
    {
      "price": "29000",
      "size": "1"
    },
    ...
  ],
  "asks": [
    {
      "price": "29500",
      "size": "0.499"
    },
    ...
  ]
}
```

### HTTP Request
`GET v3/orderbook/:market`

<aside class="success">
Returns bids and asks which are each Orderbook order arrays (price and size).
</aside>

Description: Returns the active orderbook for a market. All bids and asks that are fillable are returned.

### Request

Parameter         | Description
----------------- | -----------
market            | Market of the Orderbook.

### Response

Parameter         | Description
----------------- | -----------
bids              | See Orderbook Order below. Sorted by price in descending order.
asks              | See Orderbook Order below. Sorted by price in ascending order.

### Orderbook Order

Parameter         | Description
----------------- | -----------
price             | The price of the order (in quote / base currency).
size              | The size of the order (in base currency).

## Get Trades
> Get Trades

```python
from dydx3.constants import MARKET_BTC_USD

all_trades = client.public.get_trades(
  market=MARKET_BTC_USD,
)
```

```typescript
const trades: { trades: Trade[] } = await client.public.getTrades({
  market: Market.BTC_USD,
  startingBeforeOrAt: "2021-01-05T17:33:43.163Z",
  limit: 1,
});
```

```json
{
  "trades": [
    {
      "side": "BUY",
      "size": "0.001",
      "price": "29000",
      "createdAt": "2021-01-05T16:33:43.163Z",
      "liquidation": false
    },
    ...
  ]
}
```

### HTTP Request
`GET v3/trades/:market`

Description: Get Trades by specified parameters. Passing in all query parameters to the HTTP endpoint would look like: `GET v3/trades/BTC-USD?startingBeforeOrAt=2021-09-05T17:33:43.163Z&limit=1`.

<aside class="notice">
Trades will include information for all users and as such includes less information on individual transactions than the fills endpoint.
</aside>

### Request

Parameter         | Description
----------------- | -----------
market            | Market of the trades.
startingBeforeOrAt| (Optional): Set a date by which the trades had to be created.
limit             | (Optional): The number of candles to fetch (Max 100).

### Response

Parameter         | Description
----------------- | -----------
trades            | An array of trades. See trade below

### Trade

Parameter         | Description
----------------- | -----------
side              | Either <code>BUY</code> or <code>SELL</sell>.
size              | The size of the trade.
price             | The price of the trade.
createdAt         | The time of the trade.
liquidation       | <code>true</code> if the trade was the result of a liquidation. <code>false</code> otherwise.

## Get Fast Withdrawal Liquidity
> Get Fast Withdrawal Liquidity

```python
fast_withdrawals_info = client.public.get_fast_withdrawal()
```

```typescript
const availableFundsMap: {
  liquidityProviders: {
    [positionId: string]: {
      availableFunds: string,
      starkKey: string,
      quote: {
        creditAsset: string,
        creditAmount: string,
        debitAmount: string,
      } | null,
    }
  }
} = await client.public.getFastWithdrawalAvailableFunds();
```

```json
{
  "liquidityProviders": {
    "1812": {
      "availableFunds": "1000",
      "starkKey": "180913017c740260fea4b2c62828a4008ca8b0d6e4",
      "quote": null,
    },
  }
}
```

### HTTP Request
`GET v3/fast-withdrawals`

Description: Returns a map of all LP provider accounts that have available funds for fast withdrawals. Given a `debitAmount` and asset the user wants sent to L1, this endpoint also returns amount of the desired asset the user will be credited on L1. Given a `creditAmount` and asset the user wants sent to L1, this endpoint also returns the amount the user will be debited on L2.

### Request

Parameter    | Description
-------------| -----------
creditAsset	 | (Optional): The asset that would be sent to the user. Required if creditAmount or debitAmount are set.
creditAmount | (Optional): Set this value if the user wants a quote based on the creditAmount.
debitAmount  | (Optional): Set this value if the user wants a quote based on the debitAmount.

<aside class="warning">
Both debitAmount and creditAmount cannot be provided in the same request.
</aside>

### Response

Parameter          | Description
-------------------| -----------
liquidityProviders | Map of LP position IDs to [Liquidity Provider](#liquidity-provider).

### Liquidity Provider

Field          | Description
---------------| -----------
availableFunds | The funds available for the LP.
starkKey       | The public stark key for the LP.
quote          | The [Liquidity Provider Quote](#liquidity-provider-quote) given the user's request. Null if no request from the user or the request is unfillable by this LP.

### Liquidity Provider Quote

Field        | Description
-------------| -----------
creditAsset	 | The asset that would be sent to the user on L1.
creditAmount | The amount of creditAsset that would be sent to the user (human readable).
debitAmount  | The amount of USD that would be deducted from the users L2 account (human readable).


## Get Market Stats
> Get Market Stats

```python
from dydx3.constants import MARKET_BTC_USD

market_statistics = client.public.get_stats(
  market=MARKET_BTC_USD,
  days=MARKET_STATISTIC_DAY_SEVEN,
)
```

```typescript
const marketStatistics = await client.public.getStats({
  market: Market.BTC_USD,
  days: MarketStatisticDay.SEVEN,
});
```

```json
{
  "markets": {
    "ETH-USD": {
      "market": "ETH-USD",
      "open": "1100",
      "close": "1100",
      "high": "1100",
      "low": "1095",
      "baseVolume": "10000",
      "quoteVolume": "100000",
      "type": "PERPETUAL",
      "fees": "1000"
    }
  }
}
```

### HTTP Request
`GET v3/stats/:market`

Description: Get an individual market's statistics over a set period of time or all available periods of time.

### Request

Parameter         | Description
------------------| -----------
market            | Market whose statistics are being fetched.
days              | (Optional): Specified day range for the statistics to have been compiled over. Can be one of `1`, `7`, `30`. Defaults to `1`.

### Response

Parameter         | Description
------------------| -----------
markets           | Map of market to MarketStats. See example below.

### MarketStats

Parameter         | Description
------------------| -----------
market            | The symbol of the market, e.g. ETH-USD.
open              | The open price of the market.
high              | The high price of the market.
low               | The low price of the market.
close             | The close price of the market.
baseVolume        | The total amount of base asset traded.
quoteVolume       | The total amount of quote asset traded.
type              | Type of the market. This will always be <code>PERPETUAL</code> for now.

## Get Historical Funding
> Get Historical Funding

```python
from dydx3.constants import MARKET_BTC_USD

historical_funding = client.public.get_historical_funding(
  market=MARKET_BTC_USD,
)
```

```typescript
const historicalFunding = await client.public.getHistoricalFunding({
  market: Market.BTC_USD,
});
```

```json
{
  "historicalFunding": [
    {
      "market": "BTC-USD",
      "rate": "0.0000125000",
      "price": "31297.5000008009374142",
      "effectiveAt": "2021-01-05T09:10:49.000Z"
    },
    ...
  ]
}
```

### HTTP Request
`GET v3/historical-funding/:market`

Description: Get the historical funding rates for a market.

### Request

Parameter          | Description
-------------------| -----------
market             | Market whose historical funding rates are being fetched.
effectiveBeforeOrAt| (Optional): Set a date by which the historical funding rates had to be created.

### Response

Parameter          | Description
-------------------| -----------
historicalFunding  | Array of HistoricalFunding. See below for individual example.

### Historical Funding

Parameter          | Description
-------------------| -----------
market             | Market for which to query historical funding.
rate               | The funding rate (as a 1-hour rate).
price              | Oracle price used to calculate the funding rate.
effectiveAt        | Time at which funding payments were exchanged at this rate.

## Get Candles for Market
> Get Candles for Market

```python
from dydx3.constants import MARKET_BTC_USD

candles = client.public.get_candles(
  market=MARKET_BTC_USD,
  resolution='1DAY',
)
```

```typescript
const candles: {
  candles: CandleResponseObject,
} = await client.public.getCandles({
  market: Market.BTC_USD,
  resolution: CandleResolution.1DAY,
})
```

```json
  "candles": [
    {
      "startedAt": "2021-01-05T00:00:00.000Z",
      "updatedAt": "2021-01-05T00:00:00.000Z",
      "market": "BTC-USD",
      "resolution": "1DAY",
      "low": "40000",
      "high": "45000",
      "open": "45000",
      "close": "40000",
      "baseTokenVolume": "1.002",
      "trades": "3",
      "usdVolume": "45085",
      "startingOpenInterest": "28"
    },
    ...
  ]
```

### HTTP Request
`GET v3/candles/:market`

Description: Get the candle statistics for a market.

### Request

Parameter          | Description
-------------------| -----------
market             | Market whose candles are being fetched.
resolution         | (Optional): Specific candle resolution being fetched. Can be one of <code>1DAY</code>, <code>4HOURS</code>, <code>1HOUR</code>, <code>30MINS</code>, <code>15MINS</code>, <code>5MINS</code>, <code>1MIN</code>.
fromISO            | (Optional): Starting point for the candles.
toISO              | (Optional): Ending point for the candles.
limit              | (Optional): The number of candles to fetch (Max 100).

### Response

Parameter            | Description
---------------------| -----------
startedAt            | When the candle started, time of first trade in candle.
updatedAt            | When the candle was last updated
market               | Market the candle is for.
resolution           | Time-period of candle (currently 1HOUR or 1DAY).
low                  | Low trade price of the candle.
high                 | High trade price of the candle.
open                 | Open trade price of the candle.
close                | Close trade price of the candle.
baseTokenVolume      | Volume of trade in baseToken currency for the candle.
trades               | Count of trades during the candle.
usdVolume            | Volume of trade in USD for the candle.
startingOpenInterest | The open interest in baseToken at the start of the candle.

## Get Global Configuration Variables

```python
config = client.public.get_config()
```

```typescript
const config: ConfigResponseObject = await client.public.getConfig();
```

```json
  {
    "collateralAssetId": "0x02c04d8b650f44092278a7cb1e1028c82025dff622db96c934b611b84cc8de5a",
    "collateralTokenAddress": "0x8707a5bf4c2842d46b31a405ba41b858c0f876c4",
    "defaultMakerFee": "0.0005",
    "defaultTakerFee": "0.001",
    "exchangeAddress": "0x014F738EAd8Ec6C50BCD456a971F8B84Cd693BBe",
    "maxExpectedBatchLengthMinutes": "240",
    "maxFastWithdrawalAmount": "200000",
    "cancelOrderRateLimiting": {
      "maxPointsMulti": 3,
      "maxPointsSingle": 8500,
      "windowSecMulti": 10,
      "windowSecSingle": 10
    },
    "placeOrderRateLimiting": {
      "maxPoints": 1750,
      "windowSec": 10,
      "targetNotional": 40000,
      "minLimitConsumption": 4,
      "minMarketConsumption": 20,
      "minTriggerableConsumption": 100,
      "maxOrderConsumption": 100
    }
  }
```

### HTTP Request
`GET v3/config`

Description: Get any global configuration variables for the exchange as a whole.

### Response

Parameter                     | Description
----------------------------- | -----------
collateralAssetId             | The assetId of the collateral asset in the Starkware system.
collateralTokenAddress        | The address of the token used as collateral.
defaultMakerFee               | The default maker fee for new accounts.
defaultTakerFee               | The default taker fee for new accounts.
exchangeAddress               | The address of the exchange contract.
maxExpectedBatchLengthMinutes | The maximum expected time between batches L2 (in minutes).
maxFastWithdrawalAmount       | The maximum amount (in USDC) allowed for fast withdrawals.
cancelOrderRateLimiting       | See `cancelOrderRateLimiting` below.
placeOrderRateLimiting        | See `placeOrderRateLimiting` below.

### cancelOrderRateLimiting

Parameter                     | Description
----------------------------- | -----------
maxPointsMulti                | The number of rate limiting points given per window for canceling multiple orders.
maxPointsSingle               | The number of rate limiting points given per window for canceling single orders.
windowSecMulti                | The length of a rate limiting window for canceling multiple orders, in seconds.
windowSecSingle               | The length of a rate limiting window for canceling single orders, in seconds.

### placeOrderRateLimiting

Parameter                     | Description
----------------------------- | -----------
maxPoints                     | The number of rate limiting points given per window.
windowSec                     | The length of a rate limiting window, in seconds.
targetNotional                | The `(size * price)` target used for determining points consumption.
minLimitConsumption           | The minimum number of points used when placing a limit order.
minMarketConsumption          | The minimum number of points used when placing a market order.
minTriggerableConsumption     | The minimum number of points used when placing a triggerable (e.g. stop-loss) order.
maxOrderConsumption           | The maximum number of points used when placing an order.

## Check If User Exists
> Check If User Exists

```python
user_exists = client.public.check_if_user_exists(
  ethereum_address='foo',
)
```

```typescript
const userExists: { exists: boolean } = await client.public.doesUserExistWithAddress(
  'foo',
);
```

```json
{
  "exists": true
}
```

### HTTP Request
`GET v3/users/exists`

Description: Check if a user exists for a given Ethereum address.

### Request

Parameter      | Description
-------------- | -----------
ethereumAddress| Ethereum address that the user would be associated with.

### Response

Parameter      | Description
-------------- | -----------
exists         | If a user exists for the given Ethereum address.

## Check If Username Exists
> Check If Username Exists

```python
username_exists = client.public.check_if_username_exists(
  username='username',
)
```

```typescript
const usernameExists: { exists: boolean } = await client.public.doesUserExistWithUsername(
  'username',
);
```

```json
{
  "exists": true
}
```

### HTTP Request
`GET v3/usernames`

Description: Check if a username has been taken by a user.

### Request

Parameter  | Description
---------- | -----------
username   | Unique username being checked.

### Response

Parameter      | Description
-------------- | -----------
exists         | If a username has been taken by any user.

## Get API Server Time
> Get API Server Time

```python
time_object = client.public.get_time()
```

```typescript
const time: { time: { iso: string, epoch: number } } = await client.public.getTime();
```

```json
{
  "iso": "2021-02-02T18:35:45Z",
  "epoch": "1611965998.515",
}
```

### HTTP Request
`GET v3/time`

Description: Get the current time of the API server.

### Response

Parameter      | Description
-------------- | -----------
iso            | ISO time of the server in UTC.
epoch          | Epoch time in seconds with milliseconds.

## Get Public Leaderboard PNLs
> Get Public Leaderboard PNLs

```typescript
const leaderboardPnls: { pnls: LeaderboardPnlResponseObject } = await client.public.getLeaderboardPnls(
  period=LeaderboardPnlPeriod.WEEKLY,
  sortBy=LeaderboardPnlSortBy.ABSOLUTE,
  limit=10,
);
```

```json
{
  "prizePool": 50000,
  "numHedgiesWinners": 1,
  "numPrizeWinners": 50,
  "ratioPromoted": 0.25,
  "ratioDemoted": 0.5,
  "minimumEquity": 500,
  "minimumDYDXTokens": 0,
  "seasonNumber": 16,
  "topPnls": [
    {
      "username": "user",
      "ethereumAddress": "0x3408105669f73e814be44cbf598679a50eb2f7ed",
      "publicId": "ABCDEFG",
      "absolutePnl": "10206.971314",
      "percentPnl": "0.409100",
      "absoluteRank": 20,
      "percentRank": 1,
      "seasonExpectedOutcome": "SAME_LEAGUE",
      "hedgieWon": null,
      "prizeWon": null
    },
    ...
  ],
    "numParticipants": 1,
    "updatedAt": "2022-02-02T15:31:10.813Z",
    "startedAt": "2022-02-01T15:30:00.000Z",
    "endsAt": "2022-02-02T15:30:00.000Z"
}
```

### HTTP Request
`GET v3/leaderboard-pnl`

<aside class="warning">
Only available for the typescript client and http requests
</aside>

Description: Get the top PNLs for a specified period and how they rank against each other.

### Request

Parameter          | Description
------------------ | -----------
period             | "DAILY", "WEEKLY", "MONTHLY", "ALLTIME", "COMPETITION", "DAILY_COMPETITION", or "LEAGUES".
startingBeforeOrAt | Latest the leaderboard starts at.
sortBy             | Which PNL to sort ranks by. "ABSOLUTE" or "PERCENT".
limit              | (Optional): The number of leaderboard PNLs to fetch (Max 100).

### Response

Parameter         | Description
----------------- | -----------
topPnls           | Array of PNLForPeriod (see below).
numParticipants   | Number of participants in this leaderboard. Includes ranked and unranked participants.
startedAt         | Starting time for this pnl. Note: will only be set if being used for a competition or leagues. Otherwise, this value will always be `null`.
endsAt            | Ending time for this pnl. Note: will only be set if being used for a competition or leagues. Otherwise, this value will always be `null`. (Can be a future time.)
updatedAt         | The time this pnl was updated.
seasonNumber      | Trading leagues season number. Starts at 1. `null` if not leagues.
prizePool         | Prize pool size for period. `null` if not "COMPETITION" or leagues.
numHedgiesWinners | Number of hedgies winners for league. `null` if not a leagues period.
numPrizeWinners   | Number of prize winners for league. `null` if not a leagues period.
ratioPromoted     | Ratio of users promoted for league. `null` if not a leagues period.
ratioDemoted      | Ratio of users demoted for league. `null` if not a leagues period.
minimumEquity     | Minimum account equity required to join league. `null` if not a leagues period.
minimumDYDXTokens | Minimum user DYDX + stkDYDX Token balance required to join league. `null` if not a leagues period.
numHedgiesWinners | Number of hedgies prizes for period. `null` if not leagues.

#### PNLForPeriod

Parameter             | Description
--------------------- | -----------
username              | Publically-displayed username. `null` if not sharing.
ethereumAddress       | User's associated ethereum address. `null` if not sharing.
publicId              | User's public id used in the public profile endpoint.
absolutePnl           | The PNL (in USD) for the specified period. Sorted DESC for "ABSOLUTE" sortBy.
percentPnl            | The percent PNL for the specified period. Sorted DESC for "PERCENT" sortBy.
absoluteRank          | User's absolute PNL rank.
percentRank           | User's percent PNL rank.
seasonExpectedOutcome | User's expected outcome of latest season. "PROMOTION", "DEMOTION", or "SAME_LEAGUE". `null` if not leagues.

## Get Public Retroactive Mining Rewards
> Get Public Retroactive Mining Rewards

```python
rewards = client.public.get_public_retroactive_mining_rewards(
  ethereum_address='foo',
)
```

```typescript
const rewards: PublicRetroactiveMiningRewardsResponseObject = await client.public.getPublicRetroactiveMiningRewards(
  'foo'
);
```

```json
{
  "allocation": "0",
  "targetVolume": "0"
}
```

### HTTP Request
`GET v3/rewards/public-retroactive-mining`

Description: Get the retroactive mining rewards for an ethereum address.

### Request

Parameter       | Description
--------------- | -----------
ethereumAddress | An Ethereum address.

### Response

Parameter          | Description
------------------ | -----------
allocation         | The number of allocated dYdX tokens for the address.
targetVolume       | The addresses' required trade volume (in USD) to be able to claim the allocation.

## Verify an Email Address
> Verify an Email Address

```python
client.public.verify_email(
  token='token',
)
```

```typescript
await client.public.verifyEmail('token');
```

```json
{}
```

### HTTP Request
`PUT v3/emails/verify-email`

Description: Verify an email address by providing the verification token sent to the email address.

### Request

Parameter       | Description
--------------- | -----------
token           | Confirmation token that was sent to a user's email.

### Response

On success, returns a `204` response with an empty body. After receiving a `204`, the user associated with the email the token was sent to will begin getting notification emails for all types [they have specified in their userData](#send-verification-email). Responds with a `400` error if the token is invalid.

## Get Currently Revealed Hedgies
> Get Currently Revealed Hedgies

```typescript
const currentlyRevealedHedgies: {
    daily?: HedgiePeriodResponseObject,
    weekly?: HedgiePeriodResponseObject,
} = await client.public.getCurrentlyRevealedHedgies();
```

```json
{
  "daily": {
    "blockNumber": 14135506,
    "competitionPeriod": 1,
    "tokenIds": [4100]
  },
  "weekly": {
    "blockNumber": 14135506,
    "competitionperiod": 0,
    "tokenIds": [2790, 3000, 4109]
  }
}
```

### HTTP Request
`GET v3/hedgies/current`

<aside class="warning">
Only available for the typescript client and http requests.
</aside>

Description: Get the currently revealed [Hedgies](https://hedgies.wtf/) for competition distribution.

### Response

Parameter          | Description
------------------ | -----------
daily              | NftPeriodInformation for daily Hedgie or undefined.
weekly             | NftPeriodInformation for weekly Hedgies or undefined.

### NftPeriodInformation

Parameter          | Description
------------------ | -----------
blockNumber        | The number of the block whose hash was used to randomly select the Hedgie tokenId from the remaining unrevealed Hedgies (or currently revealed Hedgies in the case of distributing weekly Hedgies).
competitionPeriod  | The zero-indexed period of the competition. Competition 0 was the very first day a Hedgie was revealed for competition winners.
tokenIds           | An array of the numeric tokenIds of the Hedgies.

## Get Historically Revealed Hedgies
> Get Historically Revealed Hedgies

```typescript
const historicallyRevealedHedgies: {
  historicalTokenIds: HedgiePeriodResponseObject[],
} = await client.public.getHistoricallyRevealedHedgies({
    nftRevealType: WEEK,
    start: 1,
  });
```

```json
{
  "historicalTokenIds": [{
    "blockNumber": 14135506,
    "competitionperiod": 0,
    "tokenIds": [2790, 3000, 4109]
  }]
}
```

### HTTP Request
`GET v3/hedgies/history`

<aside class="warning">
Only available for the typescript client and http requests.
</aside>

Description: Get the historically revealed [Hedgies](https://hedgies.wtf/) from competition distributions.

### Request

Parameter       | Description
--------------- | -----------
nftRevealType   | The competition type the Hedgies are being revealed for (`Day` or `Week`).
start           | (Optional): Oldest competition period to be looking from (inclusive).
end             | (Optional): Newest competition period to be looking up to (inclusive).

### Response

Parameter          | Description
------------------ | -----------
historicalTokenIds | [NftPeriodInformation](#get-currently-revealed-hedgies) array.

<aside class="warning">
Rows are returned from newest to oldest row. If start and end are not included, return most recent 100 rows. If only one of startingFrom or endingAt is present, get startingFrom and the 99 rows after or the 99 before and endingAt (both ordered newest row to oldest). If start and end are both present then window must be no greater than 100 inclusive or a 400 error will be returned. Also, competition periods are zero-indexed.
</aside>

## Get Insurance Fund Balance
> Get Insurance Fund Balance

```python
balance = client.public.get_insurance_fund_balance()
```

```typescript
const balance: { balance: number } = await client.public.getInsuranceFundBalance();
```

```json
{
  "balance":"9868319.469028"
}
```

### HTTP Request
`GET v3/insurance-fund/balance`

Description: Get the balance of the [dYdX insurance fund](https://help.dydx.exchange/en/articles/4797358-contract-loss-mechanisms).

### Response

Parameter          | Description
------------------ | -----------
balance            | Balance of the dYdX insurance fund in USD.

## Get Public Profile
Get Public Profile data. This is a subset of the `v3/profile/private` endpoint.

```python
balance = client.public.get_profile("publicId")
```

```typescript
const publicProfile: ProfilePublicResponseObject = await client.public.getProfilePublic("publicId");
```

```json
{
    "username": "foo",
    "ethereumAddress": "0x0913017c740260fea4b2c62828a4008ca8b0d6e4",
    "DYDXHoldings": "250",
    "stakedDYDXHoldings": "250",
    "hedgiesHeld": [111],
    "twitterHandle": "bar",
    "tradingLeagues": {
        "currentLeague": "SILVER",
        "currentLeagueRanking": 12,
    },
    "tradingPnls": {
        "absolutePnl30D": "324",
        "percentPnl30D": "25",
        "volume30D": "4000",
    },
    "tradingRewards": {
        "curEpoch": "8",
        "curEpochEstimatedRewards": 280,
        "prevEpochEstimatedRewards": 125,
    },
}
```

### HTTP Request
`GET v3/profile/:publicId`

Description: Get the public profile of a user given their public id.

### Response

Parameter          | Description
------------------ | -----------
balance            | Balance of the dYdX insurance fund in USD.

### Request

Parameter          | Description
-------------------| -----------
publicId           | Public id of the user

### Response
Parameter           | Description
--------------------| -----------
username            | Publically-displayed username.
publicId            | User's public id used in the public profile endpoint
ethereumAddress     | User's associated ethereum address.
DYDXHoldings        | The user's DYDX token holdings. `null` if not sharing ethereum address.
stakedDYDXHoldings  | The user's stkDYDX token holdings. `null` if not sharing ethereum address.
hedgiesHeld         | Indices of all Hedgies held.
twitterHandle       | The username that appears at the end of a unique Twitter url.
tradingLeagues      | See "TradingLeagues" below.
tradingPnls         | See "TradingPnls" below.
tradingRewards      | See "TradingRewards" below.

### TradingLeagues
Parameter           | Description
--------------------| -----------
currentLeague       | `null, "BRONZE", "SILVER", "GOLD", "PLATINUM", or "DIAMOND"`.
currentLeagueRanking| `null`, or positive integer ranking.

### TradingPnls
Parameter           | Description
--------------------| -----------
absolutePnl30D      | `null`, or user's 30 day absolute pnl (based on leaderboard formula).
percentPnl30D       | `null`, or user's 30 day percent pnl (based on leaderboard formula).
volume30D           | The sum of a user's 30 day maker and taker trading volume.

### TradingRewards
Parameter                | Description
-------------------------| -----------
curEpoch                 | Current epoch number.
curEpochEstimatedRewards | The user's estimated number of dYdX tokens as rewards for the current epoch.
prevEpochEstimatedRewards| The user's estimated number of dYdX tokens as rewards for the previous epoch.
