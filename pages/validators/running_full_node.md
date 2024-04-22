# Running a full node
## Save your Chain ID in `dydxprotocold` config

Save the [chain-id](../network/network_constants.md#chain-id). This will make it so you do not have to manually pass in the chain-id flag for every CLI command.

```bash
dydxprotocold config chain-id $CHAIN_ID
```

## Getting a Snapshot

See [snapshot service](../network/resources.md#snapshot-service).

## Slinky Sidecar

Starting in `v5.0.0`, running a validating full node requires a Skip Protocol's Slinky Sidecar to be run in order to fetch Oracle prices. The sidecar should be started before upgrading from `v4` to `v5`. Instructions to start Slinky Sidecar can be found [here](https://docs.skip.money/slinky/integrations/dydx).

Support issues with Skip's Sidecar should be directed [here](https://discord.gg/7hxEThEaRQ).

For mainnet deployment by dYdX Operation Services, Ltd. run: `N/A`

For testnet run: [`v0.4.0`](https://github.com/skip-mev/slinky/tree/v0.4.0) (`ghcr.io/skip-mev/slinky-sidecar:v0.4.0`)

## Start a Full Node

Find the seed node's ID and the IP address from [Resources](../network/resources.md#seed-nodes). Then, run the following command to start a non-validating full node.

For example,
```bash
dydxprotocold start --p2p.seeds="..." --bridge-daemon-eth-rpc-endpoint="<eth rpc endpoint>" --non-validating-full-node=true
```

💡**Note**: if you want to disable gRPC on your full node, it is important to start the node with the
`--non-validating-full-node=true` flag. Otherwise, the application will require that gRPC be enabled.
