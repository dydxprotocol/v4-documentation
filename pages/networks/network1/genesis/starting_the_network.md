# Starting the network

***By using, recording, referencing, or downloading (i.e., any “action”) any information contained on this page or in any dYdX Trading Inc. ("dYdX") database, you hereby and thereby agree to the [v4 Terms of Use](https://dydx.exchange/v4-terms) and [Privacy Policy](https://dydx.exchange/privacy) governing such information, and you agree that such action establishes a binding agreement between you and dYdX.***


## Downloading `genesis.json`

After the `gentx` collection process is complete, the dYdX team will announce in the `#v-dydx-public-testnet-updates` channel that the finalized `genesis.json` file is ready for download.

Download `genesis.json` file into `$HOME_TESTNET_4` , replacing the previous `genesis.json` file:

```bash
# Run at root of `v4-testnets`.
export HOME_TESTNET_4=<your dir>
git checkout main
git pull origin main
cp dydx-testnet-4/genesis.json $HOME_TESTNET_4/config/genesis.json
```

Feel free to inspect the content of the `genesis.json` file, and let us know if there’s any questions/concerns.

## Get Latest Binary

💡💡💡 We have published a newer `v0.4.0` binary ([link](https://github.com/dydxprotocol/v4-chain/releases/tag/protocol%2Fv0.4.0)) in our now public repository `dydxprotocol/v4-chain`. This is different from the binary used for `gentx` submission process. Please make ensure you use this newer binary to avoid consensus failure. 💡💡💡

```bash
export BINARY_VERSION="v0.4.0"
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

The output should look like this (**make sure** the `version` and `commit` is correct):

```bash
commit: a814748dfb39dc70302becbca95c19606e3bab8e
cosmos_sdk_version: v0.47.3
go: go version go1.19.9 <platform>
name: dydxprotocol
server_name: dydxprotocold
version: 0.4.0
```

## [💡💡💡IMPORTANT:💡💡💡] Verify Config

See [this requirement section](../../../validators/required_node_configs.md) to correctly configure the node.

In `$HOME_TESTNET_4/config/config.toml`, check that `timeout_commit` value under  is equal to
```
timeout_commit = "500ms"
```

In `$HOME_TESTNET_4/config/app.toml`, update the `minium-gas-prices` variable to accept `adv4tnt` (`1e-18 dv4tnt`):
```
minimum-gas-prices = "0.025ibc/8E27BA2D5493AF5636760E354E46004562C46AB7EC0CC4C1CA14E9E20E2545B5,25000000000adv4tnt"
```

In `$HOME_TESTNET_4/config/app.toml`, enable grpc. The Cosmos gRPC service is used by various daemon processes, and **must be enabled** in order for the protocol to operate:
```
[grpc]

# Enable defines if the gRPC server should be enabled.
enable = true
```

In addition, non-standard gRPC ports are not supported at this time. Please run on port 9090, which is the default
port specified in the config file:

```
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

💡💡💡The testnet genesis is **17:00 UTC (13:00 ET), Tuesday 10/17/2023.** Please complete the following instructions by this time.💡💡💡

### Option 1: Run `dydxprotocold` Directly

Run `dydxprotocold` and connect to the seed node. The seed node info can be found [here](../resources.md#seed-nodes):

```bash
dydxprotocold start --p2p.seeds="<comma separated seed nodes>" --home="$HOME_TESTNET_4" --bridge-daemon-eth-rpc-endpoint="<eth rpc endpoint>"
```

**Note:** the seed node IP for testnet #3 is different from testnet #2.

### Option 2: Run `dydxprotocold` with `cosmovisor`

Install and initialize `cosmovisor` with instructions [here](../../../validators/cosmovisor.md). To make sure `cosmovisor` is initialized with the correct binary, run the following to binary version:

```bash
cosmovisor run version --long
```

The output should look like this (**make sure** the `version` is consistent):

```bash
commit: a814748dfb39dc70302becbca95c19606e3bab8e
cosmos_sdk_version: v0.47.3
go: go version go1.19.9 <platform>
name: dydxprotocol
server_name: dydxprotocold
version: 0.4.0
```

Run `dydxprotocold` with `cosmovisor` and connect to the seed node.

```bash
cosmovisor run start --p2p.seeds="<comma separated seed nodes>" --home="$HOME_TESTNET_4" --bridge-daemon-eth-rpc-endpoint="<eth rpc endpoint>"
```

### Backup: Start the network with Persistent Peers

<aside>
💡 The seed node should be sufficient for public testnet startup. However, if for any reason you’re seeing network issues (can troubleshoot at `localhost:26657/net_info`), you can also add the following flag to use the dYdX internal validators as persistent peers:

`—p2p.persistent_peers="TODO”`

</aside>

Validators are also encouraged to share their IPs in #v-dydx-public-testnet-discussion and use each other as persistent peers. Each p2p.persistent_peers are separated by comma and use the format `<node_id>@<public_ip_address>:<port>`.

To find your node id, run

```protobuf
dydxprotocold tendermint show-node-id
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
