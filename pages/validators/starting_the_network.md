# Starting the network

***By using, recording, referencing, or downloading (i.e., any “action”) any information contained on this page or in any dYdX Trading Inc. ("dYdX") database, you hereby and thereby agree to the [v4 Terms of Use](https://dydx.exchange/v4-terms) and [Privacy Policy](https://dydx.exchange/privacy) governing such information, and you agree that such action establishes a binding agreement between you and dYdX.***

## Timeline

See `dydx-mainnet-1` [Launch Schedule](https://v4-mainnet-docs.vercel.app/mainnet/schedule). Please complete the following instructions by the scheduled time for `Network Launch`.

## Downloading `genesis.json`

After the `gentx` collection process is complete, the dYdX Operations subDAO team will announce in the `#ext-dydx-v4-validators-updates` channel that the finalized `genesis.json` file is ready for download. 

Download `genesis.json` file into `$HOME_MAINNET_1` , replacing the previous `genesis.json` file:

```bash
# Run at root of `networks`.
export HOME_MAINNET_1=<your dir>
git checkout main
git pull origin main
cp dydx-mainnet-1/genesis.json $HOME_MAINNET_1/config/genesis.json
```

Feel free to inspect the content of the `genesis.json` file, and let us know if there’s any questions/concerns.

## Get Latest Binary

The network launch binary should be available in the [dYdX Protocol repository](https://github.com/dydxprotocol/v4-chain/releases)

```bash
# Set the correct version, e.g. "v0.2.1"
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

The output should look like this (**make sure** the `version` and `commit` is correct):

```bash
commit: df7ab1ad4e2feae1f958d50b67ee76851ea3e986
cosmos_sdk_version: v0.47.3
go: go version go1.19.9 <platform>
name: dydxprotocol
server_name: dydxprotocold
version: <version>
```

The Cosmos gRPC service is used by various daemon processes, and **must be enabled** in order for the protocol to operate.
Please make sure that grpc is enabled in `$HOME_MAINNET_1/config/app.toml`:
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

## Ethereum RPC Endpoint

For the chain to process bridge transactions from Ethereum, Ethereum testnet, or other chain that supports the `eth_getLogs` RPC method, the bridge daemon queries an RPC endpoint for logs emitted by the bridge contract. By default, a node will use a public testnet endpoint that may have rate-limiting, low reliability, or other restricted functionality.

For your node to successfully ingest bridge transactions from the relevant blockchain, you should use your own private RPC endpoint and override the default by adding flag `--bridge-daemon-eth-rpc-endpoint <YOUR_PRIVATE_RPC_ENDPOINT>` to the command you run when starting the node.

💡IMPORTANT💡:The RPC endpoint you choose *MUST* satisfy the following requirements
* supports `eth_chainId` method
* supports `eth_getLogs` method
    * supports `"finalized"` as an input to `toBlock` parameter (for example Alchemy supports this while Blast doesn't)

## Starting the Node

💡💡💡Please complete the following instructions before the mainnet genesis timestamp.💡💡💡

### Option 1: Run `dydxprotocold` Directly

Run `dydxprotocold` and connect to the seed node:

```bash
dydxprotocold start --p2p.seeds="TBD" --home="$HOME_MAINNET_1"
```

### Option 2: Run `dydxprotocold` with `cosmovisor`

Install and initialize `cosmovisor` with instructions [here](https://v4-mainnet-docs.vercel.app/validators/cosmovisor). To make sure `cosmovisor` is initialized with the correct binary, run the following to binary version:

```bash
cosmovisor run version --long
```

The output should look like this (**make sure** the `version` is consistent):

```bash
commit: df7ab1ad4e2feae1f958d50b67ee76851ea3e986
cosmos_sdk_version: v0.47.3
go: go version go1.19.9 <platform>
name: dydxprotocol
server_name: dydxprotocold
version: <version>
```

Run `dydxprotocold` with `cosmovisor` and connect to the seed node. 

```bash
cosmovisor run start --p2p.seeds="TBD" --home="$HOME_MAINNET_1"
```

### Announcing yourself and cooperating with others

Validators are also encouraged to share their IPs in #ext-dydx-v4-validators-discussion and use each other as persistent peers. Each p2p.persistent_peers are separated by comma and use the format `<node_id>@<public_ip_address>:<port>`.

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
