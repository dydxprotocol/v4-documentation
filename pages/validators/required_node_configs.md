# Required Node Configs

These configurations must be applied for both full nodes and validators.

💡Note: failure to set up below configurations on a validator node may compromise chain functionality.

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
