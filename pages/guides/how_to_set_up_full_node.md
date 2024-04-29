# How to set up a full node

## Pre-requisite
1. Linux (Ubuntu Server 22.04.3 recommended)
2. 8-cpu (ARM or x86_64), 64 GB RAM, 500 GB SSD NVME Storage


## Install Full Node
Install a full node to participate in the network.  The following steps will guide you through the process of setting up a full node. Refer or use the script at https://github.com/dydxprotocol/v4-chain/blob/main/protocol/scripts/create_full_node.sh for a more automated process.

### Step 1: Update System and Install Dependencies

```bash
sudo apt-get -y update
sudo apt-get install -y curl jq lz4
```

### Step 2: Install Go
Install Go and set the environment variables.  This allows cosmovisor to be installed. amd64 architecture is used in this example.
```bash
wget https://golang.org/dl/go1.22.2.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.22.2.linux-amd64.tar.gz
rm go1.22.2.linux-amd64.tar.gz
echo 'export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin' >> $HOME/.bashrc
eval "$(cat $HOME/.bashrc | tail -n +10)"
```

### Step 3: Install Cosmovisor
Cosmovisor is a process manager for Cosmos SDK-based blockchains. It allows for the automatic updating of the binary without downtime.  The following command installs Cosmovisor.
```bash
go install cosmossdk.io/tools/cosmovisor/cmd/cosmovisor@v1.5.0
```

### Step 4: Download dydxprotocold Binaries and Initialize Node
1. From https://github.com/dydxprotocol/v4-chain/releases/ | Look for the `protocol` assets.

2. For example, as of `04/26/2024`, this was the correct binary to use:
![dYdX Protocol Binary](../../artifacts/how_to_set_up_full_node_binary_download.png)
3. Download, extract, and rename the binary to `dydxprotocold`.  Move it to a directory in your `$PATH`.  Now, initialize the dydx home  directory (create the directory first if it doesn’t exist).
```bash
CHAIN_ID=dydx-mainnet-1
NODE_NAME=mydydxfullnode
dydxprotocold init --chain-id=$CHAIN_ID $NODE_NAME

by default, the dydx home directory is created in $HOME/.dydxprotocol
```

### Step 5: Create Cosmovisor Directories and Move Binaries

```bash
mkdir -p $HOME/.dydxprotocol/cosmovisor/genesis/bin
mkdir -p $HOME/.dydxprotocol/cosmovisor/upgrades
mv dydxprotocold $HOME/.dydxprotocol/cosmovisor/genesis/bin/
```

### Step 6: Get Genesis and Update Config

```bash
curl https://dydx-rpc.lavenderfive.com/genesis | python3 -c 'import json,sys;print(json.dumps(json.load(sys.stdin)["result"]["genesis"], indent=2))' > $WORKDIR/config/genesis.json
sed -i 's/seeds = ""/seeds = "'"${SEED_NODES[*]}"'"/' $HOME/.dydxprotocol/config/config.toml
```

### Step 7: Create Service to Start Full Node

We will create a systemd service to start the full node.  This will allow the full node to start automatically on boot.

```bash
sudo tee /etc/systemd/system/dydxprotocold.service > /dev/null << EOF
[Unit]
Description=osmosis node service
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

### Step 8: Get Snapshot
> **Note:** the example values below align with the **deployment by DYDX token holders**. For alternatives, please visit the [Network Resources page](../network/resources.md).

1. From https://bwarelabs.com/snapshots/dydx
2. Download and extract (using `lz4 -dc < snapshotfile.tar.lz4 | tar xf -`) the snapshot contents in the dydxprotocol home directory (make sure you are in this directory before running the tar command). In this example, the home directory is `$HOME/.dydxprotocol`
3. (Alternatives): If the above is not available, there are these alternatives:
 - https://polkachu.com/tendermint_snapshots/dydx
 - https://dydx-archive-snapshot.kingnodes.com/
 - Also check [Snapshot service](../network/resources.md#snapshot-service)

### Step 9: Start Service

```bash
sudo systemctl start dydxprotocold
```

### Check logs for the service to ensure it is running

```bash
sudo journalctl -u dydxprotocold -f
```
The full node is now syncing. To determine whether the full node is caught up with the chain head, please check the applicable block explorer to determine when it reaches the current block – an example block explorer is shown on https://www.mintscan.io/dydx

## Things you can do with the full node
GET CURRENT BLOCK: You can get the current block with this program https://github.com/chiwalfrm/dydxexamples/blob/main/v4block_subscribe.py 

Run it with the full node IP address and port `26657`:
```bash
python3 v4block_subscribe.py ws://<IPADDRESS>:26657
```
Where `<IPADDRESS>` is the IP address of your full node.
![Full node usage example](../../artifacts/how_to_set_up_full_node_usage_example.png)