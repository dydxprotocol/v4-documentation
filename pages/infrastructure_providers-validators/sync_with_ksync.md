# Sync dYdX with KYVE's KSYNC

KYVE is a blockchain that validates and permanently archives chain data like dYdX blocks, block results, and state-sync snapshots.
KYVE's tool KSYNC provides the possibility to use this validated data in order to easily sync a dYdX node to any height or a dYdX full archival node, and provide decentralized dYdX snapshots.

> More information about KSYNC can be found in the [KYVE Docs](https://docs.kyve.network/access-data-sets/ksync).

This guide covers the following features:

1. Sync a node from genesis with block-sync
2. Sync to live height with state-sync
3. Sync to any arbitrary height in minutes with height-sync

Disclaimer: Please note that this integration is currently on KYVE's testnet, Kaon.

## Installation

### Install with Go (recommended)

Install the latest version with go1.22:

```bash
go install github.com/KYVENetwork/ksync/cmd/ksync@latest
```

Run `ksync version` to verify the installation.

### Install from source

You can also install from source by pulling the ksync repository and switching to the correct version and building as follows:

```bash
git clone https://github.com/KYVENetwork/ksync.git
cd ksync
git checkout tags/vx.x.x -b vx.x.x
make build
```

This will build ksync in /build directory. Afterwards, you may want to put it into your machine's PATH like as follows:

```bash
cp build/ksync ~/go/bin/ksync
```

## dYdX setup

In order to use KSYNC you just need to have dydxprotocold properly installed. First, initialize with:

```bash
dydxprotocold init <moniker> --chain-id dydx-mainnet-1
```

And install the genesis file with:

```bash
wget -O ~/.dydxprotocol/config/genesis.json https://raw.githubusercontent.com/dydxopsdao/networks/main/dydx-mainnet-1/genesis.json
```

After that KSYNC can be fully used. Note that you can find the `dydxprotocold` upgrade path [here](https://github.com/cosmos/chain-registry/blob/master/dydx/chain.json#L61) and
that you can reset everything with:

```bash
ksync reset-all --home="/home/<user>/.dydxprotocol"
```

## Sync from genesis

Syncing a node from genesis is generally recommended to ensure you have indexed the correct history and can safely validate and confirm new blocks as a validator.
You can block-sync from genesis up to live height with the blocks validated and archived by KYVE with the following command (Note that you have to use the genesis version
for dydxprotocold if you want to start syncing from genesis).

```bash
ksync block-sync --binary="/path/to/dydxprotocold" --source="dydx" --chain-id="kaon-1"
```

You can also continue the block-sync from your current height to any target height you specify with --target-height.

```bash
ksync block-sync --binary="/path/to/dydxprotocold" --source="dydx" --chain-id="kaon-1" --target-height=<height>
```

KSYNC will exit automatically once an upgrade height has been reached. To automate the process of upgrading to a newer binary version you have to setup
Cosmovisor with the upgrade history and register a systemd service. A guide on how to setup Cosmovisor with the dYdX upgrades can be found
[here](/infrastructure_providers-validators/upgrades/cosmovisor.md). Once this step has been completed the service file has to be registered.

You can create the service file with:

```bash
nano /etc/systemd/system/dydxprotocold.service
```

And add the following content to the file:

```
[Unit]
Description=KSYNC dYdX Node
After=network-online.target
[Service]
User=$USER
ExecStart=/home/$USER/go/bin/ksync block-sync --binary="/path/to/cosmovisor" --source="dydx" --chain-id="kaon-1"
Restart=always
RestartSec=3
LimitNOFILE=4096
[Install]
WantedBy=multi-user.target
```

You can reload the systemctl daemon:

```bash
sudo systemctl daemon-reload
```

Enable the service:

```bash
sudo -S systemctl enable dydxprotocold
```

And then start dydxprotocold as a service:

```bash
sudo systemctl start dydxprotocold
```

You can then check that the service is properly running with:

```bash
sudo systemctl status dydxprotocold
```

## State-Sync to live height

State-sync is a feature that allows nodes to quickly sync their state by fetching a snapshot of the application
state at a specific block height. This greatly reduces the time required for node to sync with the network,
compared to the default method of replaying all blocks from the genesis block.

First, make sure to have installed the correct `dydxprotocold` version of the target height. An upgrade path
can be found [here](https://github.com/cosmos/chain-registry/blob/master/dydx/chain.json#L61).

You can state-sync a node to the **latest available snapshot** archived by KYVE with the following command:

```bash
ksync state-sync --binary="/path/to/dydxprotocold" --source="dydx" --chain-id="kaon-1"
```

You can also state-sync a node to a **historical snapshot** with --target-height (KSYNC will use the nearest available snapshot if there is no snapshot at the exact target height):

```bash
ksync state-sync --binary="/path/to/dydxprotocold" --source="dydx" --chain-id="kaon-1" --target-height=<height>
```

After a state-sync snapshot has been successfully applied you can start the node normally or continue with KSYNC's block-sync. Note that you can only state-sync if the
node has been resetted before, to do this automatically you can append the --reset-all flag.

## Height-Sync to any historical height

With the combination of state- and block-sync KSYNC is able to sync to any specified height within minutes by first state-syncing to the nearest state-sync snapshot and
block-syncing to the target-height from there. This enables users to checkout the state of the dYdX chain at any historical height for debugging or analytical purposes.

You can height-sync a node to a specific height with the following command. Make sure to have installed the correct `dydxprotocold` version of the target height. An upgrade path
can be found [here](https://github.com/cosmos/chain-registry/blob/master/dydx/chain.json#L61).

```bash
ksync height-sync --binary="/path/to/dydxprotocold" --source="dydx" --chain-id="kaon-1" --target-height=<height>
```
