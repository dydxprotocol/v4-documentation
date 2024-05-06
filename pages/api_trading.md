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
#### Replace/Amend
#### Cancel
### All Endpoints

## Full Node gRPC and HTTP APIs

### Stream Order Book State (L3)
### Queries
#### Subaccount
`GET /dydxprotocol/subaccounts/subaccount/{owner}/{number}`

Queries subaccount state by owner and id.

Links: [request / response format](https://rest-dydx.ecostake.com/swagger/#/Query/Subaccount), [RPC method definition](https://github.com/dydxprotocol/v4-chain/blob/ddd17155662f5dab738af0805578264600de176a/proto/dydxprotocol/subaccounts/query.proto#L15-L18), [subaccount proto](https://github.com/dydxprotocol/v4-chain/blob/525bb6ff608d9b91c30db85fef68738ff8ec0d61/proto/dydxprotocol/subaccounts/subaccount.proto#L19-L33).


#### Balances
#### CLOB Pairs
#### Perpetuals
#### Positions
#### Prices

### Pagination

TODO:
- How do I paginate the queries via REST?
- Via gRPC?
- How can I ensure that the second page of data is from the same block height as the first? (Is this possible?)

### All Endpoints


## Indexer API

