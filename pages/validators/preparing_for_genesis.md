# Preparing for Genesis

***By using, recording, referencing, or downloading (i.e., any “action”) any information contained on this page or in any dYdX Trading Inc. ("dYdX") database, you hereby and thereby agree to the [v4 Terms of Use](https://dydx.exchange/v4-terms) and [Privacy Policy](https://dydx.exchange/privacy) governing such information, and you agree that such action establishes a binding agreement between you and dYdX.***


## Goals

This document contains instructions to do the following steps:

- Initialize the node (i.e. setting up home directory)
- Set up your validator credentials
- Adding genesis accounts (i.e. creating `gentx`)
- Submit `gentx` to the mainnet repo

These are necessary steps to register your validator in the genesis and prepare for network startup.

## Timeline

See the [Mainnet Launch Schedule](https://v4-mainnet-docs.vercel.app/mainnet/schedule) for `dydx-mainnet-1`. Please make sure to submit your gentx by the deadline highlighted in the schedule.

## Get the `dydxprotocold` binary

Download the latest binaries from [dYdX Protocol Github Repo](https://github.com/dydxprotocol/v4-chain/releases).

Choose the version (e.g. `"v0.2.2"`), and binary (`linux-amd64` as example) for the corresponding platform, and set up in $PATH:

```bash
# Set the desired version
export BINARY_VERSION=<version>
# Choose a platform. Supported: linux-amd64, linux-arm64
export DYDX_PLATFORM=<platform>
tar -xvzf dydxprotocold-$BINARY_VERSION-${DYDX_PLATFORM}.tar.gz
mkdir -p "${HOME}/local/bin"
export PATH="${HOME}/local/bin:$PATH"
cp build/dydxprotocold-$BINARY_VERSION-${DYDX_PLATFORM} "${HOME}/local/bin/dydxprotocold"
rm -R build 
```

Verify the binary version:

```bash
dydxprotocold version --long
```

The output should look like this (**make sure** the `version` and `commit` is consistent):

```bash
commit: e2ea4e4ebebbe708f42d77c890214941fc2830ae
cosmos_sdk_version: v0.47.3
go: go version go1.19.9 <platform>
name: dydxprotocol
server_name: dydxprotocold
version: <version>
```

## Initialize your node

Initialize the home directory for `dydxprotocold`. **Please note:** we are using `chain-id=dydx-mainnet-1` for public mainnet.

```bash
# Use a new home directory for mainnet.
export HOME_MAINNET_1=~/.dydx-mainnet-1
# Choose a moniker as the custom username of your node. It should be human-readable.
export DYDX_MONIKER=<moniker>
# Configure chain ID.
export CHAIN_ID=dydx-mainnet-1
# Init the home directory
dydxprotocold init --chain-id=$CHAIN_ID --home=$HOME_MAINNET_1 $DYDX_MONIKER
```

## Saving/Recovering Consensus Keys

Be sure to **make a copy** of the key pair json `priv_validator_key.json` and `node_key.json` under `$HOME_MAINNET_1/config`, as these key pairs are generated during `dydxprotocold init ....` and **cannot** be recovered later unless they were explicitly derived through the mnenomics.

If you've previously created a `gentx` and are recovering your home directory, you will need to replace the default `priv_validator_key.json` and `node_key.json` files with the files backed up from above.

## Import/Create Validator Key

You could either create a new key for the mainnet, or import an existing key. 

**Option 1: Creating a New Key**

```bash
# Generate key-ring. 
# Using the `test` keyring-backend as example. 
# Feel free to choose the keyring backend as you like. 
export DYDX_KEY_NAME=<key_name>
dydxprotocold keys add $DYDX_KEY_NAME --keyring-backend test --home=$HOME_MAINNET_1
```

**Option 2: Import Via Mnemonic**

To import via mnemonic, you can do so using the following command and then input your mnemonic when prompted.

```bash
export DYDX_KEY_NAME=<key_name>
dydxprotocold keys add $DYDX_KEY_NAME --recover --keyring-backend test --home=$HOME_MAINNET_1
```

**Store validator address as envvar**

```bash
MY_VALIDATOR_ADDRESS=$(dydxprotocold keys show $DYDX_KEY_NAME -a --keyring-backend test --home=$HOME_MAINNET_1)
```

## Create `gentx`

### Add Genesis Account

Before you can create a gentx, you’ll need to add a genesis account (using the address generated above) to the `genesis.json` file. This local `genesis.json` file will not be used for the mainnet, and only helps to generate a gentx. Note that `DYDX` is the native token used for the public mainnet.

```bash
dydxprotocold add-genesis-account $MY_VALIDATOR_ADDRESS 1000000000000000000000DYDX --home=$HOME_MAINNET_1
```

### Generate `gentx`

Use `gentx` command to create your genesis transaction in `$HOME_MAINNET_1/gentx/`.

You can also use the below optional flags:

```bash
  --website="xxx" \
  --details="xxx" \
  --identity="xxx" \
  --pubkey="xxx"
```

```bash
dydxprotocold gentx $DYDX_KEY_NAME 1000000000000000000000DYDX --moniker $DYDX_MONIKER --keyring-backend test --chain-id $CHAIN_ID --home=$HOME_MAINNET_1
```

It will output something similar to:

```bash
Genesis transaction written to "/Users/XXX/.dydx-mainnet-1/config/gentx/gentx-ae8a1fd5828866c435f9b559fad39e1bc19a06dc.json"
```

See [here](https://github.com/dydxprotocol/v4-testnets/blob/main/dydx-testnet-3/gentx/gentx-dydx-1.json) for an example gentx file.

<aside>
💡 Do not manually modify the content of generated `gentx` file (except for filename). This will result in invalid signature for transaction.

</aside>

<aside>
💡 We have a GitHub workflow that validates the submitted `gentx` file. Please verify the content of your `gentx` file if validation fails.

</aside>

## Submit Your `gentx`

1. Clone the [Mainnet Github Repo](https://github.com/dydxopsdao/networks).

```bash
git clone https://github.com/dydxopsdao/networks.git
```

2. Create a new local branch:

```bash
git checkout -b $DYDX_MONIKER/gentx
```

3. Copy the gentx file to the `v4-mainnets` repo (ensure that it is in the correct folder)

```bash
cp $HOME_MAINNET_1/config/gentx/gentx-xxxxxxxxxxxx.json v4-mainnets/dydx-mainnet-1/gentx/gentx-$DYDX_MONIKER.json
```

4. Commit and push to your repo.

```bash
git add dydx-mainnet-1/gentx/*
git commit -m "$DYDX_MONIKER gentx"
git push origin $DYDX_MONIKER/gentx
```

5. Create a pull request from your branch into `main`

6. The pull request should trigger a "Validate Genesis" workflow, which runs some sanity checks on the submitted `gentx`. Please try to resolve any issue if the workflow doesn't pass, and post in `#ext-dydx-v4-validators-discussion` if you need help.

## Changelog
2023-09-27: cloned from [dYdX Testnets Teacher](https://github.com/dydxprotocol/v4-documentation) and modified for `dydx-mainnet-1`