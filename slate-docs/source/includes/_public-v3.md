# Indexer

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

Base URLs:

* For **the deployment by DYDX token holders**, use <a href="https://indexer.dydx.trade/v4">https://indexer.dydx.trade/v4</a>
* For **Testnet**, use <a href="https://dydx-testnet.imperator.co/v4">https://dydx-testnet.imperator.co/v4</a>

Note: Messages on Indexer WebSocket feeds are typically more recent than data fetched via Indexer's REST API, because the latter is backed by read replicas of the databases that feed the former. Ordinarily this difference is minimal (less than a second), but it might become prolonged under load. Please see [Indexer Architecture](https://dydx.exchange/blog/v4-deep-dive-indexer) for more information.

## Indexer API


### GetAddress

<a id="opIdGetAddress"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

## For the deployment by DYDX token holders, use
## baseURL = 'https://indexer.dydx.trade/v4'
baseURL = 'https://dydx-testnet.imperator.co/v4'

r = requests.get(f'{baseURL}/addresses/{address}', headers = headers)

print(r.json())

```

```javascript

const headers = {
  'Accept':'application/json'
};

// For the deployment by DYDX token holders, use
// const baseURL = 'https://indexer.dydx.trade/v4';
const baseURL = 'https://dydx-testnet.imperator.co/v4';

fetch(`${baseURL}/addresses/{address}`,
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /addresses/{address}`

#### Parameters

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|address|path|string|true|none|

> Example responses

> 200 Response

```json
{
  "subaccounts": [
    {
      "address": "string",
      "subaccountNumber": 0.1,
      "equity": "string",
      "freeCollateral": "string",
      "openPerpetualPositions": {
        "property1": {
          "market": "string",
          "status": "OPEN",
          "side": "LONG",
          "size": "string",
          "maxSize": "string",
          "entryPrice": "string",
          "realizedPnl": "string",
          "createdAt": "string",
          "createdAtHeight": "string",
          "sumOpen": "string",
          "sumClose": "string",
          "netFunding": "string",
          "unrealizedPnl": "string",
          "closedAt": null,
          "exitPrice": "string",
          "subaccountNumber": 0.1
        },
        "property2": {
          "market": "string",
          "status": "OPEN",
          "side": "LONG",
          "size": "string",
          "maxSize": "string",
          "entryPrice": "string",
          "realizedPnl": "string",
          "createdAt": "string",
          "createdAtHeight": "string",
          "sumOpen": "string",
          "sumClose": "string",
          "netFunding": "string",
          "unrealizedPnl": "string",
          "closedAt": null,
          "exitPrice": "string",
          "subaccountNumber": 0.1
        }
      },
      "assetPositions": {
        "property1": {
          "symbol": "string",
          "side": "LONG",
          "size": "string",
          "assetId": "string",
          "subaccountNumber": 0.1
        },
        "property2": {
          "symbol": "string",
          "side": "LONG",
          "size": "string",
          "assetId": "string",
          "subaccountNumber": 0.1
        }
      },
      "marginEnabled": true,
      "updatedAtHeight": "string"
    }
  ],
  "totalTradingRewards": "string"
}
```

#### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Ok|[AddressResponse](#schemaaddressresponse)|

<aside class="success">
This operation does not require authentication
</aside>

### GetSubaccount

<a id="opIdGetSubaccount"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

## For the deployment by DYDX token holders, use
## baseURL = 'https://indexer.dydx.trade/v4'
baseURL = 'https://dydx-testnet.imperator.co/v4'

r = requests.get(f'{baseURL}/addresses/{address}/subaccountNumber/{subaccountNumber}', headers = headers)

print(r.json())

```

```javascript

const headers = {
  'Accept':'application/json'
};

// For the deployment by DYDX token holders, use
// const baseURL = 'https://indexer.dydx.trade/v4';
const baseURL = 'https://dydx-testnet.imperator.co/v4';

fetch(`${baseURL}/addresses/{address}/subaccountNumber/{subaccountNumber}`,
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /addresses/{address}/subaccountNumber/{subaccountNumber}`

#### Parameters

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|address|path|string|true|none|
|subaccountNumber|path|number(double)|true|none|

> Example responses

> 200 Response

```json
{
  "address": "string",
  "subaccountNumber": 0.1,
  "equity": "string",
  "freeCollateral": "string",
  "openPerpetualPositions": {
    "property1": {
      "market": "string",
      "status": "OPEN",
      "side": "LONG",
      "size": "string",
      "maxSize": "string",
      "entryPrice": "string",
      "realizedPnl": "string",
      "createdAt": "string",
      "createdAtHeight": "string",
      "sumOpen": "string",
      "sumClose": "string",
      "netFunding": "string",
      "unrealizedPnl": "string",
      "closedAt": "string",
      "exitPrice": "string",
      "subaccountNumber": 0.1
    },
    "property2": {
      "market": "string",
      "status": "OPEN",
      "side": "LONG",
      "size": "string",
      "maxSize": "string",
      "entryPrice": "string",
      "realizedPnl": "string",
      "createdAt": "string",
      "createdAtHeight": "string",
      "sumOpen": "string",
      "sumClose": "string",
      "netFunding": "string",
      "unrealizedPnl": "string",
      "closedAt": "string",
      "exitPrice": "string",
      "subaccountNumber": 0.1
    }
  },
  "assetPositions": {
    "property1": {
      "symbol": "string",
      "side": "LONG",
      "size": "string",
      "assetId": "string",
      "subaccountNumber": 0.1
    },
    "property2": {
      "symbol": "string",
      "side": "LONG",
      "size": "string",
      "assetId": "string",
      "subaccountNumber": 0.1
    }
  },
  "marginEnabled": true,
  "updatedAtHeight": "string"
}
```

#### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Ok|[SubaccountResponseObject](#schemasubaccountresponseobject)|

<aside class="success">
This operation does not require authentication
</aside>

### GetParentSubaccount

<a id="opIdGetParentSubaccount"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

## For the deployment by DYDX token holders, use
## baseURL = 'https://indexer.dydx.trade/v4'
baseURL = 'https://dydx-testnet.imperator.co/v4'

r = requests.get(f'{baseURL}/addresses/{address}/parentSubaccountNumber/{parentSubaccountNumber}', headers = headers)

print(r.json())

```

```javascript

const headers = {
  'Accept':'application/json'
};

// For the deployment by DYDX token holders, use
// const baseURL = 'https://indexer.dydx.trade/v4';
const baseURL = 'https://dydx-testnet.imperator.co/v4';

fetch(`${baseURL}/addresses/{address}/parentSubaccountNumber/{parentSubaccountNumber}`,
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /addresses/{address}/parentSubaccountNumber/{parentSubaccountNumber}`

#### Parameters

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|address|path|string|true|none|
|parentSubaccountNumber|path|number(double)|true|none|

> Example responses

> 200 Response

```json
{
  "address": "string",
  "parentSubaccountNumber": 0.1,
  "equity": "string",
  "freeCollateral": "string",
  "childSubaccounts": [
    {
      "address": "string",
      "subaccountNumber": 0.1,
      "equity": "string",
      "freeCollateral": "string",
      "openPerpetualPositions": {
        "property1": {
          "market": "string",
          "status": "OPEN",
          "side": "LONG",
          "size": "string",
          "maxSize": "string",
          "entryPrice": "string",
          "realizedPnl": "string",
          "createdAt": "string",
          "createdAtHeight": "string",
          "sumOpen": "string",
          "sumClose": "string",
          "netFunding": "string",
          "unrealizedPnl": "string",
          "closedAt": null,
          "exitPrice": "string",
          "subaccountNumber": 0.1
        },
        "property2": {
          "market": "string",
          "status": "OPEN",
          "side": "LONG",
          "size": "string",
          "maxSize": "string",
          "entryPrice": "string",
          "realizedPnl": "string",
          "createdAt": "string",
          "createdAtHeight": "string",
          "sumOpen": "string",
          "sumClose": "string",
          "netFunding": "string",
          "unrealizedPnl": "string",
          "closedAt": null,
          "exitPrice": "string",
          "subaccountNumber": 0.1
        }
      },
      "assetPositions": {
        "property1": {
          "symbol": "string",
          "side": "LONG",
          "size": "string",
          "assetId": "string",
          "subaccountNumber": 0.1
        },
        "property2": {
          "symbol": "string",
          "side": "LONG",
          "size": "string",
          "assetId": "string",
          "subaccountNumber": 0.1
        }
      },
      "marginEnabled": true,
      "updatedAtHeight": "string"
    }
  ]
}
```

#### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Ok|[ParentSubaccountResponse](#schemaparentsubaccountresponse)|

<aside class="success">
This operation does not require authentication
</aside>

### GetAssetPositions

<a id="opIdGetAssetPositions"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

## For the deployment by DYDX token holders, use
## baseURL = 'https://indexer.dydx.trade/v4'
baseURL = 'https://dydx-testnet.imperator.co/v4'

r = requests.get(f'{baseURL}/assetPositions', params={
  'address': 'string',  'subaccountNumber': '0.1'
}, headers = headers)

print(r.json())

```

```javascript

const headers = {
  'Accept':'application/json'
};

// For the deployment by DYDX token holders, use
// const baseURL = 'https://indexer.dydx.trade/v4';
const baseURL = 'https://dydx-testnet.imperator.co/v4';

fetch(`${baseURL}/assetPositions?address=string&subaccountNumber=0.1`,
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /assetPositions`

#### Parameters

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|address|query|string|true|none|
|subaccountNumber|query|number(double)|true|none|

> Example responses

> 200 Response

```json
{
  "positions": [
    {
      "symbol": "string",
      "side": "LONG",
      "size": "string",
      "assetId": "string",
      "subaccountNumber": 0.1
    }
  ]
}
```

#### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Ok|[AssetPositionResponse](#schemaassetpositionresponse)|

<aside class="success">
This operation does not require authentication
</aside>

### GetAssetPositionsForParentSubaccount

<a id="opIdGetAssetPositionsForParentSubaccount"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

## For the deployment by DYDX token holders, use
## baseURL = 'https://indexer.dydx.trade/v4'
baseURL = 'https://dydx-testnet.imperator.co/v4'

r = requests.get(f'{baseURL}/assetPositions/parentSubaccountNumber', params={
  'address': 'string',  'parentSubaccountNumber': '0.1'
}, headers = headers)

print(r.json())

```

```javascript

const headers = {
  'Accept':'application/json'
};

// For the deployment by DYDX token holders, use
// const baseURL = 'https://indexer.dydx.trade/v4';
const baseURL = 'https://dydx-testnet.imperator.co/v4';

fetch(`${baseURL}/assetPositions/parentSubaccountNumber?address=string&parentSubaccountNumber=0.1`,
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /assetPositions/parentSubaccountNumber`

#### Parameters

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|address|query|string|true|none|
|parentSubaccountNumber|query|number(double)|true|none|

> Example responses

> 200 Response

```json
{
  "positions": [
    {
      "symbol": "string",
      "side": "LONG",
      "size": "string",
      "assetId": "string",
      "subaccountNumber": 0.1
    }
  ]
}
```

#### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Ok|[AssetPositionResponse](#schemaassetpositionresponse)|

<aside class="success">
This operation does not require authentication
</aside>

### GetCandles

<a id="opIdGetCandles"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

## For the deployment by DYDX token holders, use
## baseURL = 'https://indexer.dydx.trade/v4'
baseURL = 'https://dydx-testnet.imperator.co/v4'

r = requests.get(f'{baseURL}/candles/perpetualMarkets/{ticker}', params={
  'resolution': '1MIN'
}, headers = headers)

print(r.json())

```

```javascript

const headers = {
  'Accept':'application/json'
};

// For the deployment by DYDX token holders, use
// const baseURL = 'https://indexer.dydx.trade/v4';
const baseURL = 'https://dydx-testnet.imperator.co/v4';

fetch(`${baseURL}/candles/perpetualMarkets/{ticker}?resolution=1MIN`,
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /candles/perpetualMarkets/{ticker}`

#### Parameters

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|ticker|path|string|true|none|
|resolution|query|[CandleResolution](#schemacandleresolution)|true|none|
|limit|query|number(double)|false|none|
|fromISO|query|string|false|none|
|toISO|query|string|false|none|

##### Enumerated Values

|Parameter|Value|
|---|---|
|resolution|1MIN|
|resolution|5MINS|
|resolution|15MINS|
|resolution|30MINS|
|resolution|1HOUR|
|resolution|4HOURS|
|resolution|1DAY|

> Example responses

> 200 Response

```json
{
  "candles": [
    {
      "startedAt": "string",
      "ticker": "string",
      "resolution": "1MIN",
      "low": "string",
      "high": "string",
      "open": "string",
      "close": "string",
      "baseTokenVolume": "string",
      "usdVolume": "string",
      "trades": 0.1,
      "startingOpenInterest": "string",
      "id": "string"
    }
  ]
}
```

#### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Ok|[CandleResponse](#schemacandleresponse)|

<aside class="success">
This operation does not require authentication
</aside>

### Screen

<a id="opIdScreen"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

## For the deployment by DYDX token holders, use
## baseURL = 'https://indexer.dydx.trade/v4'
baseURL = 'https://dydx-testnet.imperator.co/v4'

r = requests.get(f'{baseURL}/compliance/screen/{address}', headers = headers)

print(r.json())

```

```javascript

const headers = {
  'Accept':'application/json'
};

// For the deployment by DYDX token holders, use
// const baseURL = 'https://indexer.dydx.trade/v4';
const baseURL = 'https://dydx-testnet.imperator.co/v4';

fetch(`${baseURL}/compliance/screen/{address}`,
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /compliance/screen/{address}`

#### Parameters

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|address|path|string|true|none|

> Example responses

> 200 Response

```json
{
  "status": "COMPLIANT",
  "reason": "MANUAL",
  "updatedAt": "string"
}
```

#### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Ok|[ComplianceV2Response](#schemacompliancev2response)|

<aside class="success">
This operation does not require authentication
</aside>

### GetFills

<a id="opIdGetFills"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

## For the deployment by DYDX token holders, use
## baseURL = 'https://indexer.dydx.trade/v4'
baseURL = 'https://dydx-testnet.imperator.co/v4'

r = requests.get(f'{baseURL}/fills', params={
  'address': 'string',  'subaccountNumber': '0.1'
}, headers = headers)

print(r.json())

```

```javascript

const headers = {
  'Accept':'application/json'
};

// For the deployment by DYDX token holders, use
// const baseURL = 'https://indexer.dydx.trade/v4';
const baseURL = 'https://dydx-testnet.imperator.co/v4';

fetch(`${baseURL}/fills?address=string&subaccountNumber=0.1`,
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /fills`

#### Parameters

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|address|query|string|true|none|
|subaccountNumber|query|number(double)|true|none|
|market|query|string|false|none|
|marketType|query|[MarketType](#schemamarkettype)|false|none|
|limit|query|number(double)|false|none|
|createdBeforeOrAtHeight|query|number(double)|false|none|
|createdBeforeOrAt|query|[IsoString](#schemaisostring)|false|none|
|page|query|number(double)|false|none|

##### Enumerated Values

|Parameter|Value|
|---|---|
|marketType|PERPETUAL|
|marketType|SPOT|

> Example responses

> 200 Response

```json
{
  "pageSize": 0.1,
  "totalResults": 0.1,
  "offset": 0.1,
  "fills": [
    {
      "id": "string",
      "side": "BUY",
      "liquidity": "TAKER",
      "type": "LIMIT",
      "market": "string",
      "marketType": "PERPETUAL",
      "price": "string",
      "size": "string",
      "fee": "string",
      "createdAt": "string",
      "createdAtHeight": "string",
      "orderId": "string",
      "clientMetadata": "string",
      "subaccountNumber": 0.1
    }
  ]
}
```

#### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Ok|[FillResponse](#schemafillresponse)|

<aside class="success">
This operation does not require authentication
</aside>

### GetFillsForParentSubaccount

<a id="opIdGetFillsForParentSubaccount"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

## For the deployment by DYDX token holders, use
## baseURL = 'https://indexer.dydx.trade/v4'
baseURL = 'https://dydx-testnet.imperator.co/v4'

r = requests.get(f'{baseURL}/fills/parentSubaccount', params={
  'address': 'string',  'parentSubaccountNumber': '0.1'
}, headers = headers)

print(r.json())

```

```javascript

const headers = {
  'Accept':'application/json'
};

// For the deployment by DYDX token holders, use
// const baseURL = 'https://indexer.dydx.trade/v4';
const baseURL = 'https://dydx-testnet.imperator.co/v4';

fetch(`${baseURL}/fills/parentSubaccount?address=string&parentSubaccountNumber=0.1`,
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /fills/parentSubaccount`

#### Parameters

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|address|query|string|true|none|
|parentSubaccountNumber|query|number(double)|true|none|
|market|query|string|false|none|
|marketType|query|[MarketType](#schemamarkettype)|false|none|
|limit|query|number(double)|false|none|
|createdBeforeOrAtHeight|query|number(double)|false|none|
|createdBeforeOrAt|query|[IsoString](#schemaisostring)|false|none|
|page|query|number(double)|false|none|

##### Enumerated Values

|Parameter|Value|
|---|---|
|marketType|PERPETUAL|
|marketType|SPOT|

> Example responses

> 200 Response

```json
{
  "pageSize": 0.1,
  "totalResults": 0.1,
  "offset": 0.1,
  "fills": [
    {
      "id": "string",
      "side": "BUY",
      "liquidity": "TAKER",
      "type": "LIMIT",
      "market": "string",
      "marketType": "PERPETUAL",
      "price": "string",
      "size": "string",
      "fee": "string",
      "createdAt": "string",
      "createdAtHeight": "string",
      "orderId": "string",
      "clientMetadata": "string",
      "subaccountNumber": 0.1
    }
  ]
}
```

#### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Ok|[FillResponse](#schemafillresponse)|

<aside class="success">
This operation does not require authentication
</aside>

### GetHeight

<a id="opIdGetHeight"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

## For the deployment by DYDX token holders, use
## baseURL = 'https://indexer.dydx.trade/v4'
baseURL = 'https://dydx-testnet.imperator.co/v4'

r = requests.get(f'{baseURL}/height', headers = headers)

print(r.json())

```

```javascript

const headers = {
  'Accept':'application/json'
};

// For the deployment by DYDX token holders, use
// const baseURL = 'https://indexer.dydx.trade/v4';
const baseURL = 'https://dydx-testnet.imperator.co/v4';

fetch(`${baseURL}/height`,
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /height`

> Example responses

> 200 Response

```json
{
  "height": "string",
  "time": "string"
}
```

#### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Ok|[HeightResponse](#schemaheightresponse)|

<aside class="success">
This operation does not require authentication
</aside>

### GetTradingRewards

<a id="opIdGetTradingRewards"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

## For the deployment by DYDX token holders, use
## baseURL = 'https://indexer.dydx.trade/v4'
baseURL = 'https://dydx-testnet.imperator.co/v4'

r = requests.get(f'{baseURL}/historicalBlockTradingRewards/{address}', headers = headers)

print(r.json())

```

```javascript

const headers = {
  'Accept':'application/json'
};

// For the deployment by DYDX token holders, use
// const baseURL = 'https://indexer.dydx.trade/v4';
const baseURL = 'https://dydx-testnet.imperator.co/v4';

fetch(`${baseURL}/historicalBlockTradingRewards/{address}`,
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /historicalBlockTradingRewards/{address}`

#### Parameters

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|address|path|string|true|none|
|limit|query|number(double)|false|none|
|startingBeforeOrAt|query|[IsoString](#schemaisostring)|false|none|
|startingBeforeOrAtHeight|query|string|false|none|

> Example responses

> 200 Response

```json
{
  "rewards": [
    {
      "tradingReward": "string",
      "createdAt": "string",
      "createdAtHeight": "string"
    }
  ]
}
```

#### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Ok|[HistoricalBlockTradingRewardsResponse](#schemahistoricalblocktradingrewardsresponse)|

<aside class="success">
This operation does not require authentication
</aside>

### GetHistoricalFunding

<a id="opIdGetHistoricalFunding"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

## For the deployment by DYDX token holders, use
## baseURL = 'https://indexer.dydx.trade/v4'
baseURL = 'https://dydx-testnet.imperator.co/v4'

r = requests.get(f'{baseURL}/historicalFunding/{ticker}', headers = headers)

print(r.json())

```

```javascript

const headers = {
  'Accept':'application/json'
};

// For the deployment by DYDX token holders, use
// const baseURL = 'https://indexer.dydx.trade/v4';
const baseURL = 'https://dydx-testnet.imperator.co/v4';

fetch(`${baseURL}/historicalFunding/{ticker}`,
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /historicalFunding/{ticker}`

#### Parameters

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|ticker|path|string|true|none|
|limit|query|number(double)|false|none|
|effectiveBeforeOrAtHeight|query|number(double)|false|none|
|effectiveBeforeOrAt|query|[IsoString](#schemaisostring)|false|none|

> Example responses

> 200 Response

```json
{
  "historicalFunding": [
    {
      "ticker": "string",
      "rate": "string",
      "price": "string",
      "effectiveAt": "string",
      "effectiveAtHeight": "string"
    }
  ]
}
```

#### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Ok|[HistoricalFundingResponse](#schemahistoricalfundingresponse)|

<aside class="success">
This operation does not require authentication
</aside>

### GetHistoricalPnl

<a id="opIdGetHistoricalPnl"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

## For the deployment by DYDX token holders, use
## baseURL = 'https://indexer.dydx.trade/v4'
baseURL = 'https://dydx-testnet.imperator.co/v4'

r = requests.get(f'{baseURL}/historical-pnl', params={
  'address': 'string',  'subaccountNumber': '0.1'
}, headers = headers)

print(r.json())

```

```javascript

const headers = {
  'Accept':'application/json'
};

// For the deployment by DYDX token holders, use
// const baseURL = 'https://indexer.dydx.trade/v4';
const baseURL = 'https://dydx-testnet.imperator.co/v4';

fetch(`${baseURL}/historical-pnl?address=string&subaccountNumber=0.1`,
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /historical-pnl`

#### Parameters

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|address|query|string|true|none|
|subaccountNumber|query|number(double)|true|none|
|limit|query|number(double)|false|none|
|createdBeforeOrAtHeight|query|number(double)|false|none|
|createdBeforeOrAt|query|[IsoString](#schemaisostring)|false|none|
|createdOnOrAfterHeight|query|number(double)|false|none|
|createdOnOrAfter|query|[IsoString](#schemaisostring)|false|none|
|page|query|number(double)|false|none|

> Example responses

> 200 Response

```json
{
  "pageSize": 0.1,
  "totalResults": 0.1,
  "offset": 0.1,
  "historicalPnl": [
    {
      "id": "string",
      "subaccountId": "string",
      "equity": "string",
      "totalPnl": "string",
      "netTransfers": "string",
      "createdAt": "string",
      "blockHeight": "string",
      "blockTime": "string"
    }
  ]
}
```

#### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Ok|[HistoricalPnlResponse](#schemahistoricalpnlresponse)|

<aside class="success">
This operation does not require authentication
</aside>

### GetHistoricalPnlForParentSubaccount

<a id="opIdGetHistoricalPnlForParentSubaccount"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

## For the deployment by DYDX token holders, use
## baseURL = 'https://indexer.dydx.trade/v4'
baseURL = 'https://dydx-testnet.imperator.co/v4'

r = requests.get(f'{baseURL}/historical-pnl/parentSubaccount', params={
  'address': 'string',  'parentSubaccountNumber': '0.1'
}, headers = headers)

print(r.json())

```

```javascript

const headers = {
  'Accept':'application/json'
};

// For the deployment by DYDX token holders, use
// const baseURL = 'https://indexer.dydx.trade/v4';
const baseURL = 'https://dydx-testnet.imperator.co/v4';

fetch(`${baseURL}/historical-pnl/parentSubaccount?address=string&parentSubaccountNumber=0.1`,
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /historical-pnl/parentSubaccount`

#### Parameters

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|address|query|string|true|none|
|parentSubaccountNumber|query|number(double)|true|none|
|limit|query|number(double)|false|none|
|createdBeforeOrAtHeight|query|number(double)|false|none|
|createdBeforeOrAt|query|[IsoString](#schemaisostring)|false|none|
|createdOnOrAfterHeight|query|number(double)|false|none|
|createdOnOrAfter|query|[IsoString](#schemaisostring)|false|none|
|page|query|number(double)|false|none|

> Example responses

> 200 Response

```json
{
  "pageSize": 0.1,
  "totalResults": 0.1,
  "offset": 0.1,
  "historicalPnl": [
    {
      "id": "string",
      "subaccountId": "string",
      "equity": "string",
      "totalPnl": "string",
      "netTransfers": "string",
      "createdAt": "string",
      "blockHeight": "string",
      "blockTime": "string"
    }
  ]
}
```

#### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Ok|[HistoricalPnlResponse](#schemahistoricalpnlresponse)|

<aside class="success">
This operation does not require authentication
</aside>

### GetAggregations

<a id="opIdGetAggregations"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

## For the deployment by DYDX token holders, use
## baseURL = 'https://indexer.dydx.trade/v4'
baseURL = 'https://dydx-testnet.imperator.co/v4'

r = requests.get(f'{baseURL}/historicalTradingRewardAggregations/{address}', params={
  'period': 'DAILY'
}, headers = headers)

print(r.json())

```

```javascript

const headers = {
  'Accept':'application/json'
};

// For the deployment by DYDX token holders, use
// const baseURL = 'https://indexer.dydx.trade/v4';
const baseURL = 'https://dydx-testnet.imperator.co/v4';

fetch(`${baseURL}/historicalTradingRewardAggregations/{address}?period=DAILY`,
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /historicalTradingRewardAggregations/{address}`

#### Parameters

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|address|path|string|true|none|
|period|query|[TradingRewardAggregationPeriod](#schematradingrewardaggregationperiod)|true|none|
|limit|query|number(double)|false|none|
|startingBeforeOrAt|query|[IsoString](#schemaisostring)|false|none|
|startingBeforeOrAtHeight|query|string|false|none|

##### Enumerated Values

|Parameter|Value|
|---|---|
|period|DAILY|
|period|WEEKLY|
|period|MONTHLY|

> Example responses

> 200 Response

```json
{
  "rewards": [
    {
      "tradingReward": "string",
      "startedAt": "string",
      "startedAtHeight": "string",
      "endedAt": "string",
      "endedAtHeight": "string",
      "period": "DAILY"
    }
  ]
}
```

#### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Ok|[HistoricalTradingRewardAggregationsResponse](#schemahistoricaltradingrewardaggregationsresponse)|

<aside class="success">
This operation does not require authentication
</aside>

### GetPerpetualMarket

<a id="opIdGetPerpetualMarket"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

## For the deployment by DYDX token holders, use
## baseURL = 'https://indexer.dydx.trade/v4'
baseURL = 'https://dydx-testnet.imperator.co/v4'

r = requests.get(f'{baseURL}/orderbooks/perpetualMarket/{ticker}', headers = headers)

print(r.json())

```

```javascript

const headers = {
  'Accept':'application/json'
};

// For the deployment by DYDX token holders, use
// const baseURL = 'https://indexer.dydx.trade/v4';
const baseURL = 'https://dydx-testnet.imperator.co/v4';

fetch(`${baseURL}/orderbooks/perpetualMarket/{ticker}`,
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /orderbooks/perpetualMarket/{ticker}`

#### Parameters

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|ticker|path|string|true|none|

> Example responses

> 200 Response

```json
{
  "bids": [
    {
      "price": "string",
      "size": "string"
    }
  ],
  "asks": [
    {
      "price": "string",
      "size": "string"
    }
  ]
}
```

#### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Ok|[OrderbookResponseObject](#schemaorderbookresponseobject)|

<aside class="success">
This operation does not require authentication
</aside>

### ListOrders

<a id="opIdListOrders"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

## For the deployment by DYDX token holders, use
## baseURL = 'https://indexer.dydx.trade/v4'
baseURL = 'https://dydx-testnet.imperator.co/v4'

r = requests.get(f'{baseURL}/orders', params={
  'address': 'string',  'subaccountNumber': '0.1'
}, headers = headers)

print(r.json())

```

```javascript

const headers = {
  'Accept':'application/json'
};

// For the deployment by DYDX token holders, use
// const baseURL = 'https://indexer.dydx.trade/v4';
const baseURL = 'https://dydx-testnet.imperator.co/v4';

fetch(`${baseURL}/orders?address=string&subaccountNumber=0.1`,
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /orders`

#### Parameters

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|address|query|string|true|none|
|subaccountNumber|query|number(double)|true|none|
|limit|query|number(double)|false|none|
|ticker|query|string|false|none|
|side|query|[OrderSide](#schemaorderside)|false|none|
|type|query|[OrderType](#schemaordertype)|false|none|
|status|query|array[any]|false|none|
|goodTilBlockBeforeOrAt|query|number(double)|false|none|
|goodTilBlockTimeBeforeOrAt|query|[IsoString](#schemaisostring)|false|none|
|returnLatestOrders|query|boolean|false|none|

##### Enumerated Values

|Parameter|Value|
|---|---|
|side|BUY|
|side|SELL|
|type|LIMIT|
|type|MARKET|
|type|STOP_LIMIT|
|type|STOP_MARKET|
|type|TRAILING_STOP|
|type|TAKE_PROFIT|
|type|TAKE_PROFIT_MARKET|

> Example responses

> 200 Response

```json
[
  {
    "id": "string",
    "subaccountId": "string",
    "clientId": "string",
    "clobPairId": "string",
    "side": "BUY",
    "size": "string",
    "totalFilled": "string",
    "price": "string",
    "type": "LIMIT",
    "reduceOnly": true,
    "orderFlags": "string",
    "goodTilBlock": "string",
    "goodTilBlockTime": "string",
    "createdAtHeight": "string",
    "clientMetadata": "string",
    "triggerPrice": "string",
    "timeInForce": "GTT",
    "status": "OPEN",
    "postOnly": true,
    "ticker": "string",
    "updatedAt": "string",
    "updatedAtHeight": "string",
    "subaccountNumber": 0.1
  }
]
```

#### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Ok|Inline|

#### Response Schema

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[OrderResponseObject](#schemaorderresponseobject)]|false|none|none|
|» id|string|true|none|none|
|» subaccountId|string|true|none|none|
|» clientId|string|true|none|none|
|» clobPairId|string|true|none|none|
|» side|[OrderSide](#schemaorderside)|true|none|none|
|» size|string|true|none|none|
|» totalFilled|string|true|none|none|
|» price|string|true|none|none|
|» type|[OrderType](#schemaordertype)|true|none|none|
|» reduceOnly|boolean|true|none|none|
|» orderFlags|string|true|none|none|
|» goodTilBlock|string|false|none|none|
|» goodTilBlockTime|string|false|none|none|
|» createdAtHeight|string|false|none|none|
|» clientMetadata|string|true|none|none|
|» triggerPrice|string|false|none|none|
|» timeInForce|[APITimeInForce](#schemaapitimeinforce)|true|none|none|
|» status|any|true|none|none|

*anyOf*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|[OrderStatus](#schemaorderstatus)|false|none|none|

*or*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|[BestEffortOpenedStatus](#schemabesteffortopenedstatus)|false|none|none|

*continued*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» postOnly|boolean|true|none|none|
|» ticker|string|true|none|none|
|» updatedAt|[IsoString](#schemaisostring)|false|none|none|
|» updatedAtHeight|string|false|none|none|
|» subaccountNumber|number(double)|true|none|none|

##### Enumerated Values

|Property|Value|
|---|---|
|side|BUY|
|side|SELL|
|type|LIMIT|
|type|MARKET|
|type|STOP_LIMIT|
|type|STOP_MARKET|
|type|TRAILING_STOP|
|type|TAKE_PROFIT|
|type|TAKE_PROFIT_MARKET|
|timeInForce|GTT|
|timeInForce|FOK|
|timeInForce|IOC|
|*anonymous*|OPEN|
|*anonymous*|FILLED|
|*anonymous*|CANCELED|
|*anonymous*|BEST_EFFORT_CANCELED|
|*anonymous*|UNTRIGGERED|
|*anonymous*|BEST_EFFORT_OPENED|

<aside class="success">
This operation does not require authentication
</aside>

### ListOrdersForParentSubaccount

<a id="opIdListOrdersForParentSubaccount"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

## For the deployment by DYDX token holders, use
## baseURL = 'https://indexer.dydx.trade/v4'
baseURL = 'https://dydx-testnet.imperator.co/v4'

r = requests.get(f'{baseURL}/orders/parentSubaccountNumber', params={
  'address': 'string',  'parentSubaccountNumber': '0.1'
}, headers = headers)

print(r.json())

```

```javascript

const headers = {
  'Accept':'application/json'
};

// For the deployment by DYDX token holders, use
// const baseURL = 'https://indexer.dydx.trade/v4';
const baseURL = 'https://dydx-testnet.imperator.co/v4';

fetch(`${baseURL}/orders/parentSubaccountNumber?address=string&parentSubaccountNumber=0.1`,
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /orders/parentSubaccountNumber`

#### Parameters

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|address|query|string|true|none|
|parentSubaccountNumber|query|number(double)|true|none|
|limit|query|number(double)|false|none|
|ticker|query|string|false|none|
|side|query|[OrderSide](#schemaorderside)|false|none|
|type|query|[OrderType](#schemaordertype)|false|none|
|status|query|array[any]|false|none|
|goodTilBlockBeforeOrAt|query|number(double)|false|none|
|goodTilBlockTimeBeforeOrAt|query|[IsoString](#schemaisostring)|false|none|
|returnLatestOrders|query|boolean|false|none|

##### Enumerated Values

|Parameter|Value|
|---|---|
|side|BUY|
|side|SELL|
|type|LIMIT|
|type|MARKET|
|type|STOP_LIMIT|
|type|STOP_MARKET|
|type|TRAILING_STOP|
|type|TAKE_PROFIT|
|type|TAKE_PROFIT_MARKET|

> Example responses

> 200 Response

```json
[
  {
    "id": "string",
    "subaccountId": "string",
    "clientId": "string",
    "clobPairId": "string",
    "side": "BUY",
    "size": "string",
    "totalFilled": "string",
    "price": "string",
    "type": "LIMIT",
    "reduceOnly": true,
    "orderFlags": "string",
    "goodTilBlock": "string",
    "goodTilBlockTime": "string",
    "createdAtHeight": "string",
    "clientMetadata": "string",
    "triggerPrice": "string",
    "timeInForce": "GTT",
    "status": "OPEN",
    "postOnly": true,
    "ticker": "string",
    "updatedAt": "string",
    "updatedAtHeight": "string",
    "subaccountNumber": 0.1
  }
]
```

#### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Ok|Inline|

#### Response Schema

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[OrderResponseObject](#schemaorderresponseobject)]|false|none|none|
|» id|string|true|none|none|
|» subaccountId|string|true|none|none|
|» clientId|string|true|none|none|
|» clobPairId|string|true|none|none|
|» side|[OrderSide](#schemaorderside)|true|none|none|
|» size|string|true|none|none|
|» totalFilled|string|true|none|none|
|» price|string|true|none|none|
|» type|[OrderType](#schemaordertype)|true|none|none|
|» reduceOnly|boolean|true|none|none|
|» orderFlags|string|true|none|none|
|» goodTilBlock|string|false|none|none|
|» goodTilBlockTime|string|false|none|none|
|» createdAtHeight|string|false|none|none|
|» clientMetadata|string|true|none|none|
|» triggerPrice|string|false|none|none|
|» timeInForce|[APITimeInForce](#schemaapitimeinforce)|true|none|none|
|» status|any|true|none|none|

*anyOf*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|[OrderStatus](#schemaorderstatus)|false|none|none|

*or*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|[BestEffortOpenedStatus](#schemabesteffortopenedstatus)|false|none|none|

*continued*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» postOnly|boolean|true|none|none|
|» ticker|string|true|none|none|
|» updatedAt|[IsoString](#schemaisostring)|false|none|none|
|» updatedAtHeight|string|false|none|none|
|» subaccountNumber|number(double)|true|none|none|

##### Enumerated Values

|Property|Value|
|---|---|
|side|BUY|
|side|SELL|
|type|LIMIT|
|type|MARKET|
|type|STOP_LIMIT|
|type|STOP_MARKET|
|type|TRAILING_STOP|
|type|TAKE_PROFIT|
|type|TAKE_PROFIT_MARKET|
|timeInForce|GTT|
|timeInForce|FOK|
|timeInForce|IOC|
|*anonymous*|OPEN|
|*anonymous*|FILLED|
|*anonymous*|CANCELED|
|*anonymous*|BEST_EFFORT_CANCELED|
|*anonymous*|UNTRIGGERED|
|*anonymous*|BEST_EFFORT_OPENED|

<aside class="success">
This operation does not require authentication
</aside>

### GetOrder

<a id="opIdGetOrder"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

## For the deployment by DYDX token holders, use
## baseURL = 'https://indexer.dydx.trade/v4'
baseURL = 'https://dydx-testnet.imperator.co/v4'

r = requests.get(f'{baseURL}/orders/{orderId}', headers = headers)

print(r.json())

```

```javascript

const headers = {
  'Accept':'application/json'
};

// For the deployment by DYDX token holders, use
// const baseURL = 'https://indexer.dydx.trade/v4';
const baseURL = 'https://dydx-testnet.imperator.co/v4';

fetch(`${baseURL}/orders/{orderId}`,
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /orders/{orderId}`

#### Parameters

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|orderId|path|string|true|none|

> Example responses

> 200 Response

```json
{
  "id": "string",
  "subaccountId": "string",
  "clientId": "string",
  "clobPairId": "string",
  "side": "BUY",
  "size": "string",
  "totalFilled": "string",
  "price": "string",
  "type": "LIMIT",
  "reduceOnly": true,
  "orderFlags": "string",
  "goodTilBlock": "string",
  "goodTilBlockTime": "string",
  "createdAtHeight": "string",
  "clientMetadata": "string",
  "triggerPrice": "string",
  "timeInForce": "GTT",
  "status": "OPEN",
  "postOnly": true,
  "ticker": "string",
  "updatedAt": "string",
  "updatedAtHeight": "string",
  "subaccountNumber": 0.1
}
```

#### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Ok|[OrderResponseObject](#schemaorderresponseobject)|

<aside class="success">
This operation does not require authentication
</aside>

### ListPerpetualMarkets

<a id="opIdListPerpetualMarkets"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

## For the deployment by DYDX token holders, use
## baseURL = 'https://indexer.dydx.trade/v4'
baseURL = 'https://dydx-testnet.imperator.co/v4'

r = requests.get(f'{baseURL}/perpetualMarkets', headers = headers)

print(r.json())

```

```javascript

const headers = {
  'Accept':'application/json'
};

// For the deployment by DYDX token holders, use
// const baseURL = 'https://indexer.dydx.trade/v4';
const baseURL = 'https://dydx-testnet.imperator.co/v4';

fetch(`${baseURL}/perpetualMarkets`,
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /perpetualMarkets`

#### Parameters

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|limit|query|number(double)|false|none|
|ticker|query|string|false|none|

> Example responses

> 200 Response

```json
{
  "markets": {
    "property1": {
      "clobPairId": "string",
      "ticker": "string",
      "status": "ACTIVE",
      "oraclePrice": "string",
      "priceChange24H": "string",
      "volume24H": "string",
      "trades24H": 0.1,
      "nextFundingRate": "string",
      "initialMarginFraction": "string",
      "maintenanceMarginFraction": "string",
      "openInterest": "string",
      "atomicResolution": 0.1,
      "quantumConversionExponent": 0.1,
      "tickSize": "string",
      "stepSize": "string",
      "stepBaseQuantums": 0.1,
      "subticksPerTick": 0.1,
      "marketType": "CROSS",
      "openInterestLowerCap": "string",
      "openInterestUpperCap": "string",
      "baseOpenInterest": "string"
    },
    "property2": {
      "clobPairId": "string",
      "ticker": "string",
      "status": "ACTIVE",
      "oraclePrice": "string",
      "priceChange24H": "string",
      "volume24H": "string",
      "trades24H": 0.1,
      "nextFundingRate": "string",
      "initialMarginFraction": "string",
      "maintenanceMarginFraction": "string",
      "openInterest": "string",
      "atomicResolution": 0.1,
      "quantumConversionExponent": 0.1,
      "tickSize": "string",
      "stepSize": "string",
      "stepBaseQuantums": 0.1,
      "subticksPerTick": 0.1,
      "marketType": "CROSS",
      "openInterestLowerCap": "string",
      "openInterestUpperCap": "string",
      "baseOpenInterest": "string"
    }
  }
}
```

#### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Ok|[PerpetualMarketResponse](#schemaperpetualmarketresponse)|

<aside class="success">
This operation does not require authentication
</aside>

### ListPositions

<a id="opIdListPositions"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

## For the deployment by DYDX token holders, use
## baseURL = 'https://indexer.dydx.trade/v4'
baseURL = 'https://dydx-testnet.imperator.co/v4'

r = requests.get(f'{baseURL}/perpetualPositions', params={
  'address': 'string',  'subaccountNumber': '0.1'
}, headers = headers)

print(r.json())

```

```javascript

const headers = {
  'Accept':'application/json'
};

// For the deployment by DYDX token holders, use
// const baseURL = 'https://indexer.dydx.trade/v4';
const baseURL = 'https://dydx-testnet.imperator.co/v4';

fetch(`${baseURL}/perpetualPositions?address=string&subaccountNumber=0.1`,
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /perpetualPositions`

#### Parameters

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|address|query|string|true|none|
|subaccountNumber|query|number(double)|true|none|
|status|query|array[string]|false|none|
|limit|query|number(double)|false|none|
|createdBeforeOrAtHeight|query|number(double)|false|none|
|createdBeforeOrAt|query|[IsoString](#schemaisostring)|false|none|

##### Enumerated Values

|Parameter|Value|
|---|---|
|status|OPEN|
|status|CLOSED|
|status|LIQUIDATED|

> Example responses

> 200 Response

```json
{
  "positions": [
    {
      "market": "string",
      "status": "OPEN",
      "side": "LONG",
      "size": "string",
      "maxSize": "string",
      "entryPrice": "string",
      "realizedPnl": "string",
      "createdAt": "string",
      "createdAtHeight": "string",
      "sumOpen": "string",
      "sumClose": "string",
      "netFunding": "string",
      "unrealizedPnl": "string",
      "closedAt": "string",
      "exitPrice": "string",
      "subaccountNumber": 0.1
    }
  ]
}
```

#### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Ok|[PerpetualPositionResponse](#schemaperpetualpositionresponse)|

<aside class="success">
This operation does not require authentication
</aside>

### ListPositionsForParentSubaccount

<a id="opIdListPositionsForParentSubaccount"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

## For the deployment by DYDX token holders, use
## baseURL = 'https://indexer.dydx.trade/v4'
baseURL = 'https://dydx-testnet.imperator.co/v4'

r = requests.get(f'{baseURL}/perpetualPositions/parentSubaccountNumber', params={
  'address': 'string',  'parentSubaccountNumber': '0.1'
}, headers = headers)

print(r.json())

```

```javascript

const headers = {
  'Accept':'application/json'
};

// For the deployment by DYDX token holders, use
// const baseURL = 'https://indexer.dydx.trade/v4';
const baseURL = 'https://dydx-testnet.imperator.co/v4';

fetch(`${baseURL}/perpetualPositions/parentSubaccountNumber?address=string&parentSubaccountNumber=0.1`,
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /perpetualPositions/parentSubaccountNumber`

#### Parameters

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|address|query|string|true|none|
|parentSubaccountNumber|query|number(double)|true|none|
|status|query|array[string]|false|none|
|limit|query|number(double)|false|none|
|createdBeforeOrAtHeight|query|number(double)|false|none|
|createdBeforeOrAt|query|[IsoString](#schemaisostring)|false|none|

##### Enumerated Values

|Parameter|Value|
|---|---|
|status|OPEN|
|status|CLOSED|
|status|LIQUIDATED|

> Example responses

> 200 Response

```json
{
  "positions": [
    {
      "market": "string",
      "status": "OPEN",
      "side": "LONG",
      "size": "string",
      "maxSize": "string",
      "entryPrice": "string",
      "realizedPnl": "string",
      "createdAt": "string",
      "createdAtHeight": "string",
      "sumOpen": "string",
      "sumClose": "string",
      "netFunding": "string",
      "unrealizedPnl": "string",
      "closedAt": "string",
      "exitPrice": "string",
      "subaccountNumber": 0.1
    }
  ]
}
```

#### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Ok|[PerpetualPositionResponse](#schemaperpetualpositionresponse)|

<aside class="success">
This operation does not require authentication
</aside>

### Get

<a id="opIdGet"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

## For the deployment by DYDX token holders, use
## baseURL = 'https://indexer.dydx.trade/v4'
baseURL = 'https://dydx-testnet.imperator.co/v4'

r = requests.get(f'{baseURL}/sparklines', params={
  'timePeriod': 'ONE_DAY'
}, headers = headers)

print(r.json())

```

```javascript

const headers = {
  'Accept':'application/json'
};

// For the deployment by DYDX token holders, use
// const baseURL = 'https://indexer.dydx.trade/v4';
const baseURL = 'https://dydx-testnet.imperator.co/v4';

fetch(`${baseURL}/sparklines?timePeriod=ONE_DAY`,
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /sparklines`

#### Parameters

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|timePeriod|query|[SparklineTimePeriod](#schemasparklinetimeperiod)|true|none|

##### Enumerated Values

|Parameter|Value|
|---|---|
|timePeriod|ONE_DAY|
|timePeriod|SEVEN_DAYS|

> Example responses

> 200 Response

```json
{
  "property1": [
    "string"
  ],
  "property2": [
    "string"
  ]
}
```

#### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Ok|[SparklineResponseObject](#schemasparklineresponseobject)|

<aside class="success">
This operation does not require authentication
</aside>

### GetTime

<a id="opIdGetTime"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

## For the deployment by DYDX token holders, use
## baseURL = 'https://indexer.dydx.trade/v4'
baseURL = 'https://dydx-testnet.imperator.co/v4'

r = requests.get(f'{baseURL}/time', headers = headers)

print(r.json())

```

```javascript

const headers = {
  'Accept':'application/json'
};

// For the deployment by DYDX token holders, use
// const baseURL = 'https://indexer.dydx.trade/v4';
const baseURL = 'https://dydx-testnet.imperator.co/v4';

fetch(`${baseURL}/time`,
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /time`

> Example responses

> 200 Response

```json
{
  "iso": "string",
  "epoch": 0.1
}
```

#### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Ok|[TimeResponse](#schematimeresponse)|

<aside class="success">
This operation does not require authentication
</aside>

### GetTrades

<a id="opIdGetTrades"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

## For the deployment by DYDX token holders, use
## baseURL = 'https://indexer.dydx.trade/v4'
baseURL = 'https://dydx-testnet.imperator.co/v4'

r = requests.get(f'{baseURL}/trades/perpetualMarket/{ticker}', headers = headers)

print(r.json())

```

```javascript

const headers = {
  'Accept':'application/json'
};

// For the deployment by DYDX token holders, use
// const baseURL = 'https://indexer.dydx.trade/v4';
const baseURL = 'https://dydx-testnet.imperator.co/v4';

fetch(`${baseURL}/trades/perpetualMarket/{ticker}`,
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /trades/perpetualMarket/{ticker}`

#### Parameters

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|ticker|path|string|true|none|
|limit|query|number(double)|false|none|
|createdBeforeOrAtHeight|query|number(double)|false|none|
|createdBeforeOrAt|query|[IsoString](#schemaisostring)|false|none|
|page|query|number(double)|false|none|

> Example responses

> 200 Response

```json
{
  "pageSize": 0.1,
  "totalResults": 0.1,
  "offset": 0.1,
  "trades": [
    {
      "id": "string",
      "side": "BUY",
      "size": "string",
      "price": "string",
      "type": "LIMIT",
      "createdAt": "string",
      "createdAtHeight": "string"
    }
  ]
}
```

#### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Ok|[TradeResponse](#schematraderesponse)|

<aside class="success">
This operation does not require authentication
</aside>

### GetTransfers

<a id="opIdGetTransfers"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

## For the deployment by DYDX token holders, use
## baseURL = 'https://indexer.dydx.trade/v4'
baseURL = 'https://dydx-testnet.imperator.co/v4'

r = requests.get(f'{baseURL}/transfers', params={
  'address': 'string',  'subaccountNumber': '0.1'
}, headers = headers)

print(r.json())

```

```javascript

const headers = {
  'Accept':'application/json'
};

// For the deployment by DYDX token holders, use
// const baseURL = 'https://indexer.dydx.trade/v4';
const baseURL = 'https://dydx-testnet.imperator.co/v4';

fetch(`${baseURL}/transfers?address=string&subaccountNumber=0.1`,
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /transfers`

#### Parameters

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|address|query|string|true|none|
|subaccountNumber|query|number(double)|true|none|
|limit|query|number(double)|false|none|
|createdBeforeOrAtHeight|query|number(double)|false|none|
|createdBeforeOrAt|query|[IsoString](#schemaisostring)|false|none|
|page|query|number(double)|false|none|

> Example responses

> 200 Response

```json
{
  "pageSize": 0.1,
  "totalResults": 0.1,
  "offset": 0.1,
  "transfers": [
    {
      "id": "string",
      "sender": {
        "subaccountNumber": 0.1,
        "address": "string"
      },
      "recipient": {
        "subaccountNumber": 0.1,
        "address": "string"
      },
      "size": "string",
      "createdAt": "string",
      "createdAtHeight": "string",
      "symbol": "string",
      "type": "TRANSFER_IN",
      "transactionHash": "string"
    }
  ]
}
```

#### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Ok|[TransferResponse](#schematransferresponse)|

<aside class="success">
This operation does not require authentication
</aside>

### GetTransfersForParentSubaccount

<a id="opIdGetTransfersForParentSubaccount"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

## For the deployment by DYDX token holders, use
## baseURL = 'https://indexer.dydx.trade/v4'
baseURL = 'https://dydx-testnet.imperator.co/v4'

r = requests.get(f'{baseURL}/transfers/parentSubaccountNumber', params={
  'address': 'string',  'parentSubaccountNumber': '0.1'
}, headers = headers)

print(r.json())

```

```javascript

const headers = {
  'Accept':'application/json'
};

// For the deployment by DYDX token holders, use
// const baseURL = 'https://indexer.dydx.trade/v4';
const baseURL = 'https://dydx-testnet.imperator.co/v4';

fetch(`${baseURL}/transfers/parentSubaccountNumber?address=string&parentSubaccountNumber=0.1`,
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /transfers/parentSubaccountNumber`

#### Parameters

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|address|query|string|true|none|
|parentSubaccountNumber|query|number(double)|true|none|
|limit|query|number(double)|false|none|
|createdBeforeOrAtHeight|query|number(double)|false|none|
|createdBeforeOrAt|query|[IsoString](#schemaisostring)|false|none|
|page|query|number(double)|false|none|

> Example responses

> 200 Response

```json
{
  "pageSize": 0.1,
  "totalResults": 0.1,
  "offset": 0.1,
  "transfers": [
    {
      "id": "string",
      "sender": {
        "subaccountNumber": 0.1,
        "address": "string"
      },
      "recipient": {
        "subaccountNumber": 0.1,
        "address": "string"
      },
      "size": "string",
      "createdAt": "string",
      "createdAtHeight": "string",
      "symbol": "string",
      "type": "TRANSFER_IN",
      "transactionHash": "string"
    }
  ]
}
```

#### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Ok|[ParentSubaccountTransferResponse](#schemaparentsubaccounttransferresponse)|

<aside class="success">
This operation does not require authentication
</aside>

## Schemas

### PerpetualPositionStatus

<a id="schemaperpetualpositionstatus"></a>
<a id="schema_PerpetualPositionStatus"></a>
<a id="tocSperpetualpositionstatus"></a>
<a id="tocsperpetualpositionstatus"></a>

```json
"OPEN"

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|string|false|none|none|

##### Enumerated Values

|Property|Value|
|---|---|
|*anonymous*|OPEN|
|*anonymous*|CLOSED|
|*anonymous*|LIQUIDATED|

### PositionSide

<a id="schemapositionside"></a>
<a id="schema_PositionSide"></a>
<a id="tocSpositionside"></a>
<a id="tocspositionside"></a>

```json
"LONG"

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|string|false|none|none|

##### Enumerated Values

|Property|Value|
|---|---|
|*anonymous*|LONG|
|*anonymous*|SHORT|

### IsoString

<a id="schemaisostring"></a>
<a id="schema_IsoString"></a>
<a id="tocSisostring"></a>
<a id="tocsisostring"></a>

```json
"string"

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|string|false|none|none|

### PerpetualPositionResponseObject

<a id="schemaperpetualpositionresponseobject"></a>
<a id="schema_PerpetualPositionResponseObject"></a>
<a id="tocSperpetualpositionresponseobject"></a>
<a id="tocsperpetualpositionresponseobject"></a>

```json
{
  "market": "string",
  "status": "OPEN",
  "side": "LONG",
  "size": "string",
  "maxSize": "string",
  "entryPrice": "string",
  "realizedPnl": "string",
  "createdAt": "string",
  "createdAtHeight": "string",
  "sumOpen": "string",
  "sumClose": "string",
  "netFunding": "string",
  "unrealizedPnl": "string",
  "closedAt": "string",
  "exitPrice": "string",
  "subaccountNumber": 0.1
}

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|market|string|true|none|none|
|status|[PerpetualPositionStatus](#schemaperpetualpositionstatus)|true|none|none|
|side|[PositionSide](#schemapositionside)|true|none|none|
|size|string|true|none|none|
|maxSize|string|true|none|none|
|entryPrice|string|true|none|none|
|realizedPnl|string|true|none|none|
|createdAt|[IsoString](#schemaisostring)|true|none|none|
|createdAtHeight|string|true|none|none|
|sumOpen|string|true|none|none|
|sumClose|string|true|none|none|
|netFunding|string|true|none|none|
|unrealizedPnl|string|true|none|none|
|closedAt|[IsoString](#schemaisostring)¦null|false|none|none|
|exitPrice|string¦null|false|none|none|
|subaccountNumber|number(double)|true|none|none|

### PerpetualPositionsMap

<a id="schemaperpetualpositionsmap"></a>
<a id="schema_PerpetualPositionsMap"></a>
<a id="tocSperpetualpositionsmap"></a>
<a id="tocsperpetualpositionsmap"></a>

```json
{
  "property1": {
    "market": "string",
    "status": "OPEN",
    "side": "LONG",
    "size": "string",
    "maxSize": "string",
    "entryPrice": "string",
    "realizedPnl": "string",
    "createdAt": "string",
    "createdAtHeight": "string",
    "sumOpen": "string",
    "sumClose": "string",
    "netFunding": "string",
    "unrealizedPnl": "string",
    "closedAt": "string",
    "exitPrice": "string",
    "subaccountNumber": 0.1
  },
  "property2": {
    "market": "string",
    "status": "OPEN",
    "side": "LONG",
    "size": "string",
    "maxSize": "string",
    "entryPrice": "string",
    "realizedPnl": "string",
    "createdAt": "string",
    "createdAtHeight": "string",
    "sumOpen": "string",
    "sumClose": "string",
    "netFunding": "string",
    "unrealizedPnl": "string",
    "closedAt": "string",
    "exitPrice": "string",
    "subaccountNumber": 0.1
  }
}

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|**additionalProperties**|[PerpetualPositionResponseObject](#schemaperpetualpositionresponseobject)|false|none|none|

### AssetPositionResponseObject

<a id="schemaassetpositionresponseobject"></a>
<a id="schema_AssetPositionResponseObject"></a>
<a id="tocSassetpositionresponseobject"></a>
<a id="tocsassetpositionresponseobject"></a>

```json
{
  "symbol": "string",
  "side": "LONG",
  "size": "string",
  "assetId": "string",
  "subaccountNumber": 0.1
}

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|symbol|string|true|none|none|
|side|[PositionSide](#schemapositionside)|true|none|none|
|size|string|true|none|none|
|assetId|string|true|none|none|
|subaccountNumber|number(double)|true|none|none|

### AssetPositionsMap

<a id="schemaassetpositionsmap"></a>
<a id="schema_AssetPositionsMap"></a>
<a id="tocSassetpositionsmap"></a>
<a id="tocsassetpositionsmap"></a>

```json
{
  "property1": {
    "symbol": "string",
    "side": "LONG",
    "size": "string",
    "assetId": "string",
    "subaccountNumber": 0.1
  },
  "property2": {
    "symbol": "string",
    "side": "LONG",
    "size": "string",
    "assetId": "string",
    "subaccountNumber": 0.1
  }
}

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|**additionalProperties**|[AssetPositionResponseObject](#schemaassetpositionresponseobject)|false|none|none|

### SubaccountResponseObject

<a id="schemasubaccountresponseobject"></a>
<a id="schema_SubaccountResponseObject"></a>
<a id="tocSsubaccountresponseobject"></a>
<a id="tocssubaccountresponseobject"></a>

```json
{
  "address": "string",
  "subaccountNumber": 0.1,
  "equity": "string",
  "freeCollateral": "string",
  "openPerpetualPositions": {
    "property1": {
      "market": "string",
      "status": "OPEN",
      "side": "LONG",
      "size": "string",
      "maxSize": "string",
      "entryPrice": "string",
      "realizedPnl": "string",
      "createdAt": "string",
      "createdAtHeight": "string",
      "sumOpen": "string",
      "sumClose": "string",
      "netFunding": "string",
      "unrealizedPnl": "string",
      "closedAt": "string",
      "exitPrice": "string",
      "subaccountNumber": 0.1
    },
    "property2": {
      "market": "string",
      "status": "OPEN",
      "side": "LONG",
      "size": "string",
      "maxSize": "string",
      "entryPrice": "string",
      "realizedPnl": "string",
      "createdAt": "string",
      "createdAtHeight": "string",
      "sumOpen": "string",
      "sumClose": "string",
      "netFunding": "string",
      "unrealizedPnl": "string",
      "closedAt": "string",
      "exitPrice": "string",
      "subaccountNumber": 0.1
    }
  },
  "assetPositions": {
    "property1": {
      "symbol": "string",
      "side": "LONG",
      "size": "string",
      "assetId": "string",
      "subaccountNumber": 0.1
    },
    "property2": {
      "symbol": "string",
      "side": "LONG",
      "size": "string",
      "assetId": "string",
      "subaccountNumber": 0.1
    }
  },
  "marginEnabled": true,
  "updatedAtHeight": "string"
}

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|address|string|true|none|none|
|subaccountNumber|number(double)|true|none|none|
|equity|string|true|none|none|
|freeCollateral|string|true|none|none|
|openPerpetualPositions|[PerpetualPositionsMap](#schemaperpetualpositionsmap)|true|none|none|
|assetPositions|[AssetPositionsMap](#schemaassetpositionsmap)|true|none|none|
|marginEnabled|boolean|true|none|none|
|updatedAtHeight|string|true|none|none|

### AddressResponse

<a id="schemaaddressresponse"></a>
<a id="schema_AddressResponse"></a>
<a id="tocSaddressresponse"></a>
<a id="tocsaddressresponse"></a>

```json
{
  "subaccounts": [
    {
      "address": "string",
      "subaccountNumber": 0.1,
      "equity": "string",
      "freeCollateral": "string",
      "openPerpetualPositions": {
        "property1": {
          "market": "string",
          "status": "OPEN",
          "side": "LONG",
          "size": "string",
          "maxSize": "string",
          "entryPrice": "string",
          "realizedPnl": "string",
          "createdAt": "string",
          "createdAtHeight": "string",
          "sumOpen": "string",
          "sumClose": "string",
          "netFunding": "string",
          "unrealizedPnl": "string",
          "closedAt": null,
          "exitPrice": "string",
          "subaccountNumber": 0.1
        },
        "property2": {
          "market": "string",
          "status": "OPEN",
          "side": "LONG",
          "size": "string",
          "maxSize": "string",
          "entryPrice": "string",
          "realizedPnl": "string",
          "createdAt": "string",
          "createdAtHeight": "string",
          "sumOpen": "string",
          "sumClose": "string",
          "netFunding": "string",
          "unrealizedPnl": "string",
          "closedAt": null,
          "exitPrice": "string",
          "subaccountNumber": 0.1
        }
      },
      "assetPositions": {
        "property1": {
          "symbol": "string",
          "side": "LONG",
          "size": "string",
          "assetId": "string",
          "subaccountNumber": 0.1
        },
        "property2": {
          "symbol": "string",
          "side": "LONG",
          "size": "string",
          "assetId": "string",
          "subaccountNumber": 0.1
        }
      },
      "marginEnabled": true,
      "updatedAtHeight": "string"
    }
  ],
  "totalTradingRewards": "string"
}

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|subaccounts|[[SubaccountResponseObject](#schemasubaccountresponseobject)]|true|none|none|
|totalTradingRewards|string|true|none|none|

### ParentSubaccountResponse

<a id="schemaparentsubaccountresponse"></a>
<a id="schema_ParentSubaccountResponse"></a>
<a id="tocSparentsubaccountresponse"></a>
<a id="tocsparentsubaccountresponse"></a>

```json
{
  "address": "string",
  "parentSubaccountNumber": 0.1,
  "equity": "string",
  "freeCollateral": "string",
  "childSubaccounts": [
    {
      "address": "string",
      "subaccountNumber": 0.1,
      "equity": "string",
      "freeCollateral": "string",
      "openPerpetualPositions": {
        "property1": {
          "market": "string",
          "status": "OPEN",
          "side": "LONG",
          "size": "string",
          "maxSize": "string",
          "entryPrice": "string",
          "realizedPnl": "string",
          "createdAt": "string",
          "createdAtHeight": "string",
          "sumOpen": "string",
          "sumClose": "string",
          "netFunding": "string",
          "unrealizedPnl": "string",
          "closedAt": null,
          "exitPrice": "string",
          "subaccountNumber": 0.1
        },
        "property2": {
          "market": "string",
          "status": "OPEN",
          "side": "LONG",
          "size": "string",
          "maxSize": "string",
          "entryPrice": "string",
          "realizedPnl": "string",
          "createdAt": "string",
          "createdAtHeight": "string",
          "sumOpen": "string",
          "sumClose": "string",
          "netFunding": "string",
          "unrealizedPnl": "string",
          "closedAt": null,
          "exitPrice": "string",
          "subaccountNumber": 0.1
        }
      },
      "assetPositions": {
        "property1": {
          "symbol": "string",
          "side": "LONG",
          "size": "string",
          "assetId": "string",
          "subaccountNumber": 0.1
        },
        "property2": {
          "symbol": "string",
          "side": "LONG",
          "size": "string",
          "assetId": "string",
          "subaccountNumber": 0.1
        }
      },
      "marginEnabled": true,
      "updatedAtHeight": "string"
    }
  ]
}

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|address|string|true|none|none|
|parentSubaccountNumber|number(double)|true|none|none|
|equity|string|true|none|none|
|freeCollateral|string|true|none|none|
|childSubaccounts|[[SubaccountResponseObject](#schemasubaccountresponseobject)]|true|none|none|

### AssetPositionResponse

<a id="schemaassetpositionresponse"></a>
<a id="schema_AssetPositionResponse"></a>
<a id="tocSassetpositionresponse"></a>
<a id="tocsassetpositionresponse"></a>

```json
{
  "positions": [
    {
      "symbol": "string",
      "side": "LONG",
      "size": "string",
      "assetId": "string",
      "subaccountNumber": 0.1
    }
  ]
}

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|positions|[[AssetPositionResponseObject](#schemaassetpositionresponseobject)]|true|none|none|

### CandleResolution

<a id="schemacandleresolution"></a>
<a id="schema_CandleResolution"></a>
<a id="tocScandleresolution"></a>
<a id="tocscandleresolution"></a>

```json
"1MIN"

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|string|false|none|none|

##### Enumerated Values

|Property|Value|
|---|---|
|*anonymous*|1MIN|
|*anonymous*|5MINS|
|*anonymous*|15MINS|
|*anonymous*|30MINS|
|*anonymous*|1HOUR|
|*anonymous*|4HOURS|
|*anonymous*|1DAY|

### CandleResponseObject

<a id="schemacandleresponseobject"></a>
<a id="schema_CandleResponseObject"></a>
<a id="tocScandleresponseobject"></a>
<a id="tocscandleresponseobject"></a>

```json
{
  "startedAt": "string",
  "ticker": "string",
  "resolution": "1MIN",
  "low": "string",
  "high": "string",
  "open": "string",
  "close": "string",
  "baseTokenVolume": "string",
  "usdVolume": "string",
  "trades": 0.1,
  "startingOpenInterest": "string",
  "id": "string"
}

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|startedAt|[IsoString](#schemaisostring)|true|none|none|
|ticker|string|true|none|none|
|resolution|[CandleResolution](#schemacandleresolution)|true|none|none|
|low|string|true|none|none|
|high|string|true|none|none|
|open|string|true|none|none|
|close|string|true|none|none|
|baseTokenVolume|string|true|none|none|
|usdVolume|string|true|none|none|
|trades|number(double)|true|none|none|
|startingOpenInterest|string|true|none|none|
|id|string|true|none|none|

### CandleResponse

<a id="schemacandleresponse"></a>
<a id="schema_CandleResponse"></a>
<a id="tocScandleresponse"></a>
<a id="tocscandleresponse"></a>

```json
{
  "candles": [
    {
      "startedAt": "string",
      "ticker": "string",
      "resolution": "1MIN",
      "low": "string",
      "high": "string",
      "open": "string",
      "close": "string",
      "baseTokenVolume": "string",
      "usdVolume": "string",
      "trades": 0.1,
      "startingOpenInterest": "string",
      "id": "string"
    }
  ]
}

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|candles|[[CandleResponseObject](#schemacandleresponseobject)]|true|none|none|

### ComplianceResponse

<a id="schemacomplianceresponse"></a>
<a id="schema_ComplianceResponse"></a>
<a id="tocScomplianceresponse"></a>
<a id="tocscomplianceresponse"></a>

```json
{
  "restricted": true,
  "reason": "string"
}

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|restricted|boolean|true|none|none|
|reason|string|false|none|none|

### ComplianceStatus

<a id="schemacompliancestatus"></a>
<a id="schema_ComplianceStatus"></a>
<a id="tocScompliancestatus"></a>
<a id="tocscompliancestatus"></a>

```json
"COMPLIANT"

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|string|false|none|none|

##### Enumerated Values

|Property|Value|
|---|---|
|*anonymous*|COMPLIANT|
|*anonymous*|FIRST_STRIKE_CLOSE_ONLY|
|*anonymous*|FIRST_STRIKE|
|*anonymous*|CLOSE_ONLY|
|*anonymous*|BLOCKED|

### ComplianceReason

<a id="schemacompliancereason"></a>
<a id="schema_ComplianceReason"></a>
<a id="tocScompliancereason"></a>
<a id="tocscompliancereason"></a>

```json
"MANUAL"

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|string|false|none|none|

##### Enumerated Values

|Property|Value|
|---|---|
|*anonymous*|MANUAL|
|*anonymous*|US_GEO|
|*anonymous*|CA_GEO|
|*anonymous*|SANCTIONED_GEO|
|*anonymous*|COMPLIANCE_PROVIDER|

### ComplianceV2Response

<a id="schemacompliancev2response"></a>
<a id="schema_ComplianceV2Response"></a>
<a id="tocScompliancev2response"></a>
<a id="tocscompliancev2response"></a>

```json
{
  "status": "COMPLIANT",
  "reason": "MANUAL",
  "updatedAt": "string"
}

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|status|[ComplianceStatus](#schemacompliancestatus)|true|none|none|
|reason|[ComplianceReason](#schemacompliancereason)|false|none|none|
|updatedAt|string|false|none|none|

### OrderSide

<a id="schemaorderside"></a>
<a id="schema_OrderSide"></a>
<a id="tocSorderside"></a>
<a id="tocsorderside"></a>

```json
"BUY"

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|string|false|none|none|

##### Enumerated Values

|Property|Value|
|---|---|
|*anonymous*|BUY|
|*anonymous*|SELL|

### Liquidity

<a id="schemaliquidity"></a>
<a id="schema_Liquidity"></a>
<a id="tocSliquidity"></a>
<a id="tocsliquidity"></a>

```json
"TAKER"

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|string|false|none|none|

##### Enumerated Values

|Property|Value|
|---|---|
|*anonymous*|TAKER|
|*anonymous*|MAKER|

### FillType

<a id="schemafilltype"></a>
<a id="schema_FillType"></a>
<a id="tocSfilltype"></a>
<a id="tocsfilltype"></a>

```json
"LIMIT"

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|string|false|none|none|

##### Enumerated Values

|Property|Value|
|---|---|
|*anonymous*|LIMIT|
|*anonymous*|LIQUIDATED|
|*anonymous*|LIQUIDATION|
|*anonymous*|DELEVERAGED|
|*anonymous*|OFFSETTING|

### MarketType

<a id="schemamarkettype"></a>
<a id="schema_MarketType"></a>
<a id="tocSmarkettype"></a>
<a id="tocsmarkettype"></a>

```json
"PERPETUAL"

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|string|false|none|none|

##### Enumerated Values

|Property|Value|
|---|---|
|*anonymous*|PERPETUAL|
|*anonymous*|SPOT|

### FillResponseObject

<a id="schemafillresponseobject"></a>
<a id="schema_FillResponseObject"></a>
<a id="tocSfillresponseobject"></a>
<a id="tocsfillresponseobject"></a>

```json
{
  "id": "string",
  "side": "BUY",
  "liquidity": "TAKER",
  "type": "LIMIT",
  "market": "string",
  "marketType": "PERPETUAL",
  "price": "string",
  "size": "string",
  "fee": "string",
  "createdAt": "string",
  "createdAtHeight": "string",
  "orderId": "string",
  "clientMetadata": "string",
  "subaccountNumber": 0.1
}

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|true|none|none|
|side|[OrderSide](#schemaorderside)|true|none|none|
|liquidity|[Liquidity](#schemaliquidity)|true|none|none|
|type|[FillType](#schemafilltype)|true|none|none|
|market|string|true|none|none|
|marketType|[MarketType](#schemamarkettype)|true|none|none|
|price|string|true|none|none|
|size|string|true|none|none|
|fee|string|true|none|none|
|createdAt|[IsoString](#schemaisostring)|true|none|none|
|createdAtHeight|string|true|none|none|
|orderId|string|false|none|none|
|clientMetadata|string|false|none|none|
|subaccountNumber|number(double)|true|none|none|

### FillResponse

<a id="schemafillresponse"></a>
<a id="schema_FillResponse"></a>
<a id="tocSfillresponse"></a>
<a id="tocsfillresponse"></a>

```json
{
  "pageSize": 0.1,
  "totalResults": 0.1,
  "offset": 0.1,
  "fills": [
    {
      "id": "string",
      "side": "BUY",
      "liquidity": "TAKER",
      "type": "LIMIT",
      "market": "string",
      "marketType": "PERPETUAL",
      "price": "string",
      "size": "string",
      "fee": "string",
      "createdAt": "string",
      "createdAtHeight": "string",
      "orderId": "string",
      "clientMetadata": "string",
      "subaccountNumber": 0.1
    }
  ]
}

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|pageSize|number(double)|false|none|none|
|totalResults|number(double)|false|none|none|
|offset|number(double)|false|none|none|
|fills|[[FillResponseObject](#schemafillresponseobject)]|true|none|none|

### HeightResponse

<a id="schemaheightresponse"></a>
<a id="schema_HeightResponse"></a>
<a id="tocSheightresponse"></a>
<a id="tocsheightresponse"></a>

```json
{
  "height": "string",
  "time": "string"
}

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|height|string|true|none|none|
|time|[IsoString](#schemaisostring)|true|none|none|

### HistoricalBlockTradingReward

<a id="schemahistoricalblocktradingreward"></a>
<a id="schema_HistoricalBlockTradingReward"></a>
<a id="tocShistoricalblocktradingreward"></a>
<a id="tocshistoricalblocktradingreward"></a>

```json
{
  "tradingReward": "string",
  "createdAt": "string",
  "createdAtHeight": "string"
}

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|tradingReward|string|true|none|none|
|createdAt|[IsoString](#schemaisostring)|true|none|none|
|createdAtHeight|string|true|none|none|

### HistoricalBlockTradingRewardsResponse

<a id="schemahistoricalblocktradingrewardsresponse"></a>
<a id="schema_HistoricalBlockTradingRewardsResponse"></a>
<a id="tocShistoricalblocktradingrewardsresponse"></a>
<a id="tocshistoricalblocktradingrewardsresponse"></a>

```json
{
  "rewards": [
    {
      "tradingReward": "string",
      "createdAt": "string",
      "createdAtHeight": "string"
    }
  ]
}

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|rewards|[[HistoricalBlockTradingReward](#schemahistoricalblocktradingreward)]|true|none|none|

### HistoricalFundingResponseObject

<a id="schemahistoricalfundingresponseobject"></a>
<a id="schema_HistoricalFundingResponseObject"></a>
<a id="tocShistoricalfundingresponseobject"></a>
<a id="tocshistoricalfundingresponseobject"></a>

```json
{
  "ticker": "string",
  "rate": "string",
  "price": "string",
  "effectiveAt": "string",
  "effectiveAtHeight": "string"
}

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|ticker|string|true|none|none|
|rate|string|true|none|none|
|price|string|true|none|none|
|effectiveAt|[IsoString](#schemaisostring)|true|none|none|
|effectiveAtHeight|string|true|none|none|

### HistoricalFundingResponse

<a id="schemahistoricalfundingresponse"></a>
<a id="schema_HistoricalFundingResponse"></a>
<a id="tocShistoricalfundingresponse"></a>
<a id="tocshistoricalfundingresponse"></a>

```json
{
  "historicalFunding": [
    {
      "ticker": "string",
      "rate": "string",
      "price": "string",
      "effectiveAt": "string",
      "effectiveAtHeight": "string"
    }
  ]
}

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|historicalFunding|[[HistoricalFundingResponseObject](#schemahistoricalfundingresponseobject)]|true|none|none|

### PnlTicksResponseObject

<a id="schemapnlticksresponseobject"></a>
<a id="schema_PnlTicksResponseObject"></a>
<a id="tocSpnlticksresponseobject"></a>
<a id="tocspnlticksresponseobject"></a>

```json
{
  "id": "string",
  "subaccountId": "string",
  "equity": "string",
  "totalPnl": "string",
  "netTransfers": "string",
  "createdAt": "string",
  "blockHeight": "string",
  "blockTime": "string"
}

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|true|none|none|
|subaccountId|string|true|none|none|
|equity|string|true|none|none|
|totalPnl|string|true|none|none|
|netTransfers|string|true|none|none|
|createdAt|string|true|none|none|
|blockHeight|string|true|none|none|
|blockTime|[IsoString](#schemaisostring)|true|none|none|

### HistoricalPnlResponse

<a id="schemahistoricalpnlresponse"></a>
<a id="schema_HistoricalPnlResponse"></a>
<a id="tocShistoricalpnlresponse"></a>
<a id="tocshistoricalpnlresponse"></a>

```json
{
  "pageSize": 0.1,
  "totalResults": 0.1,
  "offset": 0.1,
  "historicalPnl": [
    {
      "id": "string",
      "subaccountId": "string",
      "equity": "string",
      "totalPnl": "string",
      "netTransfers": "string",
      "createdAt": "string",
      "blockHeight": "string",
      "blockTime": "string"
    }
  ]
}

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|pageSize|number(double)|false|none|none|
|totalResults|number(double)|false|none|none|
|offset|number(double)|false|none|none|
|historicalPnl|[[PnlTicksResponseObject](#schemapnlticksresponseobject)]|true|none|none|

### TradingRewardAggregationPeriod

<a id="schematradingrewardaggregationperiod"></a>
<a id="schema_TradingRewardAggregationPeriod"></a>
<a id="tocStradingrewardaggregationperiod"></a>
<a id="tocstradingrewardaggregationperiod"></a>

```json
"DAILY"

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|string|false|none|none|

##### Enumerated Values

|Property|Value|
|---|---|
|*anonymous*|DAILY|
|*anonymous*|WEEKLY|
|*anonymous*|MONTHLY|

### HistoricalTradingRewardAggregation

<a id="schemahistoricaltradingrewardaggregation"></a>
<a id="schema_HistoricalTradingRewardAggregation"></a>
<a id="tocShistoricaltradingrewardaggregation"></a>
<a id="tocshistoricaltradingrewardaggregation"></a>

```json
{
  "tradingReward": "string",
  "startedAt": "string",
  "startedAtHeight": "string",
  "endedAt": "string",
  "endedAtHeight": "string",
  "period": "DAILY"
}

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|tradingReward|string|true|none|none|
|startedAt|[IsoString](#schemaisostring)|true|none|none|
|startedAtHeight|string|true|none|none|
|endedAt|[IsoString](#schemaisostring)|false|none|none|
|endedAtHeight|string|false|none|none|
|period|[TradingRewardAggregationPeriod](#schematradingrewardaggregationperiod)|true|none|none|

### HistoricalTradingRewardAggregationsResponse

<a id="schemahistoricaltradingrewardaggregationsresponse"></a>
<a id="schema_HistoricalTradingRewardAggregationsResponse"></a>
<a id="tocShistoricaltradingrewardaggregationsresponse"></a>
<a id="tocshistoricaltradingrewardaggregationsresponse"></a>

```json
{
  "rewards": [
    {
      "tradingReward": "string",
      "startedAt": "string",
      "startedAtHeight": "string",
      "endedAt": "string",
      "endedAtHeight": "string",
      "period": "DAILY"
    }
  ]
}

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|rewards|[[HistoricalTradingRewardAggregation](#schemahistoricaltradingrewardaggregation)]|true|none|none|

### OrderbookResponsePriceLevel

<a id="schemaorderbookresponsepricelevel"></a>
<a id="schema_OrderbookResponsePriceLevel"></a>
<a id="tocSorderbookresponsepricelevel"></a>
<a id="tocsorderbookresponsepricelevel"></a>

```json
{
  "price": "string",
  "size": "string"
}

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|price|string|true|none|none|
|size|string|true|none|none|

### OrderbookResponseObject

<a id="schemaorderbookresponseobject"></a>
<a id="schema_OrderbookResponseObject"></a>
<a id="tocSorderbookresponseobject"></a>
<a id="tocsorderbookresponseobject"></a>

```json
{
  "bids": [
    {
      "price": "string",
      "size": "string"
    }
  ],
  "asks": [
    {
      "price": "string",
      "size": "string"
    }
  ]
}

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|bids|[[OrderbookResponsePriceLevel](#schemaorderbookresponsepricelevel)]|true|none|none|
|asks|[[OrderbookResponsePriceLevel](#schemaorderbookresponsepricelevel)]|true|none|none|

### APITimeInForce

<a id="schemaapitimeinforce"></a>
<a id="schema_APITimeInForce"></a>
<a id="tocSapitimeinforce"></a>
<a id="tocsapitimeinforce"></a>

```json
"GTT"

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|string|false|none|none|

##### Enumerated Values

|Property|Value|
|---|---|
|*anonymous*|GTT|
|*anonymous*|FOK|
|*anonymous*|IOC|

### OrderStatus

<a id="schemaorderstatus"></a>
<a id="schema_OrderStatus"></a>
<a id="tocSorderstatus"></a>
<a id="tocsorderstatus"></a>

```json
"OPEN"

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|string|false|none|none|

##### Enumerated Values

|Property|Value|
|---|---|
|*anonymous*|OPEN|
|*anonymous*|FILLED|
|*anonymous*|CANCELED|
|*anonymous*|BEST_EFFORT_CANCELED|
|*anonymous*|UNTRIGGERED|

### BestEffortOpenedStatus

<a id="schemabesteffortopenedstatus"></a>
<a id="schema_BestEffortOpenedStatus"></a>
<a id="tocSbesteffortopenedstatus"></a>
<a id="tocsbesteffortopenedstatus"></a>

```json
"BEST_EFFORT_OPENED"

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|string|false|none|none|

##### Enumerated Values

|Property|Value|
|---|---|
|*anonymous*|BEST_EFFORT_OPENED|

### APIOrderStatus

<a id="schemaapiorderstatus"></a>
<a id="schema_APIOrderStatus"></a>
<a id="tocSapiorderstatus"></a>
<a id="tocsapiorderstatus"></a>

```json
"OPEN"

```

#### Properties

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[OrderStatus](#schemaorderstatus)|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[BestEffortOpenedStatus](#schemabesteffortopenedstatus)|false|none|none|

### OrderType

<a id="schemaordertype"></a>
<a id="schema_OrderType"></a>
<a id="tocSordertype"></a>
<a id="tocsordertype"></a>

```json
"LIMIT"

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|string|false|none|none|

##### Enumerated Values

|Property|Value|
|---|---|
|*anonymous*|LIMIT|
|*anonymous*|MARKET|
|*anonymous*|STOP_LIMIT|
|*anonymous*|STOP_MARKET|
|*anonymous*|TRAILING_STOP|
|*anonymous*|TAKE_PROFIT|
|*anonymous*|TAKE_PROFIT_MARKET|

### OrderResponseObject

<a id="schemaorderresponseobject"></a>
<a id="schema_OrderResponseObject"></a>
<a id="tocSorderresponseobject"></a>
<a id="tocsorderresponseobject"></a>

```json
{
  "id": "string",
  "subaccountId": "string",
  "clientId": "string",
  "clobPairId": "string",
  "side": "BUY",
  "size": "string",
  "totalFilled": "string",
  "price": "string",
  "type": "LIMIT",
  "reduceOnly": true,
  "orderFlags": "string",
  "goodTilBlock": "string",
  "goodTilBlockTime": "string",
  "createdAtHeight": "string",
  "clientMetadata": "string",
  "triggerPrice": "string",
  "timeInForce": "GTT",
  "status": "OPEN",
  "postOnly": true,
  "ticker": "string",
  "updatedAt": "string",
  "updatedAtHeight": "string",
  "subaccountNumber": 0.1
}

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|true|none|none|
|subaccountId|string|true|none|none|
|clientId|string|true|none|none|
|clobPairId|string|true|none|none|
|side|[OrderSide](#schemaorderside)|true|none|none|
|size|string|true|none|none|
|totalFilled|string|true|none|none|
|price|string|true|none|none|
|type|[OrderType](#schemaordertype)|true|none|none|
|reduceOnly|boolean|true|none|none|
|orderFlags|string|true|none|none|
|goodTilBlock|string|false|none|none|
|goodTilBlockTime|string|false|none|none|
|createdAtHeight|string|false|none|none|
|clientMetadata|string|true|none|none|
|triggerPrice|string|false|none|none|
|timeInForce|[APITimeInForce](#schemaapitimeinforce)|true|none|none|
|status|[APIOrderStatus](#schemaapiorderstatus)|true|none|none|
|postOnly|boolean|true|none|none|
|ticker|string|true|none|none|
|updatedAt|[IsoString](#schemaisostring)|false|none|none|
|updatedAtHeight|string|false|none|none|
|subaccountNumber|number(double)|true|none|none|

### PerpetualMarketStatus

<a id="schemaperpetualmarketstatus"></a>
<a id="schema_PerpetualMarketStatus"></a>
<a id="tocSperpetualmarketstatus"></a>
<a id="tocsperpetualmarketstatus"></a>

```json
"ACTIVE"

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|string|false|none|none|

##### Enumerated Values

|Property|Value|
|---|---|
|*anonymous*|ACTIVE|
|*anonymous*|PAUSED|
|*anonymous*|CANCEL_ONLY|
|*anonymous*|POST_ONLY|
|*anonymous*|INITIALIZING|
|*anonymous*|FINAL_SETTLEMENT|

### PerpetualMarketType

<a id="schemaperpetualmarkettype"></a>
<a id="schema_PerpetualMarketType"></a>
<a id="tocSperpetualmarkettype"></a>
<a id="tocsperpetualmarkettype"></a>

```json
"CROSS"

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|string|false|none|none|

##### Enumerated Values

|Property|Value|
|---|---|
|*anonymous*|CROSS|
|*anonymous*|ISOLATED|

### PerpetualMarketResponseObject

<a id="schemaperpetualmarketresponseobject"></a>
<a id="schema_PerpetualMarketResponseObject"></a>
<a id="tocSperpetualmarketresponseobject"></a>
<a id="tocsperpetualmarketresponseobject"></a>

```json
{
  "clobPairId": "string",
  "ticker": "string",
  "status": "ACTIVE",
  "oraclePrice": "string",
  "priceChange24H": "string",
  "volume24H": "string",
  "trades24H": 0.1,
  "nextFundingRate": "string",
  "initialMarginFraction": "string",
  "maintenanceMarginFraction": "string",
  "openInterest": "string",
  "atomicResolution": 0.1,
  "quantumConversionExponent": 0.1,
  "tickSize": "string",
  "stepSize": "string",
  "stepBaseQuantums": 0.1,
  "subticksPerTick": 0.1,
  "marketType": "CROSS",
  "openInterestLowerCap": "string",
  "openInterestUpperCap": "string",
  "baseOpenInterest": "string"
}

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|clobPairId|string|true|none|none|
|ticker|string|true|none|none|
|status|[PerpetualMarketStatus](#schemaperpetualmarketstatus)|true|none|none|
|oraclePrice|string|true|none|none|
|priceChange24H|string|true|none|none|
|volume24H|string|true|none|none|
|trades24H|number(double)|true|none|none|
|nextFundingRate|string|true|none|none|
|initialMarginFraction|string|true|none|none|
|maintenanceMarginFraction|string|true|none|none|
|openInterest|string|true|none|none|
|atomicResolution|number(double)|true|none|none|
|quantumConversionExponent|number(double)|true|none|none|
|tickSize|string|true|none|none|
|stepSize|string|true|none|none|
|stepBaseQuantums|number(double)|true|none|none|
|subticksPerTick|number(double)|true|none|none|
|marketType|[PerpetualMarketType](#schemaperpetualmarkettype)|true|none|none|
|openInterestLowerCap|string|false|none|none|
|openInterestUpperCap|string|false|none|none|
|baseOpenInterest|string|true|none|none|

### PerpetualMarketResponse

<a id="schemaperpetualmarketresponse"></a>
<a id="schema_PerpetualMarketResponse"></a>
<a id="tocSperpetualmarketresponse"></a>
<a id="tocsperpetualmarketresponse"></a>

```json
{
  "markets": {
    "property1": {
      "clobPairId": "string",
      "ticker": "string",
      "status": "ACTIVE",
      "oraclePrice": "string",
      "priceChange24H": "string",
      "volume24H": "string",
      "trades24H": 0.1,
      "nextFundingRate": "string",
      "initialMarginFraction": "string",
      "maintenanceMarginFraction": "string",
      "openInterest": "string",
      "atomicResolution": 0.1,
      "quantumConversionExponent": 0.1,
      "tickSize": "string",
      "stepSize": "string",
      "stepBaseQuantums": 0.1,
      "subticksPerTick": 0.1,
      "marketType": "CROSS",
      "openInterestLowerCap": "string",
      "openInterestUpperCap": "string",
      "baseOpenInterest": "string"
    },
    "property2": {
      "clobPairId": "string",
      "ticker": "string",
      "status": "ACTIVE",
      "oraclePrice": "string",
      "priceChange24H": "string",
      "volume24H": "string",
      "trades24H": 0.1,
      "nextFundingRate": "string",
      "initialMarginFraction": "string",
      "maintenanceMarginFraction": "string",
      "openInterest": "string",
      "atomicResolution": 0.1,
      "quantumConversionExponent": 0.1,
      "tickSize": "string",
      "stepSize": "string",
      "stepBaseQuantums": 0.1,
      "subticksPerTick": 0.1,
      "marketType": "CROSS",
      "openInterestLowerCap": "string",
      "openInterestUpperCap": "string",
      "baseOpenInterest": "string"
    }
  }
}

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|markets|object|true|none|none|
|» **additionalProperties**|[PerpetualMarketResponseObject](#schemaperpetualmarketresponseobject)|false|none|none|

### PerpetualPositionResponse

<a id="schemaperpetualpositionresponse"></a>
<a id="schema_PerpetualPositionResponse"></a>
<a id="tocSperpetualpositionresponse"></a>
<a id="tocsperpetualpositionresponse"></a>

```json
{
  "positions": [
    {
      "market": "string",
      "status": "OPEN",
      "side": "LONG",
      "size": "string",
      "maxSize": "string",
      "entryPrice": "string",
      "realizedPnl": "string",
      "createdAt": "string",
      "createdAtHeight": "string",
      "sumOpen": "string",
      "sumClose": "string",
      "netFunding": "string",
      "unrealizedPnl": "string",
      "closedAt": "string",
      "exitPrice": "string",
      "subaccountNumber": 0.1
    }
  ]
}

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|positions|[[PerpetualPositionResponseObject](#schemaperpetualpositionresponseobject)]|true|none|none|

### SparklineResponseObject

<a id="schemasparklineresponseobject"></a>
<a id="schema_SparklineResponseObject"></a>
<a id="tocSsparklineresponseobject"></a>
<a id="tocssparklineresponseobject"></a>

```json
{
  "property1": [
    "string"
  ],
  "property2": [
    "string"
  ]
}

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|**additionalProperties**|[string]|false|none|none|

### SparklineTimePeriod

<a id="schemasparklinetimeperiod"></a>
<a id="schema_SparklineTimePeriod"></a>
<a id="tocSsparklinetimeperiod"></a>
<a id="tocssparklinetimeperiod"></a>

```json
"ONE_DAY"

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|string|false|none|none|

##### Enumerated Values

|Property|Value|
|---|---|
|*anonymous*|ONE_DAY|
|*anonymous*|SEVEN_DAYS|

### TimeResponse

<a id="schematimeresponse"></a>
<a id="schema_TimeResponse"></a>
<a id="tocStimeresponse"></a>
<a id="tocstimeresponse"></a>

```json
{
  "iso": "string",
  "epoch": 0.1
}

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|iso|[IsoString](#schemaisostring)|true|none|none|
|epoch|number(double)|true|none|none|

### TradeType

<a id="schematradetype"></a>
<a id="schema_TradeType"></a>
<a id="tocStradetype"></a>
<a id="tocstradetype"></a>

```json
"LIMIT"

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|string|false|none|none|

##### Enumerated Values

|Property|Value|
|---|---|
|*anonymous*|LIMIT|
|*anonymous*|LIQUIDATED|
|*anonymous*|DELEVERAGED|

### TradeResponseObject

<a id="schematraderesponseobject"></a>
<a id="schema_TradeResponseObject"></a>
<a id="tocStraderesponseobject"></a>
<a id="tocstraderesponseobject"></a>

```json
{
  "id": "string",
  "side": "BUY",
  "size": "string",
  "price": "string",
  "type": "LIMIT",
  "createdAt": "string",
  "createdAtHeight": "string"
}

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|true|none|none|
|side|[OrderSide](#schemaorderside)|true|none|none|
|size|string|true|none|none|
|price|string|true|none|none|
|type|[TradeType](#schematradetype)|true|none|none|
|createdAt|[IsoString](#schemaisostring)|true|none|none|
|createdAtHeight|string|true|none|none|

### TradeResponse

<a id="schematraderesponse"></a>
<a id="schema_TradeResponse"></a>
<a id="tocStraderesponse"></a>
<a id="tocstraderesponse"></a>

```json
{
  "pageSize": 0.1,
  "totalResults": 0.1,
  "offset": 0.1,
  "trades": [
    {
      "id": "string",
      "side": "BUY",
      "size": "string",
      "price": "string",
      "type": "LIMIT",
      "createdAt": "string",
      "createdAtHeight": "string"
    }
  ]
}

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|pageSize|number(double)|false|none|none|
|totalResults|number(double)|false|none|none|
|offset|number(double)|false|none|none|
|trades|[[TradeResponseObject](#schematraderesponseobject)]|true|none|none|

### TransferType

<a id="schematransfertype"></a>
<a id="schema_TransferType"></a>
<a id="tocStransfertype"></a>
<a id="tocstransfertype"></a>

```json
"TRANSFER_IN"

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|string|false|none|none|

##### Enumerated Values

|Property|Value|
|---|---|
|*anonymous*|TRANSFER_IN|
|*anonymous*|TRANSFER_OUT|
|*anonymous*|DEPOSIT|
|*anonymous*|WITHDRAWAL|

### TransferResponseObject

<a id="schematransferresponseobject"></a>
<a id="schema_TransferResponseObject"></a>
<a id="tocStransferresponseobject"></a>
<a id="tocstransferresponseobject"></a>

```json
{
  "id": "string",
  "sender": {
    "subaccountNumber": 0.1,
    "address": "string"
  },
  "recipient": {
    "subaccountNumber": 0.1,
    "address": "string"
  },
  "size": "string",
  "createdAt": "string",
  "createdAtHeight": "string",
  "symbol": "string",
  "type": "TRANSFER_IN",
  "transactionHash": "string"
}

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|true|none|none|
|sender|object|true|none|none|
|» subaccountNumber|number(double)|false|none|none|
|» address|string|true|none|none|
|recipient|object|true|none|none|
|» subaccountNumber|number(double)|false|none|none|
|» address|string|true|none|none|
|size|string|true|none|none|
|createdAt|string|true|none|none|
|createdAtHeight|string|true|none|none|
|symbol|string|true|none|none|
|type|[TransferType](#schematransfertype)|true|none|none|
|transactionHash|string|true|none|none|

### TransferResponse

<a id="schematransferresponse"></a>
<a id="schema_TransferResponse"></a>
<a id="tocStransferresponse"></a>
<a id="tocstransferresponse"></a>

```json
{
  "pageSize": 0.1,
  "totalResults": 0.1,
  "offset": 0.1,
  "transfers": [
    {
      "id": "string",
      "sender": {
        "subaccountNumber": 0.1,
        "address": "string"
      },
      "recipient": {
        "subaccountNumber": 0.1,
        "address": "string"
      },
      "size": "string",
      "createdAt": "string",
      "createdAtHeight": "string",
      "symbol": "string",
      "type": "TRANSFER_IN",
      "transactionHash": "string"
    }
  ]
}

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|pageSize|number(double)|false|none|none|
|totalResults|number(double)|false|none|none|
|offset|number(double)|false|none|none|
|transfers|[[TransferResponseObject](#schematransferresponseobject)]|true|none|none|

### ParentSubaccountTransferResponse

<a id="schemaparentsubaccounttransferresponse"></a>
<a id="schema_ParentSubaccountTransferResponse"></a>
<a id="tocSparentsubaccounttransferresponse"></a>
<a id="tocsparentsubaccounttransferresponse"></a>

```json
{
  "pageSize": 0.1,
  "totalResults": 0.1,
  "offset": 0.1,
  "transfers": [
    {
      "id": "string",
      "sender": {
        "subaccountNumber": 0.1,
        "address": "string"
      },
      "recipient": {
        "subaccountNumber": 0.1,
        "address": "string"
      },
      "size": "string",
      "createdAt": "string",
      "createdAtHeight": "string",
      "symbol": "string",
      "type": "TRANSFER_IN",
      "transactionHash": "string"
    }
  ]
}

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|pageSize|number(double)|false|none|none|
|totalResults|number(double)|false|none|none|
|offset|number(double)|false|none|none|
|transfers|[[TransferResponseObject](#schematransferresponseobject)]|true|none|none|



<!-- ### Market

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
syntheticAssetId         | The id of the synthetic asset traded in the market. Only used for cryptographically signing orders. -->

<!-- ## Get Orderbook
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

### HTTP Request 1
`GET v3/orderbook/:market`

<aside class="success">
Returns bids and asks which are each Orderbook order arrays (price and size).
</aside>

Description: Returns the active orderbook for a market. All bids and asks that are fillable are returned.

### Request 1

Parameter         | Description
----------------- | -----------
market            | Market of the Orderbook.

### Response 1

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
prevEpochEstimatedRewards| The user's estimated number of dYdX tokens as rewards for the previous epoch. -->
