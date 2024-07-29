# Run a Full Node
Running a full node allows your system to participate in a dYdX chain network. The recommended settings and best practices on this page help ensure your node stays healthy and up to date with the network.

> Code snippets on this page use example values. Replace them with your own. See the [Network Configuration](../infrastructure_providers-network/network_constants.mdx) section of the documentation for network constants and other resources you need to configure a full node.

## Prerequisites
You need a running, non-validating full node that is connected to network. 

- If you created a system service for your node by following the instructions on the previous page, [Set Up a Full Node](../infrastructure_providers-validators/how_to_set_up_full_node.md), start your node with the following command:
  ```bash
  stystemctl start dydxprotocol
  ```
- To start your node directly with Cosmovisor, you must include the flag `--non-validating-full-node=true`. Cosmovisor may prompt you to configure additional environment variables or include them in your command.
  ```bash
  cosmovisor run start --non-validating-full-node=true 
  ```

<!-- is this right? i also see 
dydxprotocold start --p2p.seeds="..." --bridge-daemon-eth-rpc-endpoint="<eth rpc endpoint>" --non-validating-full-node=true -->

## Connect to Healthy Peers
To keep your full node up to date, connect to healthy peers that have the latest state of the network. You can find a list of healthy peers with the latest state from the following services:
- https://services.lavenderfive.com/mainnet/dydx#live-peers
- https://polkachu.com/live_peers/dydx

From a list of healthy peers, choose any 5 for your node to query for the latest state. Add a comma-separated list of those peer addresses to the `persistent_peers` field in your `config.toml`, like in the following example:

```yaml
# config.toml
# Example values from Polkachu for dydx-mainnet-1
persistent_peers=83c299de2052db247f08422b6592e1383dd7a104@136.243.36.60:23856,1c64b35055d34ff3dd199bb4a5a3ae46b9c10c89@3.114.126.71:26656,3651c82a89f8f4d6fc30fb27b91159f0de092031@202.8.9.134:26656,580ec248de1f41d4e50abe132b7838348db55b80@176.9.144.40:23856,febe75fb6e70a60ce6344b82ff14903bcb53a209@38.122.229.90:26656
```

<!-- do these need to be in square brackets? it seems like thats how toml arrays work -->

## Save an Address Book
Download the latest `addrbook.json` file, which stores configuration details that help your node efficiently connect to peers in its network. You can download an up-to-date address book file from one of the following services:
- https://polkachu.com/addrbooks/dydx
- https://services.lavenderfive.com/mainnet/dydx#latest-addrbook
- https://autostake.com/networks/dydx/

Save the `addrbook.json` file in your `/.dydxprotocol/config` directory.

## Back Up Your Node
> If you followed the procedure on the previous page, [Set Up a Full Node](../infrastructure_providers-validators/how_to_set_up_full_node.md), you already have a snapshot installed and can skip this section.

Your full node needs a backup plan to replay the history of the network in case it falls out of sync. You can back up your node in one of two ways:

1. Using a **snapshot**, which contains a compressed copy of the application state at a point in time, saved on the system that your node runs on. If your node falls out of sync, the snapshot allows the node to quickly recover to the application state when your snapshot was taken. This speeds up the syncing process significantly. To use a snapshot to back up your full node, install a snapshot from a [snapshot service](../infrastructure_providers-network/resources.mdx#snapshot-service).

2. Using **state sync**, which enables a your node to obtain a snapshot of the application state from a state sync node. This speeds up the syncing process significantly. To use state sync to back up your full node, follow the instructions from a state sync service from the list below:

    - https://polkachu.com/state_sync/dydx
    - https://services.lavenderfive.com/mainnet/dydx/statesync
    - https://autostake.com/networks/dydx/#state-sync

<!-- get into the differences between this. "This speeds up the syncing process significantly" -->

## Optimize Pruning Settings
In general, dYdX recommends the following pruning setting, configured in your `app.toml` file:

```bash
# app.toml
pruning = "everything" # 2 latest states will be kept; pruning at 10 block intervals
```

However, if you want to use your node to query historical data, configure a custom pruning strategy to retain more states. Retaining more states increases storage requirements.

## Next Steps
When you've configured your node...
Learn more on the [next]() page.

<!-- what next steps do we want to suggest here?
- stream data from your full node
- build X on top of this (own charts?)
-->