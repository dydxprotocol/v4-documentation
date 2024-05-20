# API Trading

Lorem ipsum

## Intro

### dYdX Chain
### Off-Chain Order Book
### APIs
### Numbers and Units
### Running a Full Node

## Full Node JSON RPC API
## Block Height
The current block height can either be queried or streamed using json RPC.
### Query Block Height
To query the current block height, this api can be used[1](https://docs.cometbft.com/v0.34/rpc/#/Info/status).
This fetches the information about the current node which includes the block height.
An example curl request is shown below:
```bash
curl --header "Content-Type: application/json" --request POST --data '{"method": "status", "id": 1}' <node-ip>:<node-port>
```
### Stream Block Height
To stream the block height, the following api can be used[2](https://docs.cometbft.com/v0.34/rpc/#/Websocket/subscribe). This api subscribes to an event and stream data via websockets. The list of events that can be subscribed to are shown in the link[3](https://github.com/cometbft/cometbft/blob/v0.38.7/types/events.go#L19-L39).
An example curl request which subscribes to the block height event is shown below, websocat is used to stream the data.
```bash
echo '{ "jsonrpc": "2.0","method": "subscribe","id": 0,"params": {"query": "tm.event='"'NewBlock'"'"} }' | websocat -n -t ws://<json-rpc-ip>:<json-rpc-port>/websocket
```
### Short-Term Orders
These are orders which have a finite lifetime and are valid for a short period of time. They are used to take advantage of short-term market movements. The duration of short term order can be specified either in blocks or in seconds. The duration of the order is calculated from the time the order is placed. The order is automatically cancelled after the specified duration.

All the below orders are transactions and are signed. The client[4](https://docs.dydx.exchange/developers/clients/validator_client) can be used or the transaction can be placed manually by following conforming to the formats specified here[5](https://github.com/dydxprotocol/v4-chain/blob/main/proto/dydxprotocol/clob/tx.proto). For manual transactions, the transaction can be signed using the following documentation[6](https://docs.cosmos.network/v0.50/user/run-node/txs).
#### Place
To place an order, refer to the proto here[7](https://github.com/dydxprotocol/v4-chain/blob/main/proto/dydxprotocol/clob/tx.proto#L27) to understand the parameters required.

For an example of placing an order with a the client, refer to the documentation here[8](https://docs.dydx.exchange/developers/clients/validator_client#placing-and-cancelling-orders).
#### Replace/Amend
Traders can replace Short-Term orders atomically by placing an order with the same order ID and a larger value for the [good-til-block field](https://github.com/dydxprotocol/v4-chain/blob/dcd2d9c2f6170bd19218d92cf6f2f88216b2ffe1/proto/dydxprotocol/clob/order.proto#L143-L146)
of the order.

Note that two orders have the same order ID if the following client-specified fields are equal (from [OrderId proto definition](https://github.com/dydxprotocol/v4-chain/blob/dcd2d9c2f6170bd19218d92cf6f2f88216b2ffe1/proto/dydxprotocol/clob/order.proto#L9-L41)):
- [Subaccount ID](https://github.com/dydxprotocol/v4-chain/blob/dcd2d9c2f6170bd19218d92cf6f2f88216b2ffe1/proto/dydxprotocol/subaccounts/subaccount.proto#L10-L17).
    - order.subaccount_id.owner should be set to your address that is signing the order transaction.
    - order.subaccount_id.number should be set to 0 unless you are using a different subaccount.
- Client ID.
- Order flags (note this should always be set to 0 for placing Short-Term orders).
- CLOB pair ID.

Assuming the current block height is 9, the below example places an order with good-til-block 10, then places a replacement order with a good-til-block of 11.

The proto for the replace order is the same as the place order[9](https://github.com/dydxprotocol/v4-chain/blob/main/proto/dydxprotocol/clob/tx.proto#L27)

For an example of replacing an order with the client, refer to the documentation here[10](https://docs.dydx.exchange/developers/clients/validator_client#replacing-an-order).
#### Cancel
To cancel an order, refer to the proto here[11](https://github.com/dydxprotocol/v4-chain/blob/main/proto/dydxprotocol/clob/tx.proto#L29) to understand the parameters required.

For an example of cancelling an order with the client, refer to the documentation here[12](https://docs.dydx.exchange/developers/clients/validator_client#cancelling-an-order).
### All Endpoints

## Full Node gRPC and HTTP APIs

### Stream Order Book State (L3)
### Queries
#### Subaccount
`GET /dydxprotocol/subaccounts/subaccount/{owner}/{number}`

Queries subaccount state by owner and id.

Links: [request / response format](https://rest-dydx.ecostake.com/swagger/#/Query/Subaccount), [RPC method definition](https://github.com/dydxprotocol/v4-chain/blob/ddd17155662f5dab738af0805578264600de176a/proto/dydxprotocol/subaccounts/query.proto#L15-L18), [subaccount proto](https://github.com/dydxprotocol/v4-chain/blob/525bb6ff608d9b91c30db85fef68738ff8ec0d61/proto/dydxprotocol/subaccounts/subaccount.proto#L19-L33).
#### Balances
`GET /cosmos/bank/v1beta1/balances/{address}`
Queries the balance of all coins for a single account.

Links: [request / response format](https://rest-dydx.ecostake.com/swagger/#/Query/AllBalances)
#### CLOB Pairs
`GET /dydxprotocol/clob/clob_pair`
Queries a list of ClobPair items

Links: [request / response format](https://rest-dydx.ecostake.com/swagger/#/Query/ClobPairAll), [RPC method definition](https://github.com/dydxprotocol/v4-chain/blob/ddd17155662f5dab738af0805578264600de176a/proto/dydxprotocol/clob/query.proto#L24-L26), [ClobPair proto](https://github.com/dydxprotocol/v4-chain/blob/ddd17155662f5dab738af0805578264600de176a/proto/dydxprotocol/clob/clob_pair.proto#L31-L84).
#### Perpetuals
`GET /dydxprotocol/perpetuals/perpetual`
Queries a list of Perpetual items.

Links: [request / response format](https://rest-dydx.ecostake.com/swagger/#/Query/AllPerpetuals), [RPC method definition](https://github.com/dydxprotocol/v4-chain/blob/ddd17155662f5dab738af0805578264600de176a/proto/dydxprotocol/perpetuals/query.proto#L20-L23), [Perpetual proto](https://github.com/dydxprotocol/v4-chain/blob/ddd17155662f5dab738af0805578264600de176a/proto/dydxprotocol/perpetuals/perpetual.proto#L9-L27).
#### Positions

#### Prices
`GET /dydxprotocol/prices/market`
Queries a list of MarketPrice items.

Links: [request / response format](https://rest-dydx.ecostake.com/swagger/#/Query/AllMarketPrices), [RPC method definition](https://github.com/dydxprotocol/v4-chain/blob/ddd17155662f5dab738af0805578264600de176a/proto/dydxprotocol/prices/query.proto#L20-L23), [MarketPrice proto](https://github.com/dydxprotocol/v4-chain/blob/ddd17155662f5dab738af0805578264600de176a/proto/dydxprotocol/prices/market_price.proto#L7-L18).

### Pagination

TODO:
- How do I paginate the queries via REST?
- Via gRPC?
- How can I ensure that the second page of data is from the same block height as the first? (Is this possible? didnt see a way to do this)

### All Endpoints


## Indexer API

