# Set Up a Full Node
Installing and running a full node allows your system to participate in a dYdX chain network.

### Prerequisites
To run a full node, the system that hosts the node must meet the following minimum requirements:

- Linux (Ubuntu Server 22.04.3 or later recommended)
- 8-core CPU (ARM or x86_64 architecture)
- 64 GB RAM
- 500 GB SSD NVMe Storage

## Choose a Method
To set up a full node, you can either:

1. Use [this script](https://github.com/dydxprotocol/v4-chain/blob/main/protocol/scripts/create_full_node.sh), provided by dYdX, to automate setup.
2. Follow the steps on this page to manually set up a full node.

> Code snippets on this page use example values. Replace them with your own. See the [Network Configuration](../infrastructure_providers-network/network_constants.mdx) section of the documentation for network constants and other resources you need to configure a full node.

## Manual Installation Steps
The following steps will guide you through manually setting up a full node. Alternatively, you can [run this script](https://github.com/dydxprotocol/v4-chain/blob/main/protocol/scripts/create_full_node.sh).

### Step 1: Update your system and prepare to install dependencies
To download system updates and install [curl](https://curl.se/), run the following commands:

```bash
sudo apt-get -y update
sudo apt-get install -y curl jq lz4
```

### Step 2: Install Go
To install [Go](https://go.dev/) and set your environment variables, run the following commands:

```bash
# Example for AMD64 architecture
wget https://golang.org/dl/go1.22.2.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.22.2.linux-amd64.tar.gz
rm go1.22.2.linux-amd64.tar.gz
echo 'export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin' >> $HOME/.bashrc
eval "$(cat $HOME/.bashrc | tail -n +10)"
```

### Step 3: Install Cosmovisor and create data directories
[Cosmovisor](https://docs.cosmos.network/main/build/tooling/cosmovisor) is a process manager for Cosmos SDK-based blockchains that enables automatic binary updates without downtime. To install Cosmovisor, run the following command:
```bash
go install cosmossdk.io/tools/cosmovisor/cmd/cosmovisor@v1.5.0
```
To create data directories for Cosmovisor, run the following command:
```bash
mkdir -p $HOME/.dydxprotocol/cosmovisor/genesis/bin
mkdir -p $HOME/.dydxprotocol/cosmovisor/upgrades
```

### Step 4: Download and extract the `dydxprotocold` binary
The `dydxprotocold` binary contains the software you need to operate a full node. **You must use the same version of the software as the network to which you want to connect.**

Look up the current protocol version of the dYdX network. To determine the network's current protocol version, TODO

Find and download that protocol binary from the [v4 Chain Releases](https://github.com/dydxprotocol/v4-chain/releases/) page.
   
> For example, for protocol version 5.0.5 on an AMD system, download `dydxprotocold-v5.0.5-linux-amd64.tar.gz`.

Extract the bindary. Rename it to simply `dydxprotocold`. Move it to a directory in your `$PATH` so that it's accessible from your command line. 

### Step 5: Initialize your node
To initialize your node, run `dydxprotocold init`. By default, the dYdX home directory is created in `$HOME/.dydxprotocol`.

```bash
CHAIN_ID=dydx-testnet-0
NODE_NAME=mydydxfullnode
dydxprotocold init --chain-id=$CHAIN_ID $NODE_NAME
```

### Step 6: Move `dydxprotocol` to your Cosmovisor `/genesis` directory

```bash
mv dydxprotocold $HOME/.dydxprotocol/cosmovisor/genesis/bin/
```

### Step 7: Download the Genesis Block and use it to update your configuration
To download the Genesis Block and then update your node's configuration, run the following command:

```bash
curl https://dydx-rpc.lavenderfive.com/genesis | python3 -c 'import json,sys;print(json.dumps(json.load(sys.stdin)["result"]["genesis"], indent=2))' > $WORKDIR/config/genesis.json

# See https://docs.dydx.exchange/network/resources#seed-nodes for an up-to-date list of nodes
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

### Step 8: Create a system service to start your full node automatically
To create a `systemd` service to start the full node automatically on system startup, run the following commands:

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

### Step 9: Download a snapshot of the chain's history
1. Choose a snapshot from the [Snapshot Service](https://docs.dydx.exchange/network/resources#snapshot-service).
2. Download and extract the snapshot contents in the dydxprotocol home directory (make sure you are in this directory before running the tar command). In this example, the home directory is `$HOME/.dydxprotocol`

To extract the snapshot, run the following command:

```bash
`lz4 -dc < snapshotfile.tar.lz4 | tar xf -`
```

<!-- Using snapshots to restore or sync your full node's state saves time and effort. Using a snapshot avoids replaying all the blocks from genesis (height = 0) and does not require multiple binary versions for network upgrades. Instead, your node reads most of the chain's history directly from the snapshot.

To install a dYdX snapshot, first download the latest snapshot contents from a [snapshot service](/infrastructure_providers-network/resources#snapshot-service).

> For example, you can download the history to date of the mainnet dYdX chain from [Bware Labs](https://bwarelabs.com/snapshots/dydx).

2. Extract the snapshot to your data directory.

   To extract the snapshot content and move it to your node's data directory, run the following command:

   ```bash
   # Example value
   SNAPSHOT_FILENAME=dydx2024example

   lz4 -dc < $SNAPSHOT_FILENAME.tar.lz4 | tar xf - $DYDX_HOME/data
   ```

The snapshot is installed. When you start your full node, it automatically uses the snapshot in its data directory to begin syncing your full node's state with the network. -->

### Step 10: Start the service

To start your node using the service that you created, run the following command:

```bash
sudo systemctl start dydxprotocold
# To stop service use sudo systemctl stop dydxprotocold
```

When you start your full node it must sync with the history of the network. If you initialized your full node using a snapshot, your node must update its state only with blocks created after the snapshot was taken. If your node's state is empty, it must sync with the entire history of the network.

### Last Step: Check your service logs to confirm your node is running

```bash
sudo journalctl -u dydxprotocold -f
```
The full node is now syncing. To determine whether the full node is caught up with the chain head, please check the applicable block explorer to determine when it reaches the current block – an example block explorer is shown on https://www.mintscan.io/dydx.

<!-- 
## Things you can do with the full node
GET CURRENT BLOCK: You can get the current block with this program https://github.com/chiwalfrm/dydxexamples/blob/1d46b7a75499205d9c1c1986ae4ae8f21b6c1385/v4block_subscribe.py

Run it with the full node IP address and port `26657`:
```bash
python3 v4block_subscribe.py ws://<IPADDRESS>:26657
```
Where `<IPADDRESS>` is the IP address of your full node.
![Full node usage example](../../artifacts/how_to_set_up_full_node_usage_example.png) -->

## Next Steps

When your full node is up to date with the network, you can use it to read live data and configure additional settings. Learn more on the [Running a Full Node](../infrastructure_providers-validators/running_full_node) page.