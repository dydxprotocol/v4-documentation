# Run a Full Node
Running a full node allows your system to participate in a dYdX Chain network. The recommended settings and best practices on this page help ensure your node stays healthy and up to date with the network.

> Code snippets on this page use example values. Replace them with your own. See the [Network Configuration](../infrastructure_providers-network/network_constants.mdx) section of the documentation for network constants and other resources you need to configure a full node.

## Prerequisites
You need a running, non-validating full node that is connected to network. 

- If you created a system service for your node by following the instructions on the previous page, [Set Up a Full Node](../infrastructure_providers-validators/how_to_set_up_full_node.md), start your node with the following command:
  ```bash
  stystemctl start dydxprotocold
  ```
- To start your node with Cosmovisor, include the flag `--non-validating-full-node=true`. Cosmovisor may prompt you to configure additional variables in your environment or include them in your command.
  ```bash
  cosmovisor run start --non-validating-full-node=true 
  ```
  > The flag `--non-validating-full-node` is required. It disables the functionality intended for validator nodes and enables additional logic for reading data.
- To start your node directly with the `dydxprotocold` binary, include the flag `--non-validating-full-node=true`. `dydxprotocold` may prompt you to configure additional variables in your environment or include them in your command.
  
  ```bash
  dydxprotocold run start --non-validating-full-node=true 
  ```
  > The flag `--non-validating-full-node` is required. It disables the functionality intended for validator nodes and enables additional logic for reading data.

## Connect to Healthy Peers
To keep your full node up to date, connect to healthy peers with the latest state of the network. Request a list of healthy peers for your deployment from a [Live Peer Node](../infrastructure_providers-network/resources.mdx#live-peer-node-providers) provider.

From the list of healthy peers that you retrieve from peer node provider, choose any 5 for your node to query for the latest state. Add a comma-separated list of those peer addresses to the `persistent_peers` field in your `config.toml`, like in the following example:

```yaml
# config.toml
# Example values from Polkachu for dydx-mainnet-1
persistent_peers=83c299de2052db247f08422b6592e1383dd7a104@136.243.36.60:23856,1c64b35055d34ff3dd199bb4a5a3ae46b9c10c89@3.114.126.71:26656,3651c82a89f8f4d6fc30fb27b91159f0de092031@202.8.9.134:26656,580ec248de1f41d4e50abe132b7838348db55b80@176.9.144.40:23856,febe75fb6e70a60ce6344b82ff14903bcb53a209@38.122.229.90:26656
```

## Save an Address Book
Download the latest `addrbook.json` file, which stores configuration details that help your node efficiently connect to peers in its network. Download an up-to-date address book file for your deployment from an [Address Book](../infrastructure_providers-network/resources.mdx#address-book-providers) provider.

Save the `addrbook.json` file in your `/.dydxprotocol/config` directory.

## Restore Your Node
> If you followed the procedure on the previous page, [Set Up a Full Node](../infrastructure_providers-validators/how_to_set_up_full_node.md), you already have a snapshot installed.

Your full node needs a backup plan to replay the history of the network in case it falls out of sync. You can prepare a backup for your node in one of two ways.

### Snapshot
You can use a **snapshot** stored on the system that your node runs on. A snapshot contains a compressed copy of the application state at the time the snapshot was taken. If your node falls out of sync, a snapshot allows the node to recover to that saved state before replaying the rest of the history of the network. This speeds up the syncing process because you avoid replaying the entire history of the network, instead starting from your stored application state snapshot. To use a snapshot to back up your full node, install a snapshot for your deployment from a [Snapshot Service](../infrastructure_providers-network/resources.mdx#snapshot-service).

### State Sync
You can use **state sync**, a set of configuration settings that allow your node to retrieve a snapshot from the network. If your node falls out of sync, it queries a state sync node for a verified, recent snapshot of the application state. This speeds up the syncing process because you avoid replaying the entire history of the network, instead starting from the network's most recent application state snapshot. To use state sync to back up your full node, follow the instructions for your deployment from a [State Sync](../infrastructure_providers-network/resources.mdx#state-sync-service) service.

## Optimize Pruning Settings
In general, dYdX recommends the following pruning setting, configured in your `app.toml` file:

```bash
# app.toml
pruning = "everything" # 2 latest states will be kept; pruning at 10 block intervals
```

However, if you want to use your node to query historical data, configure a custom pruning strategy to retain more states. Retaining more states increases storage requirements.