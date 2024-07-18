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
The following steps will guide you through manually setting up a full node.

### Step 1: Update your system and prepare to install dependencies
Run the commands in this procedure from your home directory unless otherwise specified in these instructions. To change directories to your home folder, run the following command:
```bash
cd $HOME
```

To download system updates and install [curl](https://curl.se/), run the following commands:
```bash
sudo apt-get -y update
sudo apt-get install -y curl jq lz4
```

### Step 2: Install Go
To install [Go](https://go.dev/), run the following commands using the latest version of Go:

```bash
# Example for AMD64 architecture and Go version 1.22.2
wget https://golang.org/dl/go1.22.2.linux-amd64.tar.gz # Download the compressed file
sudo tar -C /usr/local -xzf go1.22.2.linux-amd64.tar.gz # Extract the file to /usr/local
rm go1.22.2.linux-amd64.tar.gz # Delete the installer package
```

Add the Go directory to your system `$PATH`:
```bash
echo 'export PATH=$PATH:$HOME/go/bin' >> $HOME/.bashrc # Write to your .bashrc profile
```

### Step 3: Install Cosmovisor and create data directories
[Cosmovisor](https://docs.cosmos.network/main/build/tooling/cosmovisor) is a process manager for Cosmos SDK-based blockchains that enables automatic binary updates without downtime. To install the latest version of Cosmovisor, run the following command:
```bash
go install cosmossdk.io/tools/cosmovisor/cmd/cosmovisor@latest
```

To create data directories for Cosmovisor, run the following commands:
```bash
mkdir -p $HOME/.dydxprotocol/cosmovisor/genesis/bin
mkdir -p $HOME/.dydxprotocol/cosmovisor/upgrades
```

### Step 4: Download the `dydxprotocold` binary
The `dydxprotocold` binary contains the software you need to operate a full node. **You must use the same version of the software as the network to which you want to connect.**
> To find the current version of the [dYdX foundation](https://www.dydx.foundation/) mainnet, see the recommended protocol version on [mintscan.io](https://www.mintscan.io/dydx/parameters).

**Option 1**: Find and download that protocol binary from the [v4 Chain Releases](https://github.com/dydxprotocol/v4-chain/releases/) page.
> For example, for protocol version 5.0.5 on an AMD system, download `dydxprotocold-v5.0.5-linux-amd64.tar.gz`.

**Option 2**: Download the binary with `curl`, replacing the version numbers and architecture of the package as needed:
```bash
# curl example for protocol version 5.0.5 on AMD64 architecture
curl -L -O https://github.com/dydxprotocol/v4-chain/releases/download/protocol/v5.0.5/dydxprotocold-v5.0.5-linux-amd64.tar.gz
```

### Step 5: Move `dydxprotocold` to your Cosmovisor `/genesis` directory
After you download the binary, moving `dydxprotold` into your Cosmovisor data directory allows you to use Cosmovisor for no-downtime binary upgrades. To extract, rename, and move the file to your Cosmovisor data directory, run the following commands:

```bash
# Example for AMD64 architecture
sudo tar -xzvf dydxprotocold-v5.0.5-linux-amd64.tar.gz # Extract the file
mv ./build/dydxprotocold-v5.0.5-linux-amd64 ./.dydxprotocol/cosmovisor/genesis/bin/dydxprotocold # Move the file to /.dydxprotocol and rename it
rm dydxprotocold-v5.0.5-linux-amd64.tar.gz # Delete the installer package
```

Add the `dydxprotocold` directory to your system `$PATH`:
```bash
echo 'export PATH=$PATH:$HOME/.dydxprotocol/cosmovisor/genesis/bin' >> $HOME/.bashrc
```

### Step 6: Initialize your node
To initialize your node, provide the ID of the chain to which you want to connect and name your node. By default, the dYdX home directory is created in `$HOME/.dydxprotocol`. Replace the example values with yours and run the following command:
```bash
dydxprotocold init --chain-id=$YOUR_TARGET_CHAIN $YOUR_NODE_NAME
```

### Step 7: Update your node configuration with the Genesis Block of the network in which you want to participate
<!-- confirm that this step is necessary along with snapshot -->
The Genesis Block is the initial state of a dYdX chain. To download it and save it as a JSON file, run the following command:

```bash
curl https://dydx-rpc.lavenderfive.com/genesis | python3 -c 'import json,sys;print(json.dumps(json.load(sys.stdin)["result"]["genesis"], indent=2))' > $HOME/.dydxprotocol/config/genesis.json
```

### Step 8: Update your node configuration with a list of seed nodes
Seed nodes provide trustworthy data about the history of the network to your full node. For an up-to-date list of seed nodes, see [Resources](https://docs.dydx.exchange/network/resources#seed-nodes). To update `config.toml` with a list of seed nodes, run the following command using your own comma-separated list of strings:

```bash
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

The preceding command updates the `seeds` variable of `config.toml` with the list you provide.

### Step 8: Download and extract a snapshot of the chain's history since genesis
Using snapshots to restore or sync your full node's state saves time and effort. Using a snapshot avoids replaying all the blocks from genesis and does not require multiple binary versions for network upgrades. Instead, your node reads most of the chain's history directly from the snapshot.

Find and download the latest snapshot from the [Snapshot Service](https://docs.dydx.exchange/network/resources#snapshot-service). 

Extract the snapshot contents to the default dydxprotocol home directory, `$/HOME/.dydxprotocol/data`, with the following command:

```bash
lz4 -dc < $YOUR_SNAPSHOT_FILENAME.tar.lz4 | tar xf -
```
> The /data directory is automatically created when you extract the snapshot

When you start your full node, it automatically uses the snapshot in its data directory to begin syncing your full node's state with the network.

### Step 9: Create a system service to start your full node automatically
To create a `systemd` service that starts your full node automatically on system startup, run the following commands:

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

The command above saves a file `dydxprotocold.service` to the  directory `/etc/systemd/system/`. The file contains a command to run on startup, `ExecStart`, and related environment variables. **The flag `--non-validating-full-node=true` must be included, as it specifies that you are creating a full node.**

### Step 10: Start the service
To start your node using the `systemd` service that you created, run the following command:
```bash
sudo systemctl start dydxprotocold
```

When you want to stop the service, run the following command:
```bash
sudo systemctl stop dydxprotocold
```

When you start your full node it must sync with the history of the network. If you initialized your full node using a snapshot, your node must update its state only with blocks created after the snapshot was taken. If your node's state is empty, it must sync with the entire history of the network.

### Check your service logs to confirm that your node is running
```bash
sudo journalctl -u dydxprotocold -f
```

If your node is finished syncing, the preceding command returns TODO. Confirm that your full node is properly synchronized by comparing its current block to the dYdX chain.

- To find the network's current block, you can use the block explorer [mintscan.io](https://www.mintscan.io/dydx).
- To find your full node's height, query your node with the following command:
```bash
curl localhost:26657/status
```

When your full node's latest block is the same as the network's latest block, your full node is ready to participate in the network.

## Next Steps
When your full node is up to date with the network, you can use it to read live data and configure additional settings. Learn more on the [Running a Full Node](../infrastructure_providers-validators/running_full_node) page.