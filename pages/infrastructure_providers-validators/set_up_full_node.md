# Set Up a Full Node
Installing and running a full node allows you to read orderbook and onchain data from a network, as well as place, confirm and cancel orders directly on that network.

> Code snippets on this page use example values. Replace them with your own. See the [Network Configuration](../infrastructure_providers-network/network_constants.mdx) section of the documentation for network constants and other resources you need to configure a full node.

## Prerequisites
To run a full node, the system that hosts the node must meet the following minimum requirements:
- Linux (Ubuntu Server 22.04.3 or later recommended)
- 8-core CPU (ARM or x86_64 architecture)
- 64 GB RAM
- 500 GB SSD NVMe Storage

## Choose a Method
To set up a full node, you can either:

1. Use [this script](https://github.com/dydxprotocol/v4-chain/blob/main/protocol/scripts/create_full_node.sh), provided by dYdX, to automate setup. 

Save the script with an `.sh` extension in your `$HOME` directory. Edit the script, replacing default values in fields such `VERSION` and `CHAIN-ID` with your own. Run the script with the following commands:

> To find the current version of the [dYdX foundation](https://www.dydx.foundation/) mainnet, see the recommended protocol version on [mintscan.io](https://www.mintscan.io/dydx/parameters). To find network constants such as chain IDs, see the [Network Configuration](../infrastructure_providers-network/network_constants.mdx) section of the documentation.

```bash
cd $HOME
bash create_full_node.sh
```

2. Or, follow the steps on this page to manually set up a full node.

## Manual Installation Steps
The following steps will guide you through manually setting up a full node.

Run the commands in this procedure from your home directory unless otherwise specified. To change directories to your home folder, run the following command:
```bash
cd $HOME
```

### Step 1: Update your system and prepare to install dependencies
To download system updates and install [curl](https://curl.se/),[jq](https://jqlang.github.io/jq/), and [lz4](https://lz4.org/), run the following commands:
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
echo 'export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin' >> $HOME/.bashrc # Write to your .bashrc profile
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
The `dydxprotocold` binary contains the software you need to operate a full node. **You must use the same version of the software as the network to which you want to connect.** To find the current version of the [dYdX foundation](https://www.dydx.foundation/) mainnet, see the recommended protocol version on [mintscan.io](https://www.mintscan.io/dydx/parameters).

**Option 1**: Find and download that protocol binary from the [v4 Chain Releases](https://github.com/dydxprotocol/v4-chain/releases/) page.
> For example, for protocol version 5.0.5 on an AMD system, download `dydxprotocold-v5.0.5-linux-amd64.tar.gz`.

**Option 2**: Download the binary with `curl`, replacing the version numbers and architecture of the package as needed:
```bash
# curl example for protocol version 5.0.5 on AMD64 architecture
curl -L -O https://github.com/dydxprotocol/v4-chain/releases/download/protocol/v5.0.5/dydxprotocold-v5.0.5-linux-amd64.tar.gz
```

### Step 5: Move `dydxprotocold` to your Cosmovisor `/genesis` directory
After you download the binary, moving `dydxprotocold` into your Cosmovisor data directory allows you to use Cosmovisor for no-downtime binary upgrades. To extract, rename, and move the file to your Cosmovisor data directory, run the following commands:

```bash
# Example for AMD64 architecture
sudo tar -xzvf dydxprotocold-v5.0.5-linux-amd64.tar.gz # Extract the file
sudo mv ./build/dydxprotocold-v5.0.5-linux-amd64 ./.dydxprotocol/cosmovisor/genesis/bin/dydxprotocold # Move the file to /.dydxprotocol and rename it
rm dydxprotocold-v5.0.5-linux-amd64.tar.gz # Delete the installer package
rm -rf build # Delete the now-empty /build directory
```

Add the `dydxprotocold` directory to your system `$PATH`:
```bash
echo 'export PATH=$PATH:$HOME/.dydxprotocol/cosmovisor/genesis/bin' >> $HOME/.bashrc # Write to your .bashrc profile
```

### Step 6: Initialize your node
To initialize your node, provide the ID of the chain to which you want to connect and create a name for your node. The dYdX home directory is created in `$HOME/.dydxprotocol` by default. Replace the example values `dydx-mainnet-1` and `my-node` with your own and run the following command:
```bash
# Example for DYDX token holders on mainnet
dydxprotocold init --chain-id=dydx-mainnet-1 my-node
```

> See the [Network Configuration](../infrastructure_providers-network/network_constants.mdx) section of the documentation for chain IDs and other network constants.

When you initialize your node, `dydxprotocold` returns your default node configuration in JSON.

### Step 7: Update your node configuration with a list of seed nodes
A seed node acts as an address book and helps your node join the network. To update `config.toml` with a list of seed nodes, run the following command:

> Check the [Resources](https://docs.dydx.exchange/network/resources#seed-nodes) page for an up-to-date list of seed nodes for the network to which you want to connect.

```bash
# Example for DYDX token holders on mainnet
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

### Step 8: Use a snapshot as your node's initial state
Using snapshots to restore or sync your full node's state saves time and effort. Using a snapshot avoids replaying all the blocks from genesis and does not require multiple binary versions for network upgrades. Instead, your node uses the snapshot as its initial state.

#### Clear your data directory
If you already have a data directory at `$HOME/.dydxprotocol/data`, you must clear it before installing a snapshot, which comes with its own data directory. To clear your data directory while retaining files you need, follow these steps:

First, make a backup copy of `priv_validator_state.json` in your `.dydxprotocol` directory by running the following command:
```bash
# Make a copy of priv_validator_state.json and append .backup
cp $HOME/.dydxprotocol/data/priv_validator_state.json $HOME/.dydxprotocol/priv_validator_state.json.backup
```

Next, confirm the following:
- A backup file, `priv_validator_state.json.backup`, exists in your current directory.
- The original `priv_validator_state.json` exists in the `/data` directory to be deleted.
- No other files exist in the `/data` directory to be deleted.

```bash
ls $HOME/.dydxprotocol # Confirm that the backup exists in /.dydxprotocol
ls $HOME/.dydxprotocol/data # Confirm that only priv_validator_state.json exists in /data
```

Finally, to clear the data directory, removing it and all files inside, run the following command:
```bash
# WARNING: This command recursively deletes files and directories in the dydxprotocol /data directory. Make sure you know what you are deleting before running the command.
rm -rf $HOME/.dydxprotocol/data
```

Installing a snapshot will create a new `/data` directory.

#### Install the Snapshot
To download and extract the snapshot contents to the default dydxprotocol home directory, first **change directories into /.dydxprotocol**. To change directories, run the following command:

```bash
cd $HOME/.dydxprotocol
```

Next, find a provider for your use case on the [Snapshot Service](https://docs.dydx.exchange/network/resources#snapshot-service) page. Use the provider's instructions to download the snapshot into your `$HOME/.dydxprotocol` directory.

> For example, if you are connecting to `dydx-mainnet-1`, you may use the provider [Polkachu](https://polkachu.com/tendermint_snapshots/dydx). In most cases, you can run `wget <snapshot-web-address>`.

Next, run the following command in your `$/HOME/.dydxprotocol` directory, replacing the example value `your-snapshot-filename`:

```bash
lz4 -dc < your-snapshot-filename.tar.lz4 | tar xf -
```
Extracting the snapshot creates a new `/data` folder in your current directory, `.dydxprotocol`.

Next, use the backup file `priv_validator_state.json.backup` you created to reinstate `/data/priv_validator_state.json` with the following command:

```bash
mv $HOME/.dydxprotocol/priv_validator_state.json.backup $HOME/.dydxprotocol/data/priv_validator_state.json
```

Finally, **change directories back to your $HOME directory for the rest of the procedure**. Run the following command:
```bash
cd $HOME
```

When you start your full node, it will automatically use the snapshot in your data directory to begin syncing your full node's state with the network.

### Step 9: Create a system service to start your full node automatically
To create a `systemd` service that starts your full node automatically, run the following commands:

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

The system service definition above holds environment variables. When you start it, the service will run the command `/$HOME/go/bin/cosmovisor run start --non-validating-full-node=true`.

> The flag `--non-validating-full-node` is required. It disables the functionality intended for validator nodes and enables additional logic for reading data.

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
If your system service `dydxprotocold` is running, the preceding command streams updates from your node to your command line. Press `Ctrl + C` to stop viewing updates.

Finally, confirm that your full node is properly synchronized by comparing its current block to the dYdX Chain:
- To find the network's current block, see the **Block Height** of your network with a block explorer, such as [mintscan.io](https://www.mintscan.io/dydx).
- To find your full node's height, query your node with the following command:
```bash
curl localhost:26657/status
```

When your full node's latest block is the same as the network's latest block, your full node is ready to participate in the network.

## Next Steps
When your full node is up to date with the network, you can use it to read live data and configure additional settings. Learn more on the [Running a Full Node](../infrastructure_providers-validators/optimize_full_node.md) page.