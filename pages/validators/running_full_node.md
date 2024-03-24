# Running a full node
## Install Go
At this time, node software best supports `go 1.21.x`
```bash
# Fetch compressed go archive
# NOTE: Please double check your system architecture before installing. This example command is for amd64.
wget https://golang.org/dl/go1.21.1.linux-amd64.tar.gz

# Extract go archive
sudo tar -C /usr/local -xzf go1.21.1.linux-amd64.tar.gz

# Add go to your $PATH
echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.bashrc

# Remove archive
rm go1.21.1.linux-amd64.tar.gz

# Update source
source ~/.bashrc
```

## Install Cosmovisor
```bash
go install github.com/cosmos/cosmos-sdk/cosmovisor/cmd/cosmovisor@latest
```

## Install Node Software
* Visit https://github.com/dydxprotocol/v4-chain/releases
* Fetch the latest release that is **not** `Draft/Pre-release`
  * As of March 15 2024, that would be `protocol v4.0.0-rc4`
* Download the relevant asset (`amd64 or arm64`) based on your computer architecture.
* Extract the binary from the .zip file
```bash
# Extract binary from archive
tar -xvzf dydxprotocold-v4.0.0-rc4-linux-amd64.tar.gz

# Enter build
cd build

# Move the binary to a directory already in your PATH (e.g., /usr/local/bin)
sudo mv dydxprotocold-v4.0.0-rc4-linux-amd64 usr/local/bin/dydxprotocold

# Update source
source ~/.bashrc
```

### Alternative: build from source (optional)
Please note the latest release's tag and checkout that version.
```bash
git clone https://github.com/dydxprotocol/v4-chain dydx
cd dydx/protocol
git checkout releases/protocol/v4.0.0-rc4
make install
```

## Save your Chain ID in `dydxprotocold` config

Save the [chain-id](../network/network_constants.md#chain-id). This will make it so you do not have to manually pass in the chain-id flag for every CLI command.

```bash
# If using the downloaded archive
dydxprotocold init dydx --chain-id $CHAIN_ID

# If building from source
dydxprotocold config chain-id $CHAIN_ID
```

## Integrating a Snapshot
It is much faster to get your full node synced by using a snapshot service.

Please see the list of available [snapshot services](../network/resources.md#snapshot-service). We recommend following the snapshot service's instructions to get started.

## Start a Full Node

Find the seed node's ID and the IP address from [Resources](../network/resources.md#seed-nodes). Then, run the following command to start a non-validating full node.

For example,
```bash
dydxprotocold start --p2p.seeds="..." --bridge-daemon-eth-rpc-endpoint="<eth rpc endpoint>" --non-validating-full-node=true
```

💡**Note**: if you want to disable gRPC on your full node, it is important to start the node with the
`--non-validating-full-node=true` flag. Otherwise, the application will require that gRPC be enabled.

## Prepare for an upgrade
TODO!

# Full Node Configuration
TODO!