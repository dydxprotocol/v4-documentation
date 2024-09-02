# Full Node Endpoints
Full nodes provide two APIs:

- [Full Node API](#full-node-api) for native full node features
- [CometBFT API](#cometbft-api) for CometBFT state

Use these APIs to read the latest network data, to place orders quickly and efficiently, and to build upon with your own custom software.

## Getting Started

The Full Node and CometBFT APIs offer different sets of functionality. They accept different query frameworks. Choose the query method and tool for your use case.

### Choose Query Method

The Full Node API accepts gRPC or REST. The CometBFT API accepts only RPC.

|| Full Node API | CometBFT API |
| ------ | ------------- | ------------ |
| gRPC | ✅ | ✖ |
| REST | ✅ | ✖ |
| RPC | ✖ | ✅ |

### Install Query Tools

You can use your own query tool, or your can install one or both of the following CLI tools:

- [grpcurl](https://github.com/fullstorydev/grpcurl?tab=readme-ov-file#installation) to send gRPC and RPC requests
- [curl](https://curl.se/download.html) to send RESTful requests

### Find Your Node URL

To query a full node, you need its URL. If you are running and querying your own full node on the same system, that URL is usually `localhost`. If you want to use an infrastructure provider's public full node, use a URL from the **Full Node Endpoints** section of the [resources page](../infrastructure_providers-network/resources#full-node-endpoints). Choose a node for your deployment type and query method.

Then, check your connection to your target node using the command for your use case:

|| Full Node API | CometBFT API |
| ------ | ------------- | ------------ |
| gRPC | `grpcurl <url>.dydxprotocol` | ✖ |
| REST | `curl <url>/dydxprotocol/`  | ✖ |
| RPC | ✖ | `grpcurl <url>.status` |

## Full Node API
The Full Node API provides an identical set of 
[gRPC endpoints](#grpc) and 
[REST endpoints](#rest-grpc-gateway). You can use either framework. Generally, [gRPC](https://grpc.io/) provides a faster connection.

### gRPC Endpoints
You can interact with the Full Node API using [grpcurl](https://github.com/fullstorydev/grpcurl?tab=readme-ov-file#installation) or your own tool to send gRPC requests. The gRPC server is available on port `9090` by default.

See the [API specification]() for gRPC endpoints.

**Examples**

Get your USDC balance:
```bash
grpcurl --plaintext http://examplenode:9090 api.Service/Method
```

Get a list of instruments available to trade on a node's network:
```bash
grpcurl --plaintext http://examplenode:9090 api.Service/Method
```

Convert human-readable trade information into integers and quantums:
```bash
grpcurl --plaintext http://examplenode:9090 api.Service/Method
```

Place and broadcast an order:
```bash
grpcurl --plaintext http://examplenode:9090 api.Service/Method
```

Get a list of your open positions:
```bash
grpcurl --plaintext http://examplenode:9090 api.Service/Method
```

Get your liquidation price:
```bash
grpcurl --plaintext http://examplenode:9090 api.Service/Method
```

### REST Endpoints
You can interact with the Full Node API using `curl` or your own tool to send RESTful requests. Nodes provide support for REST through [gRPC-Gateway](https://grpc-ecosystem.github.io/grpc-gateway/). The gRPC-Gateway server is available on port `1317` by default.

See the [Silk Nodes API specification](https://dydx.api.silknodes.io/swagger/#/) for REST endpoints.

**Examples**

Get your USDC balance:
```bash
curl https://examplenode:1317/path/to/resource
```

Get the height of the network:
```bash
curl https://examplenode:1317/path/to/resource
```

## CometBFT API
You can read CometBFT state information using [grpcurl](https://github.com/fullstorydev/grpcurl?tab=readme-ov-file#installation) or your own tool to send RPC requests. The RPC server is available on port `26657` by default.

See the [CometBFT RPC v0.38 API specification](https://docs.cometbft.com/v0.38/rpc) for CometBFT endpoints.

**Examples**

Get your USDC balance:
```bash
grpcurl --plaintext http://examplenode:26657 api.Service/Method
```

Get the height of the network:
```bash
grpcurl --plaintext http://examplenode:26657 api.Service/Method
```