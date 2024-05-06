# Running a full node
## Save your Chain ID in `dydxprotocold` config

Save the [chain-id](../network/network_constants.md#chain-id). This will make it so you do not have to manually pass in the chain-id flag for every CLI command.

```bash
dydxprotocold config chain-id $CHAIN_ID
```

## Getting a Snapshot

See [snapshot service](../network/resources.md#snapshot-service).

## Start a Full Node

Find the seed node's ID and the IP address from [Resources](../network/resources.md#seed-nodes). Then, run the following command to start a non-validating full node.

For example,
```bash
dydxprotocold start --p2p.seeds="..." --bridge-daemon-eth-rpc-endpoint="<eth rpc endpoint>" --non-validating-full-node=true
```

💡**Note**: if you want to disable gRPC on your full node, it is important to start the node with the
`--non-validating-full-node=true` flag. Otherwise, the application will require that gRPC be enabled.
