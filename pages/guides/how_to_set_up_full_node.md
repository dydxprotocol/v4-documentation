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

# For a more updated list of seed nodes, visit https://docs.dydx.exchange/network/resources#seed-nodes
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