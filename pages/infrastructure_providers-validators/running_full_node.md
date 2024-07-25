# Run a Full Node

Running a full node allows your system to participate in a dYdX chain network. The recommended settings and best practices on this page help ensure your node stays healthy and up-to-date with the network.

> Code snippets on this page use example values. Replace them with your own. See the [Network Configuration](../infrastructure_providers-network/network_constants.mdx) section of the documentation for network constants and other resources you need to configure a full node.

## Prerequisites

You need a running, non-validating full node. 

- If you created a system service for your node by following the instructions on the previous page, [Set Up a Full Node](../infrastructure_providers-validators/how_to_set_up_full_node.md), you can start your node with the following command:
  ```bash
  stystemctl start dydxprotocol
  ```
- To start your node directly with Cosmovisor, you must include the flag `--non-validating-full-node=true`.

  ```bash
  cosmovisor run start --non-validating-full-node=true 
  ```

## Keep Your Full Node Up-to-Date
To keep your full node in sync with the network, follow these best practices:

### Connect to healthy peers
Connect to healthy peers with the latest state of the network so that your node's state stays up-to-date. You can find a list of healthy peers with the latest state from the following services:
- https://services.lavenderfive.com/mainnet/dydx#live-peers
- https://polkachu.com/live_peers/dydx

When you have a list of healthy peers, choose 5 of them at random to add to the `persistent_peers` field in your `config.toml`.

### Save an address book
Download the `addrbook.json` file, which stores configuration details that help your node connect to peers in its network more efficiently. You can download an up-to-date address book file from one of the following services:

- https://polkachu.com/addrbooks/dydx
- https://services.lavenderfive.com/mainnet/dydx#latest-addrbook
- https://autostake.com/networks/dydx/

Save the file `addrbook.json` in your `/.dydxprotocol/config` directory.

### Use snapshots or state sync to back up your node
Your full node needs a backup plan to replay the history of the network in case it falls out of sync. You can back up your node in one of two ways:

1. **Snapshots** contain a compressed copy of the chain data which allow the full node to bootstrap to a recent state in the blockchain. A list of snapshot services can be found [here](../infrastructure_providers-network/resources.mdx#snapshot-service).

2. Alternatively, **State Sync** enables a new node to join the network by obtaining a snapshot of the application state from a state sync node at a recent height. This eliminates the need to fetch and replay all historical blocks. A list of state sync services with instructions are listed below:
- https://polkachu.com/state_sync/dydx
- https://services.lavenderfive.com/mainnet/dydx/statesync
- https://autostake.com/networks/dydx/#state-sync

## Optimize Pruning Settings
dYdX recommends setting the following pruning setting in your `app.toml file`:

```bash
# 2 latest states will be kept; pruning at 10 block intervals.
pruning = "everything"
```

// However, if the full node is being used for historical queries, a custom strategy should be used to maintain more states. This will increase storage requirements.

## Next Steps
After...