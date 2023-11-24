# Starting the network

***By using, recording, referencing, or downloading (i.e., any “action”) any information contained on this page or in any dYdX Operations Services Ltd. ("dYdX Operations subDAO") database, you hereby and thereby agree to the [dYdX Chain Docs Terms of Use](../../../terms_and_policies/terms_of_use) governing such information, and you agree that such action establishes a binding agreement between you and dYdX Operations subDAO.***


## Downloading `genesis.json`

After the `gentx` collection process is complete, the dYdX Operations subDAO team will announce in the `#ext-dydx-v4-validators-updates` channel that the finalized `genesis.json` file is ready for download.

Download `genesis.json` file into `$HOME/.dydxprotocol`, replacing the previous `genesis.json` file:

```bash
curl -Ls https://raw.githubusercontent.com/dydxopsdao/networks/main/dydx-mainnet-1/genesis.json > $HOME/.dydxprotocol/config/genesis.json
```

Feel free to inspect the content of the `genesis.json` file, and let us know if there’s any questions/concerns.


## Get Latest Binary

The network launch binary is available at [dYdX Protocol repository](https://github.com/dydxprotocol/v4-chain/releases)

```bash
# Set the correct version, e.g. "v1.0.0"
export BINARY_VERSION=<version>
# Choose a platform. Supported: linux-amd64, linux-arm64
export DYDX_PLATFORM="linux-amd64"
curl -LO https://github.com/dydxprotocol/v4-chain/releases/download/protocol%2F$BINARY_VERSION/dydxprotocold-$BINARY_VERSION-$DYDX_PLATFORM.tar.gz
```

Put binary under `$PATH`:

```bash
tar -xvzf dydxprotocold-$BINARY_VERSION-${DYDX_PLATFORM}.tar.gz
mkdir -p "${HOME}/local/bin"
export PATH="${HOME}/local/bin:$PATH"
cp build/dydxprotocold-$BINARY_VERSION-${DYDX_PLATFORM} "${HOME}/local/bin/dydxprotocold"
rm -R build
```

Check that the binary version is correct:

```bash
dydxprotocold version --long
```

The output should look like this (**make sure** the `version` and `commit` are consistent):

```bash
commit: bd3ff30248d271719c687cc10159de479fdd904d
cosmos_sdk_version: v0.47.4
go: go version go1.21.3 <platform>
name: dydxprotocol
server_name: dydxprotocold
version: 1.0.0
```

## [💡💡💡IMPORTANT:💡💡💡] Verify Config

See [this requirement section](../../../validators/required_node_configs.md) to correctly configure the node.

### config.toml ###

#### Timeout Commit

Please check that `timeout_commit` value under `$HOME/.dydxprotocol/config/config.toml` is equal to
```
timeout_commit = "500ms"
```

#### Add Seed Nodes

Seed nodes are how the nodes within the network communicate. Adding them ensures nodes have healthy peers.

You can find a list of seed nodes [here](../resources#seed-nodes)

```bash
seeds="<comma separated seed nodes>"
sed -i -e "s|^seeds *=.*|seeds = \"$seeds\"|" $HOME/.dydxprotocol/config/config.toml
```

### app.toml ###

#### Minimum Gas Price

Setting a known minimum gas price ensures interacting with the network is consistent and reliable. The minumum gas prices **must be set** for USDC and DYDX. Please make sure the `minimum-gas-prices` parameter is configured with 
the correct *denoms* in `$HOME/.dydxprotocol/config/app.toml`. The price itself is up to each validator, we suggest the 
following initial values (both gas prices are represented in `Xe-18` full coin)

```bash
sed -i -e "s|^minimum-gas-prices *=.*|minimum-gas-prices = \"0.025ibc/8E27BA2D5493AF5636760E354E46004562C46AB7EC0CC4C1CA14E9E20E2545B5,12500000000adydx\"|" $HOME/.dydxprotocol/config/app.toml
```

#### Enable gRPC

The Cosmos gRPC service is used by various daemon processes, and **must be enabled** in order for the protocol to operate.
Please make sure that grpc is enabled in `$HOME/.dydxprotocol/config/app.toml`:
```toml
[grpc]

# Enable defines if the gRPC server should be enabled.
enable = true
```

In addition, non-standard gRPC ports are not supported at this time. Please run on port 9090, which is the default
port specified in the config file:
```toml
[grpc]

...

# Address defines the gRPC server address to bind to.
address = "0.0.0.0:9090"
```

**Note** that grpc can be also be configured via start flags. Be careful not to change the default settings with either
of the following flags: `--grpc.enable`, `--grpc.address`.

## [💡💡💡IMPORTANT:💡💡💡] Configure Ethereum RPC Endpoint

See [this requirement section](../../../validators/required_node_configs.md#ethereum-rpc-endpoint) to correctly configure the Ethereum RPC endpoint.

## Starting the Node

💡💡💡Please complete the following instructions before the mainnet genesis timestamp.💡💡💡

### Option 1: Run `dydxprotocold` Directly

Run `dydxprotocold` and connect to the seed node. The seed node info can be found in [Mainnet Info](../resources#seed-nodes):

```bash
dydxprotocold start --p2p.seeds="<comma separated seed nodes>" --home $HOME/.dydxprotocol --bridge-daemon-eth-rpc-endpoint="<eth rpc endpoint>"
```

### Option 2: Run `dydxprotocold` with `cosmovisor`

Install and initialize `cosmovisor` with instructions [here](../../../validators/upgrades/cosmovisor.md). To make sure `cosmovisor` is initialized with the correct binary, run the following to binary version:

```bash
cosmovisor run version --long
```

The output should look like this (**make sure** the `version` and `commit` are consistent):

```bash
commit: bd3ff30248d271719c687cc10159de479fdd904d
cosmos_sdk_version: v0.47.4
go: go version go1.21.3 <platform>
name: dydxprotocol
server_name: dydxprotocold
version: 1.0.0
```

Run `dydxprotocold` with `cosmovisor` and connect to the seed node.

```bash
cosmovisor run start --p2p.seeds="<comma separated seed nodes>" --home $HOME/.dydxprotocol --bridge-daemon-eth-rpc-endpoint="<eth rpc endpoint>"
```

### Announcing yourself and cooperating with others

<aside>
💡 The seed node should be sufficient for network startup. However, if for any reason you’re seeing network issues (can troubleshoot at `localhost:26657/net_info`), you can also add the following flag to use the dYdX internal validators as persistent peers:

`—p2p.persistent_peers="<list of persistent peers>”`

</aside>

Validators are also encouraged to share their IPs in #ext-dydx-v4-validators-discussion and use each other as persistent peers. Each p2p.persistent_peers are separated by comma and use the format `<node_id>@<public_ip_address>:<port>`.

To find your peer information, run

```protobuf
echo $(dydxprotocold tendermint show-node-id)@$(curl ifconfig.me):26656
```

### Sanity Check

Once the binary is started, you should see the following line:

```bash
This node is a validator                  module=consensus addr=xxxxxxxxxx
```

If you see `This node is not a validator` instead, please let us know.

You should also see that the binary is sleeping until genesis time:

```bash
Genesis time is in the future. Sleeping until then...
```

While the binary is sleeping, some occasional errors from the price daemon are expected. If you see any critical error (e.g. the app is crashing), please let us know.

### Checking Node Status (After Genesis Time)

Tendermint RPC ([documentation](https://docs.tendermint.com/v0.34/rpc/#/)) provides a REST-like interface for querying the status node. To access this interface, you can execute the following command on your local machine: **`curl localhost:26657/<uri>`**. Alternatively, you can access it via a web browser by navigating to **`<public_ip_address>:26657`** . Note that this can only be accessed **after the genesis time** when the node wakes up. Some useful links:

```bash
# Check your node block height
curl localhost:26657/status
# Check network connection
curl localhost:26657/net_info
# Query info about application state
curl localhost:26657/abci_info
```

Additionally, the `dydxprotocold` binary inherits most of the standard Cosmos SDK modules which can be queried.

To see the current validator active set:

```bash
dydxprotocold query staking validator <validator_address>
```

Example:

```bash
dydxprotocold query staking validator dydxvaloper199tqg4wdlnu4qjlxchpd7seg454937hjxg9yhy
```

To track your validator’s signing history:

```bash
dydxprotocold query slashing signing-info $(dydxprotocold tendermint show-validator)
```
