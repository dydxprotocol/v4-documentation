# Set Up a Full Node

> Examples on this page are for mainnet deployments by dYdX token holders. For information on alternative deployments, including testnet deployments, see the [Network Constants page](../infrastructure_providers-network/network_constants.mdx).

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

   Alternatively, you can install the latest release protocol by modifying [this curl command](https://gist.github.com/steinwaywhw/a4cd19cda655b8249d908261a62687f8) for your case.

3. Extract the binary.

   Extract the `.tar.gz` file that you downloaded. To run `dydxprotocold` from the command line, either rename the extracted file or create a symbolic link to the file:

   **Option 1:** Rename the file. Edit the filename from `dydxprotocold-<version>-<architecture>` to simply `dydxprotocold`. You might need to add your current directory to your $PATH or move the file to a directory in your $PATH.

   **Option 2:** Create a symbolic link to the file using the name `dydxprotocold`. Run the following command:
   ```bash
   ln -s /path/to/your/binary dydxprotocold
   ```

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

After you initialize your data directory, your full node can write to it.

## Initialize node state using a snapshot
Using snapshots to restore or sync your full node's state saves time and effort. This avoids having to replay all the previous blocks from genesis (height = 0) and having to use multiple binary versions for network upgrades.

1. Download the latest snapshot contents from https://bwarelabs.com/snapshots/dydx. 

   If you can’t download the snapshot contents from Bware, you can download the snapshot contents from the following alternative sources:
   - https://polkachu.com/tendermint_snapshots/dydx
   - https://dydx-archive-snapshot.kingnodes.com
   - Also check [Snapshot service](/infrastructure_providers-network/resources#snapshot-service)

2. Extract the snapshot to your data directory.

   In your data directory, run the following command using your own snapshot filename:
   ```bash
   # Example value
   SNAPSHOT_FILENAME=dydx2024example

   lz4 -dc < $SNAPSHOT_FILENAME.tar.lz4 | tar xf -
   ```

When you start your full node, it will automatically use the snapshot you saved to its state directory.

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

   Using the `--p2p.seeds` command line flag, provide a comma-separated list of node URIs in the blockchain network that you are connecting to. For a list of node URIs, see the Resources page section for [Seed Nodes](../infrastructure_providers-network/resources.mdx#seed-nodes).
   
   Using the `--home` command line flag, provide the path to your data directory.

   Once you have entered your parameters, your command should resemble the following:
   ```bash
   dydxprotocold start --p2p.seeds="ade4d8bc8cbe014af6ebdf3cb7b1e9ad36f412c0@seeds.polkachu.com:23856,65b740ee326c9260c30af1f044e9cda63c73f7c1@seeds.kingnodes.net:23856,f04a77b92d0d86725cdb2d6b7a7eb0eda8c27089@dydx-mainnet-seed.bwarelabs.com:36656,20e1000e88125698264454a884812746c2eb4807@seeds.lavenderfive.com:23856,c2c2fcb5e6e4755e06b83b499aff93e97282f8e8@tenderseed.ccvalidators.com:26401,4f20c3e303c9515051b6276aeb89c0b88ee79f8f@seed.dydx.cros-nest.com:26656,a9cae4047d5c34772442322b10ef5600d8e54900@dydx-mainnet-seednode.allthatnode.com:26656,802607c6db8148b0c68c8a9ec1a86fd3ba606af6@64.227.38.88:26656,4c30c8a95e26b07b249813b677caab28bf0c54eb@rpc.dydx.nodestake.top:666,ebc272824924ea1a27ea3183dd0b9ba713494f83@dydx-mainnet-seed.autostake.com:27366" --home=$DYDX_HOME --non-validating-full-node=true > /tmp/fullnode.log 2>&1 &
   ```
   
   Run your command to start the full node.

2. Monitor your full node's progress by tailing the log (optional).
   
   To tail the log, run the following command: 
   ```bash
   tail -f /tmp/fullnode.log
   ```
3. Confirm that your full node has finished syncing by comparing its current block to the dYdX chain. The full node is caught up with the dYdX chain head when it reaches the dYdX chain's current block.

   To determine your full node's current block, use a block explorer like this example on [mintscan.io](https://www.mintscan.io/dydx).

   To determine the dYdX chain's current block, use the program [v4block_subscribe.py](https://github.com/chiwalfrm/dydxexamples/blob/1d46b7a75499205d9c1c1986ae4ae8f21b6c1385/v4block_subscribe.py).

   Run the program with your full node IP address and port `26657`:
   ```bash
   # Example values
   FULL_NODE_IP_ADDRESS=192.168.0.150

   python3 v4block_subscribe.py ws://$FULL_NODE_IP_ADDRESS:26657
   ```

When you have confirmed that your full node is up to date with the rest of the dYdX 
network, you can configure advanced settings and learn about best practices on the [Running a Full Node](../infrastructure_providers-validators/running_full_node) page.

