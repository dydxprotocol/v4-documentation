# Required Node Configs

💡Note: failure to set up below configurations on a validator node may compromise chain functionality.

## Ethereum RPC Endpoint

For the chain to process bridge transactions from Ethereum, Ethereum testnet, or other chain that supports the `eth_getLogs` RPC method, the bridge daemon queries an RPC endpoint for logs emitted by the bridge contract. By default, a node will use a public testnet endpoint that may have rate-limiting, low reliability, or other restricted functionality.

For your node to successfully ingest bridge transactions from the relevant blockchain, you are required to specify your own private RPC endpoint with flag `--bridge-daemon-eth-rpc-endpoint <YOUR_PRIVATE_RPC_ENDPOINT>` in the command you run when starting the node.

The RPC endpoint you choose *MUST* satisfy the following requirements
* supports `eth_chainId` method
* supports `eth_getLogs` method
* supports `"finalized"` as an input to `toBlock` parameter (Erigon is currently the only major Ethereum node software that does not support this.)


## Node Configs

The dYdX Chain has important node configurations required for normal chain operation. This includes:
- The `config.toml` file read by CometBFT
  - ([Full documentation](https://docs.cometbft.com/v0.38/core/configuration))
- The `app.toml` file read by CosmosSDK
  - ([Full documentation](https://docs.cosmos.network/main/learn/advanced/config))

### `config.toml`

#### Consensus Configs

```
[consensus]
timeout_commit = "500ms"
```

### `app.toml`

#### Base Configuration

For value of `$NATIVE_TOKEN_DENOM`, see [Network Constants](../network/network_constants.md#native-token-denom)

```
### Gas Prices ###
minimum-gas-prices = "0.025ibc/8E27BA2D5493AF5636760E354E46004562C46AB7EC0CC4C1CA14E9E20E2545B5,12500000000$NATIVE_TOKEN_DENOM"
```

```
### Pruning ###
pruning = "custom"

# Small numbers >= "2" for validator nodes.
# Larger numbers could be used for full-nodes if they are used for historical queries.
pruning-keep-recent = "7"

# Any prime number between "13" and "97", inclusive.
pruning-interval = "17"
```

#### gRPC Configs

```
[grpc]
# Enable grpc. The Cosmos gRPC service is used by various daemon processes,
# and must be enabled in order for the protocol to operate:
enable = true

# Non-standard gRPC ports are not supported at this time. Please run on port 9090, which is the default
# port specified in the config file.
# Note: grpc can be also be configured via start flags. Be careful not to change the default settings
# with either of the following flags: `--grpc.enable`, `--grpc.address`.
address = "0.0.0.0:9090"
```
