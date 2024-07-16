# Run a Full Node

Running a full node...

<!-- move this to set up a full node
### Save your Chain ID in `dydxprotocold` config

Save the [chain-id](../infrastructure_providers-network/network_constants.mdx#chain-id). This will make it so you do not have to manually pass in the chain-id flag for every CLI command.

```bash
dydxprotocold config chain-id $CHAIN_ID
``` -->

<!-- covered in setup, not part of running
### Getting a Snapshot

See [snapshot service](../infrastructure_providers-network/resources.mdx#snapshot-service). -->

## Prerequisites

You need a non-validating full node.

## Start Your Full Node

If you set up a `systemd` service to start your full node by following the instructions in [Set Up a Full Node](../infrastructure_providers-validators/how_to_set_up_full_node), start your node with the following command:
```bash
sudo systemctl start dydxprotocold
# To stop service use sudo systemctl stop dydxprotocold
```

If you do not have a `systemd` service to start your full node, instead (TODO)

```bash
example
```

> Start your non-validating node with the flag
`--non-validating-full-node=true`. Otherwise, the application will require that gRPC be enabled.

## Keep Your Full Node Up-To-Date

To keep your full node in sync with the network, follow these best practices.

### Connect to Healthy Peers
In order for the full node to have the latest state, it needs to connect to peers which have the latest state. Use the following links to get a list of live peers which have the latest state

https://services.lavenderfive.com/mainnet/dydx#live-peers

https://polkachu.com/live_peers/dydx

Update `persistent_peers`  in the config.toml file to include a randomly selected list of 5 peers from the list of live peers obtained using the links above

### Use Snapshots or State Sync

**Snapshots** contain a compressed copy of the chain data which allow the full node to bootstrap to a recent state in the blockchain. A list of snapshot services can be found [here](../infrastructure_providers-network/resources.mdx#snapshot-service).

**State Sync** enables a new node to join the network by obtaining a snapshot of the application state from a state sync node at a recent height. This eliminates the need to fetch and replay all historical blocks. A list of state sync services with instructions are listed below:
- https://polkachu.com/state_sync/dydx
- https://services.lavenderfive.com/mainnet/dydx/statesync
- https://autostake.com/networks/dydx/#state-sync

### Address Book
The **`addrbook.json`** file is used to store configuration details that help a node connect to other peers in the network more efficiently. This can be obtained from the one of the below services and needs to be stored in the `config` folder.

https://polkachu.com/addrbooks/dydx

https://services.lavenderfive.com/mainnet/dydx#latest-addrbook

https://autostake.com/networks/dydx/

## Configure Pruning Settings
For optimal storage, use the following pruning setting in your `app.toml file`:

```bash
# 2 latest states will be kept; pruning at 10 block intervals.
pruning = "everything"
```

If the full node is being used for historical queries, a custom strategy should be used to maintain more states. This will increase storage requirements.
