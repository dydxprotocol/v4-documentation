# Full Node Endpoints
[Resources page for base URLs](../infrastructure_providers-network/resources#full-node-endpoints)

## gRPC Endpoints
You can interact with a node using [gRPC](https://grpc.io/). The node's gRPC server is exposed on port `9090` by default.

## REST (gRPC-Gateway) Endpoints
You can interact with a node's gRPC server as if it were a REST API through the [gRPC-Gateway](https://grpc-ecosystem.github.io/grpc-gateway/) server. The node's gRPC-Gateway server is exposed on port `1317` by default.

## CometBFT RPC Endpoints
You can interact with CometBFT functions using [RPC]. The node's CometBFT RPC server is exposed on port `26657` by default. 

[CometBFT RPC v1.0 API specification](https://docs.cometbft.com/v1.0/rpc/)