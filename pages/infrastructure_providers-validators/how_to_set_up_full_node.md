# Set Up a Full Node

Setting up a Full Node... TODO

---
**NOTE**

Examples on this page are for mainnet deployments by dYdX token holders. For alternative deployment types, including testnet deployments in the United States, see the [Network Constants page](../infrastructure_providers-network/network_constants.mdx).

---

## Prerequisites
- Linux (Ubuntu Server version 22.04.3 or later)
- 8-core CPU (ARM or x86_64)
- 64 GB RAM
- 500 GB SSD NVME Storage

## Download the `dydxprotocold` binary and initialize the data directory
TODO

1. Find the latest `Release protocol` from the [v4 Chain Releases](https://github.com/dydxprotocol/v4-chain/releases/) page. Download the compressed source code file appropriate for your system.
   
   > For example, to use `Release protocol/v5.0.5` on Ubuntu, download `Source code.tar.gz`.

2. Extract and rename the binary from `Source code` to `dydxprotocold`.  Move the file to a directory in your `$PATH` so that you can initialize it with your command line.

3. Create and initialize your data directory by running the following command:
   ```bash
   dydxprotocold init --chain-id=$CHAIN_ID --home=$DYDX_HOME $NODE_NICKNAME
   
   # Example values
   CHAIN_ID=my-dydx-deployment
   DYDX_HOME=/path/to/data/directory
   NODE_NICKNAME=my-dydx-fullnode
   ```

## Fetch and install the latest `genesis.json` file
TODO

1. Fetch the genesis state of the network and save it as a `.json` file. 
   
   To fetch and save `genesis.json` to your current directory, run the following command:
   ```bash
   curl https://dydx-ops-rpc.kingnodes.com/genesis | python3 -c 'import json,sys;print(json.dumps(json.load(sys.stdin)["result"]["genesis"], indent=2))' > genesis.json
   ```

   If you can’t download the file from the RPC endpoint, try the following alternative sources:
   - https://dydx-dao-rpc.polkachu.com/genesis
   - https://dydx-mainnet-full-rpc.public.blastapi.io/genesis
   - Also check [Full node endpoints → RPC](../infrastructure_providers-network/resources.mdx#full-node-endpoints)

2. Copy `genesis.json` to your data directory’s `/config` folder.

## Install Bware’s Snapshot (Recommended)
TODO Beware’s snapshot <is this> and <saves days of your time because…>. 

1. Download the snapshot contents from https://bwarelabs.com/snapshots/dydx. 

   If you can’t download the snapshot contents from Bware, you can download the snapshot contents from the following alternative sources:
   - https://polkachu.com/tendermint_snapshots/dydx
   - https://dydx-archive-snapshot.kingnodes.com
   - Also check 

2. Extract the snapshot to your data directory.

   Use the command line to navigate to your data directory and run the following command using your own snapshot filename:
   ```bash
   lz4 -dc < your-snapshot-filename.tar.lz4 | tar xf -
   ```

## Start the full node
TODO

1. Configure parameters in your command line. Use the following syntax:
   ```
   nohup dydxprotocold start
   --p2p.seed=$SEED_LIST
   --home=$DYDX_HOME
   --non-validating-full-node=true
   > /tmp/fullnode.log 2>&1 &
   
   # Example values
   SEED_LIST="123@seeds.polkachu.com:123,123@seeds.kingnodes.net:123"
   DYDX_HOME=/path/to/your/data/directory
   ```

   Using the `--p2p.seeds` command line flag, provide a comma-separated list of node URIs in the blockchain network that you are connecting to. For a list of node URIs, see the Resources page section for [Seed Nodes](../infrastructure_providers-network/resources.mdx#seed-nodes).
   
   Using the `--home` command line flag, provide the path to your data directory.

   Once you have entered your parameters, your command should resemble the following:
   ```bash
   nohup dydxprotocold start --p2p.seeds="ade4d8bc8cbe014af6ebdf3cb7b1e9ad36f412c0@seeds.polkachu.com:23856,65b740ee326c9260c30af1f044e9cda63c73f7c1@seeds.kingnodes.net:23856,f04a77b92d0d86725cdb2d6b7a7eb0eda8c27089@dydx-mainnet-seed.bwarelabs.com:36656,20e1000e88125698264454a884812746c2eb4807@seeds.lavenderfive.com:23856,c2c2fcb5e6e4755e06b83b499aff93e97282f8e8@tenderseed.ccvalidators.com:26401,4f20c3e303c9515051b6276aeb89c0b88ee79f8f@seed.dydx.cros-nest.com:26656,a9cae4047d5c34772442322b10ef5600d8e54900@dydx-mainnet-seednode.allthatnode.com:26656,802607c6db8148b0c68c8a9ec1a86fd3ba606af6@64.227.38.88:26656,4c30c8a95e26b07b249813b677caab28bf0c54eb@rpc.dydx.nodestake.top:666,ebc272824924ea1a27ea3183dd0b9ba713494f83@dydx-mainnet-seed.autostake.com:27366" --home=$DYDX_HOME --non-validating-full-node=true > /tmp/fullnode.log 2>&1 &
   ```
   
   Run your command to start the full node.

2. Monitor your full node's progress by tailing the log (optional).
   
   To tail the log, run the following command: 
   ```bash
   tail -f /tmp/fullnode.log
   ```
3. Confirm that your full node has finished syncing.
   
   The full node is caught up with the dYdX chain head when it reaches the current block. 
   
   To get the dYdX chain current block, use this program: https://github.com/chiwalfrm/dydxexamples/blob/1d46b7a75499205d9c1c1986ae4ae8f21b6c1385/v4block_subscribe.py

   Run it with the full node IP address and port `26657`:
```bash
python3 v4block_subscribe.py ws://<IPADDRESS>:26657
```
Where `<IPADDRESS>` is the IP address of your full node.
![Full node usage example](../../artifacts/how_to_set_up_full_node_usage_example.png)

   To determine your full node's current block, use a block explorer like this example on [mintscan.io](https://www.mintscan.io/dydx).

## Next Steps

Do something with your full node