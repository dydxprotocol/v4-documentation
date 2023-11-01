# Running a full node
## Save your Chain ID in `dydxprotocold` config

Save the testnet `chain-id`. This will make it so you do not have to manually pass in the chain-id flag for every CLI command.

```bash
dydxprotocold config chain-id dydx-testnet-4
```

## Downloading `genesis.json`

Download the correct `genesis.json` from the [`v4-testnets` repository](https://github.com/dydxprotocol/v4-testnets) and replace the existing `genesis.json`.

## Start a Full Node

Find the seed node's ID and the IP address from the [testnet info page](https://v4-teacher.vercel.app/testnets/testnet_info). Then, run the following command to start a non-validating full node.

For example,
```bash
dydxprotocold start --p2p.seeds="25dd504d86d82673b9cf94fe78c00714f236c9f8@13.59.4.93:26656" --non-validating-full-node=true
```

💡💡💡**Note**: if you want to disable gRPC on your full node, it is important to start the node with the
`--non-validating-full-node=true` flag. Otherwise, the application will require that gRPC be enabled. 💡💡💡

If you would like to access snapshots for the test-net, please see [here](https://bwarelabs.com/snapshots)
