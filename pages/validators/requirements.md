# Minimum Specs

The minimum recommended specs for running a node is the following:

- 8-core, x86_64 architecture processor
- 64 GiB RAM
- 500 GiB of locally attached SSD storage

For example, an AWS instance like the `r6id.2xlarge`, or equivalent.

# Ethereum RPC Endpoint

For the chain to process bridge transactions from Ethereum, Ethereum testnet, or other chain that supports the `eth_getLogs` RPC method, the bridge daemon queries an RPC endpoint for logs emitted by the bridge contract. By default, a node will use a public testnet endpoint that may have rate-limiting, low reliability, or other restricted functionality.

For your node to successfully ingest bridge transactions from the relevant blockchain, you are required to specify your own private RPC endpoint with flag `--bridge-daemon-eth-rpc-endpoint <YOUR_PRIVATE_RPC_ENDPOINT>` in the command you run when starting the node.

💡IMPORTANT💡:The RPC endpoint you choose *MUST* satisfy the following requirements
* supports `eth_chainId` method
* supports `eth_getLogs` method
* supports `"finalized"` as an input to `toBlock` parameter (Erigon is currently the only major Ethereum node software that does not support this.)

# Required Configs

💡IMPORTANT💡 The dYdX Chain has important node configurations required for normal chain operation. This includes:

## `config.toml`

```
[consensus]
timeout_commit = "500ms"
```

## `app.toml`

```
# Set up correct minimum-gas-price correctly. 
# `12500000000adv4tnt` is for dYdX testnets. Recommended values may be different for production networks.
minimum-gas-prices = "0.025ibc/8E27BA2D5493AF5636760E354E46004562C46AB7EC0CC4C1CA14E9E20E2545B5,12500000000adv4tnt"

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
