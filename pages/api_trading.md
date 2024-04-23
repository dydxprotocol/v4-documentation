# API Trading

Lorem ipsum

## Intro

### dYdX Chain
### Off-Chain Order Book
### APIs
### Numbers and Units
### Running a Full Node

## Full Node JSON RPC API

### Query Block Height
### Stream Block Height
### Short-Term Orders
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

