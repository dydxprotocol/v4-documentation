#temp
# Set Up a Full Node

Installing and running a full node allows your system to participate in a dYdX chain network.

## Choose a Method

To set up a full node, you can either:

1. Use [this script](https://github.com/dydxprotocol/v4-chain/blob/main/protocol/scripts/create_full_node.sh), provided by dYdX to automate setup.

2. Follow the steps on this page to manually set up a full node.

> Code snippets on this page use example values. Replace them with your own. See the [Network Configuration](../infrastructure_providers-network/network_constants.mdx) section of the documentation for network constants and other resources you need to configure a full node.

## Installation Steps

### Prerequisites
To run a full node, the system that hosts the node must meet the following minimum requirements:

- Linux (Ubuntu Server 22.04.3 or later recommended)
- 8-core CPU (ARM or x86_64 architecture)
- 64 GB RAM
- 500 GB SSD NVMe Storage

### Step 1: Update your system and install software dependencies

To download system updates and install `curl`, run the following commands:

```bash
# AMD64 architecture example
sudo apt-get -y update
sudo apt-get install -y curl jq lz4
```

To install [Go](https://go.dev/), run the following commands:

```bash
# AMD64 architecture example
wget https://golang.org/dl/go1.22.2.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.22.2.linux-amd64.tar.gz
rm go1.22.2.linux-amd64.tar.gz
echo 'export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin' >> $HOME/.bashrc
eval "$(cat $HOME/.bashrc | tail -n +10)"
```

### Step 2: Install Cosmovisor
[Cosmovisor](https://docs.cosmos.network/main/build/tooling/cosmovisor) is a process manager for Cosmos SDK-based blockchains that enables automatic binary updates without downtime. To install Cosmovisor, run the following command:

```bash
go install cosmossdk.io/tools/cosmovisor/cmd/cosmovisor@v1.5.0
```

### Step 3: Download the `dydxprotocold` binary

The `dydxprotocold` binary contains the software you need to operate a full node. **You must use the same version of the software as the network to which you want to connect.**

Look up the current protocol version of the dYdX network. To determine the network's current block, you can use a block explorer such as [mintscan.io](https://www.mintscan.io/dydx). TODO

Find and download that protocol binary from the [v4 Chain Releases](https://github.com/dydxprotocol/v4-chain/releases/) page.
   
> For example, for protocol version 5.0.5 on an AMD system, download `dydxprotocold-v5.0.5-linux-amd64.tar.gz`.

<!-- **Option 2**: Specify the protocol binary and download it with `curl -L -O`. Use the base URL `https://github.com/dydxprotocol/v4-chain/releases/download/protocol/`
   and append the binary information in the following format:
   `<v0.0.0>/dydxprotocold-<v0.0.0>-<architecture>.tar.gz`
  
> For example, for protocol version 5.0.5 on an AMD system, run:
   
```
curl -L -O https://github.com/dydxprotocol/v4-chain/releases/download/protocol/v5.0.5/dydxprotocold-v5.0.5-linux-amd64.tar.gz
``` -->

### Step 4: Create Cosmovisor directories

Cosmovisor directories store the genesis state of a chain and the binaries needed to upgrade it without downtime. To create Cosmovisor directories, run the following commands:

```bash
mkdir -p $HOME/.dydxprotocol/cosmovisor/genesis/bin
mkdir -p $HOME/.dydxprotocol/cosmovisor/upgrades
```

### Step 5: Extract the `dydxprotocold` binary to your Cosomovisor directory


TODO 

Extract the `.tar.gz` file that you downloaded to your `/.dydxprotocol/cosmovisor/genesis/bin` directory. Rename the extracted file or create a symbolic link to the file. Add the directory with the executable or symbolic link to your system's `$PATH`.

   **Option 1:** Rename the extracted file. Edit the filename from `dydxprotocold-[version]-[architecture]` to simply `dydxprotocold`. For example:

   ```bash
   mv /path/to/dydxprotocold-[version]-[architecture] dydxprotocold
   ```

   **Option 2:** Create a symbolic link to the extracted file using the name `dydxprotocold`. For example:

   ```bash
   ln -s /path/to/dydxprotocold-[version]-[architecture] dydxprotocold
   ```

<!-- Add the directory that contains the `dydxprotocold` executable to your system's `$PATH`. -->


   First, make sure that your data directory is empty. In the example below, `DYDX_HOME` contains the path to the directory that must be empty.

   Then, run the `dydxprotocold init` command, supplying a chain ID, a path to a data directory, and a moniker for your node:

   ```bash
   # Example values
   CHAIN_ID=my-dydx-deployment
   DYDX_HOME=/path/to/your/data/directory
   NODE_MONIKER=my-dydx-fullnode
   
   dydxprotocold init --chain-id=$CHAIN_ID --home=$DYDX_HOME $NODE_MONIKER
   ```

The `dydxprotocold` executable is now installed. Your system can now host a full node using `dydxprotocold` to interface with a dYdX chain deployment from your command line. To connect to a chain, you must first sync your node with that chain's history. dYdX recommends doing this by using a snapshot.

### Step 6: Get and save the network's genesis state

```bash
curl https://dydx-rpc.lavenderfive.com/genesis | python3 -c 'import json,sys;print(json.dumps(json.load(sys.stdin)["result"]["genesis"], indent=2))' > $WORKDIR/config/genesis.json
 
# For an up-to-date list of seed nodes, visit https://docs.dydx.exchange/network/resources#seed-nodes
SEED_NODES=("ade4d8bc8cbe014af6ebdf3cb7b1e9ad36f412c0@seeds.polkachu.com:23856", 
"65b740ee326c9260c30af1f044e9cda63c73f7c1@seeds.kingnodes.net:23856", 
"f04a77b92d0d86725cdb2d6b7a7eb0eda8c27089@dydx-mainnet-seed.bwarelabs.com:36656",
"20e1000e88125698264454a884812746c2eb4807@seeds.lavenderfive.com:23856",
"c2c2fcb5e6e4755e06b83b499aff93e97282f8e8@tenderseed.ccvalidators.com:26401",
"a9cae4047d5c34772442322b10ef5600d8e54900@dydx-mainnet-seednode.allthatnode.com:26656",
"802607c6db8148b0c68c8a9ec1a86fd3ba606af6@64.227.38.88:26656",
"ebc272824924ea1a27ea3183dd0b9ba713494f83@dydx-mainnet-seed.autostake.com:27366"
)
 
sed -i 's/seeds = ""/seeds = "'"${SEED_NODES[*]}"'"/' $HOME/.dydxprotocol/config/config.toml
```

### Step 7: Create a service to start your full node automatically
We will create a systemd service to start the full node. This will allow the full node to start automatically on boot.

```bash
sudo tee /etc/systemd/system/dydxprotocold.service > /dev/null << EOF
[Unit]
Description=dydxprotocol node service
After=network-online.target
 
[Service]
User=$USER
ExecStart=/$HOME/go/bin/cosmovisor run start --non-validating-full-node=true
WorkingDirectory=$HOME/.dydxprotocol
Restart=always
RestartSec=5
LimitNOFILE=4096
Environment="DAEMON_HOME=$HOME/.dydxprotocol"
Environment="DAEMON_NAME=dydxprotocold"
Environment="DAEMON_ALLOW_DOWNLOAD_BINARIES=false"
Environment="DAEMON_RESTART_AFTER_UPGRADE=true"
Environment="UNSAFE_SKIP_BACKUP=true"
 
[Install]
WantedBy=multi-user.target
EOF
 
sudo systemctl daemon-reload
sudo systemctl enable dydxprotocold
```

### Step 8: Fast-forward your node's state using a snapshot
Using snapshots to restore or sync your full node's state saves time and effort. Using a snapshot avoids replaying all the blocks from genesis (height = 0) and does not require multiple binary versions for network upgrades. Instead, your node reads most of the chain's history directly from the snapshot.

To install a dYdX snapshot, first download the latest snapshot contents from a [snapshot service](/infrastructure_providers-network/resources#snapshot-service).

> For example, you can download the history to date of the mainnet dYdX chain from [Bware Labs](https://bwarelabs.com/snapshots/dydx).

2. Extract the snapshot to your data directory.

   To extract the snapshot content and move it to your node's data directory, run the following command:

   ```bash
   # Example value
   SNAPSHOT_FILENAME=dydx2024example

   lz4 -dc < $SNAPSHOT_FILENAME.tar.lz4 | tar xf - $DYDX_HOME/data
   ```

The snapshot is installed. When you start your full node, it automatically uses the snapshot in its data directory to begin syncing your full node's state with the network.

### Step 9: Start your full node service

```bash
sudo systemctl start dydxprotocold
# To stop service use sudo systemctl stop dydxprotocold
```

When you start your full node it must sync with the history of the network. If you initialized your full node using a snapshot, your node must update its state only with blocks created after the snapshot was taken. If your node's state is empty, it must sync with the entire history of the network.

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

   - Using the `--p2p.seeds` command line flag, provide a comma-separated list of node URIs in the blockchain network that you are connecting to. For a list of node URIs, see the Resources page section for [Seed Nodes](../infrastructure_providers-network/resources.mdx#seed-nodes).

   - Using the `--home` command line flag, provide the path to your data directory.

   - You must include the flag `--non-validating-full-node=true` to start a full node.

2. Confirm that your full node has finished syncing by comparing its current block to the dYdX chain. The full node is caught up with the dYdX chain head when it reaches the dYdX chain's current block.

   - To determine the network's current block, you can use a block explorer such as [mintscan.io](https://www.mintscan.io/dydx).

   - To determine your full node's height, query your node with the following command:
   
     ```bash
     curl localhost:26657/status
     ```

### Step 10: Confirm that your node is running

```bash
sudo journalctl -u dydxprotocold -f
```

The full node is now syncing. To determine whether the full node is caught up with the chain head, please check the applicable block explorer to determine when it reaches the current block – an example block explorer is shown on https://www.mintscan.io/dydx

## Next Steps

When your full node is up to date with the network, you can use it to read live data and configure additional settings. Learn more on the [Running a Full Node](../infrastructure_providers-validators/running_full_node) page.
