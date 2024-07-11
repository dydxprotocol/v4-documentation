# Set Up a Full Node

> Code snippets on this page use example values. Replace them with your own. See the [Network Configuration](../infrastructure_providers-network/network_constants.mdx) section of the documentation for network constants and other resources you need to configure a full node.

## System requirements
To run a full node, the system that hosts the node must meet the following minimum requirements:

- Linux (Ubuntu Server 22.04.3 or later recommended)
- 8-core CPU (ARM or x86_64 architecture)
- 64 GB RAM
- 500 GB SSD NVMe Storage

## Install `dydxprotocold`

The `dydxprotocold` binary contains the software you need to operate a full node. You must use the same version of the software as the network to which you want to connect.

1. Find the current version of the dYdX network.

2. Find the matching `Release protocol` version from the [v4 Chain Releases](https://github.com/dydxprotocol/v4-chain/releases/) page. Download the compressed `dydxprotocold` file for your system.
   
   > For example, for protocol version 5.0.5 on an AMD system, download `dydxprotocold-v5.0.5-linux-amd64.tar.gz`.

   Alternatively, you can download a release with `curl -L -O` by specifying a binary in the URL. Use the format `https://github.com/dydxprotocol/v4-chain/releases/download/protocol/<v0.0.0>/dydxprotocold-<v0.0.0>-<system>-<architecture>.<file>`.

   > For example, for protocol version 5.0.5 on an AMD system, run:
     ```bash
     curl -L -O https://github.com/dydxprotocol/v4-chain/releases/download/protocol/v5.0.5/dydxprotocold-v5.0.5-linux-amd64.tar.gz
    ```

3. Extract the binary.

   Extract the `.tar.gz` file that you downloaded. Rename the extracted file or create a symbolic link to the file:

   **Option 1:** Rename the file. Edit the filename from `dydxprotocold-<version>-<architecture>` to simply `dydxprotocold`. For example:

   ```bash
   mv /path/to/dydxprotocold-<version>-<architecture> dydxprotocold
   ```

   **Option 2:** Create a symbolic link to the file using the name `dydxprotocold`. For example:

   ```bash
   ln -s /path/to/dydxprotocold-<version>-<architecture> dydxprotocold
   ```

   > To run `dydxprotocold` from your command line, you might need to add your current directory to your system $PATH or move the file to a directory in your system $PATH.

4. Initialize your data directory.

   First, make sure that your data directory is empty. In the example below, `DYDX_HOME` contains the path to the directory that must be empty.

   Then, run the `dydxprotocold init` command, supplying a chain ID, a path to a data directory, and a moniker for your node:

   ```bash
   # Example values
   CHAIN_ID=my-dydx-deployment
   DYDX_HOME=/path/to/your/data/directory
   NODE_MONIKER=my-dydx-fullnode
   
   dydxprotocold init --chain-id=$CHAIN_ID --home=$DYDX_HOME $NODE_MONIKER
   ```

Your machine can now host a full node using the `dydxprotocold` CLI to interface with any dYdX chain deployment. To connect to a chain, you must first sync your node with that chain's history. dYdX recommends doing this with a snapshot.

## Initialize node state using a snapshot
Using snapshots to restore or sync your full node's state saves time and effort. Using a snapshot avoids replaying all the previous blocks from genesis (height = 0) and needing multiple binary versions for network upgrades. Instead, your node reads most of the chain's history directly from the snapshot.

1. Download the latest snapshot contents from a [snapshot service](/infrastructure_providers-network/resources#snapshot-service).

   > For example, you can download the history to date of the mainnet dYdX chain from [Bware Labs](https://bwarelabs.com/snapshots/dydx).

2. Extract the snapshot to your data directory.

   To extract the snapshot content and move it to your node's data directory, run the following command:

   ```bash
   # Example value
   SNAPSHOT_FILENAME=dydx2024example

   lz4 -dc < $SNAPSHOT_FILENAME.tar.lz4 | tar xf - $DYDX_HOME/data
   ```

When you start your full node, it will automatically use the snapshot in its data directory to begin syncing your full node's state with the network.

## Start your full node

When starting your full node, it will try to sync to the network's latest block height. The starting point for the sync depends on your full node's local state. If you initialized your full node's state using a snapshot (using the instructions above), you have effectively set your full node's state to the state when the snapshot was taken and your node will be able to sync much faster because the number of blocks to sync will be relatively small (i.e. blocks to sync = latest block height - snapshot's height). Otherwise, your full node will have to sync from height 0, which will take a much longer time.

1. Configure parameters in your command line. Use the following syntax:

   ```bash
   # Example values
   SEED_LIST="123@seeds.polkachu.com:123,123@seeds.kingnodes.net:123"
   DYDX_HOME=/path/to/your/data/directory

   dydxprotocold start
   --p2p.seed=$SEED_LIST
   --home=$DYDX_HOME
   --non-validating-full-node=true
   ```

   - You must include the flag `--non-validating-full-node=true` to start a full node.
   - Using the `--p2p.seeds` command line flag, provide a comma-separated list of node URIs in the blockchain network that you are connecting to. For a list of node URIs, see the Resources page section for [Seed Nodes](../infrastructure_providers-network/resources.mdx#seed-nodes).
   - Using the `--home` command line flag, provide the path to your data directory.

2. Confirm that your full node has finished syncing by comparing its current block to the dYdX chain. The full node is caught up with the dYdX chain head when it reaches the dYdX chain's current block.

   To determine the network's current block, use a block explorer like this example on [mintscan.io](https://www.mintscan.io/dydx).

   To determine your full node's height, use the program [v4block_subscribe.py](https://github.com/chiwalfrm/dydxexamples/blob/1d46b7a75499205d9c1c1986ae4ae8f21b6c1385/v4block_subscribe.py).

   Run the program with your full node IP address and port `26657`:
   ```bash
   # Example values
   FULL_NODE_IP_ADDRESS=192.168.0.150

   python3 v4block_subscribe.py ws://$FULL_NODE_IP_ADDRESS:26657
   ```

When you have confirmed that your full node is up to date with the rest of the dYdX 
network, you can configure advanced settings and learn about best practices on the [Running a Full Node](../infrastructure_providers-validators/running_full_node) page.

