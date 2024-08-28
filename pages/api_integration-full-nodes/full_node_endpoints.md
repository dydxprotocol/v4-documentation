# Full Node Endpoints
Full nodes provide endpoints that you can use to interact with that node and its network. You can also connect to a node's CometBFT functionality.

### Node URLs
To query a node, you need its URL.

To query your own full node, use its network address. If you are running and querying your full node on the same system, that address is `localhost`.

To query an infrastructure provider's node, use a URL from the **Full Node Endpoints** section of the [Resources page](../infrastructure_providers-network/resources#full-node-endpoints). Choose a node for your deployment type and query method.

## Full Node Endpoints
You can query full node endpoints using [gRPC](https://grpc.io/) or REST frameworks.

### gRPC Endpoints
Query full nodes using a gRPC client of your choosing or the [grpcurl](https://github.com/fullstorydev/grpcurl?tab=readme-ov-file#grpcurl) CLI tool.

The node's gRPC server is exposed on port `9090` by default.

See the [API specification]() for gRPC endpoints.  

### REST (gRPC-Gateway) Endpoints
Query full node's gRPC server as if it were a REST API through the [gRPC-Gateway](https://grpc-ecosystem.github.io/grpc-gateway/).

The node's gRPC-Gateway server is exposed on port `1317` by default.

See the [Silk Nodes API specification](https://dydx.api.silknodes.io/swagger/#/) for REST endpoints.

## CometBFT Endpoints
You can interact with a node's CometBFT functionality using RPC. 

To query a node's CometBFT functionality using RPC, ...

The node's CometBFT RPC server is exposed on port `26657` by default.

See the [CometBFT RPC v1.0 API specification](https://docs.cometbft.com/v1.0/rpc/) for CometBFT endpoints.