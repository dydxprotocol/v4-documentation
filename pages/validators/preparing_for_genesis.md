# Preparing for Genesis

***By using, recording, referencing, or downloading (i.e., any “action”) any information contained on this page or in any dYdX Trading Inc. ("dYdX") database, you hereby and thereby agree to the [v4 Terms of Use](https://dydx.exchange/v4-terms) and [Privacy Policy](https://dydx.exchange/privacy) governing such information, and you agree that such action establishes a binding agreement between you and dYdX.***

***Update 9/1/2023***: the following has been updated for the 3rd public testnet `dydx-testnet-3` scheduled to launch on 9/12/2023.

## For Existing Validators of `dydx-testnet-2`
The current testnet `dydx-testnet-2` will be turned down on 9/11/2023 and the next testnet `dydx-testnet-3` will launch on 9/12/2023. If you plan to use the same machine instance for both networks, please make sure you create **a separate home directory** for `dydx-testnet-3`. When running any command with `dydxprotocold`, please explicitly pass in `--home=<directory_of_your_choice>` and `--chain-id=dydx-testnet-3` to specify which network the command is intended for. Alternatively, you are also welcomed to use a separate machine for `dydx-testnet-3`


## Goals

This document contains instructions to do the following steps:

- Initialize the node (i.e. setting up home directory)
- Set up your validator credentials
- Adding genesis accounts (i.e. creating `gentx`)
- Submit `gentx` to the testnet repo

These are necessary steps to register your validator in the genesis and prepare for network startup.

## Timeline

See the [Testnet Launch Schedule](https://v4-teacher.vercel.app/testnets/schedule) for `dydx-testnet-3`. Please make sure to submit your gentx by the deadline highlighted in the schedule.

## Prerequisites

### Get Access to the Public Testnet Repo

**Please note:** Testnet #3 is coordinated in the new public repo [dydxopsdao/networks](https://github.com/dydxopsdao/networks).

## Get the `dydxprotocold` binary

// TODO: are we asking validators to build directly?
Download the binaries at [Public Testnet Github Repo](https://github.com/dydxopsdao/networks/tree/main/dydx-testnet-3/binaries). If you’ve previously cloned the `dydxprotocol/networks` repo, make sure to pull the latest from `main` .

```bash
export BINARY_VERSION="v0.2.0-rc1"
git clone git@github.com:dydxprotocol/networks.git
cd networks
git checkout main
git pull origin main
ls dydx-testnet-3/binaries/$BINARY_VERSION
```

Choose the binary for the corresponding platform, and set up in $PATH (using `linux-amd64` as example):

```bash
# Choose a platform. Supported: linux-amd64, linux-arm64
export DYDX_PLATFORM=<platform>
tar -xvzf dydx-testnet-3/binaries/$BINARY_VERSION/dydxprotocold-$BINARY_VERSION-${DYDX_PLATFORM}.tar.gz
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
version: 0.2.0-rc1
```

**Note:** We may release a newer binary for the actual network launch for `dydx-testnet-3`. Please stay tuned for updates in the Slack channels.

## Initialize your node

Initialize the home directory for `dydxprotocold`. Note we are using `chain-id=dydx-testnet-3` for public testnet #3.

```bash
# Use a new home directory for testnet 3.
export HOME_TESTNET_3=~/.dydx-testnet-3
# Choose a moniker as the custom username of your node. It should be human-readable.
export DYDX_MONIKER=<moniker>
# Configure chain ID.
export CHAIN_ID=dydx-testnet-3
# Init the home directory
dydxprotocold init --chain-id=$CHAIN_ID --home=$HOME_TESTNET_3 $DYDX_MONIKER
```

## Saving/Recovering Consensus Keys

Be sure to **make a copy** of the key pair json `priv_validator_key.json` and `node_key.json` under `$HOME_TESTNET_3/config`, as these key pairs are generated during `dydxprotocold init ....` and **cannot** be recovered later unless they were explicitly derived through the mnenomics.

If you've previously created a `gentx` and are recovering your home directory, you will need to replace the default `priv_validator_key.json` and `node_key.json` files with the files backed up from above.

## Import/Create Validator Key

You could either create a new key for the testnet, or import existing an existing key. 

**Option 1: Creating a New Key**

```bash
# Generate key-ring. 
# Using the `test` keyring-backend as example. 
# Feel free to choose the keyring backend as you like. 
export DYDX_KEY_NAME=<key_name>
dydxprotocold keys add $DYDX_KEY_NAME --keyring-backend test --home=$HOME_TESTNET_3
```

**Option 2: Import Via Mnemonic**

To import via mnemonic, you can do so using the following command and then input your mnemonic when prompted.

```bash
export DYDX_KEY_NAME=<key_name>
dydxprotocold keys add $DYDX_KEY_NAME --recover --keyring-backend test --home=$HOME_TESTNET_3
```

**Store validator address as envvar**

```bash
MY_VALIDATOR_ADDRESS=$(dydxprotocold keys show $DYDX_KEY_NAME -a --keyring-backend test --home=$HOME_TESTNET_3)
```

## Create `gentx`

### Add Genesis Account

Before you can create a gentx, you’ll need to add a genesis account (using the address generated above) to the `genesis.json` file. This local `genesis.json` file will not be used for the testnet, and only helps to generate a gentx. Note that `dv4tnt` is the native token used for the public testnet.

```bash
dydxprotocold add-genesis-account $MY_VALIDATOR_ADDRESS 100000000000dv4tnt --home=$HOME_TESTNET_3
```

### Generate `gentx`

Use `gentx` command to create your genesis transaction in `$HOME_TESTNET_3/gentx/`.

You can also use the below optional flags:

```bash
  --website="xxx" \
  --details="xxx" \
  --identity="xxx" \
  --pubkey="xxx"
```

```bash
dydxprotocold gentx $DYDX_KEY_NAME 50000000000dv4tnt --moniker $DYDX_MONIKER --keyring-backend test --chain-id $CHAIN_ID --home=$HOME_TESTNET_3
```

It will output something similar to:

```bash
Genesis transaction written to "/Users/XXX/.dydx-testnet-3/config/gentx/gentx-ae8a1fd5828866c435f9b559fad39e1bc19a06dc.json"
```

See [here](https://github.com/dydxopsdao/networks/blob/main/dydx-testnet-3/gentx/gentx-dydx-1.json) for an example gentx file.

<aside>
💡 Do not manually modify the content of generated `gentx` file (except for filename). This will result in invalid signature for transaction.

</aside>

<aside>
💡 We have a GitHub workflow that validates the submitted `gentx` file. Please verify the content of your `gentx` file if validation fails.

</aside>

## Submit Your `gentx`

1. Clone the [Public Testnet Github Repo](https://github.com/dydxopsdao/networks).

```bash
git clone https://github.com/dydxopsdao/networks.git
```

2. Create a new local branch:

```bash
git checkout -b $DYDX_MONIKER/gentx
```

3. Copy the gentx file to the `networks` repo (ensure that it is in the correct folder)

```bash
cp $HOME_TESTNET_3/config/gentx/gentx-xxxxxxxxxxxx.json networks/dydx-testnet-3/gentx/gentx-$DYDX_MONIKER.json
```

4. Commit and push to your repo.

```bash
git add dydx-testnet-3/gentx/*
git commit -m "$DYDX_MONIKER gentx"
git push origin $DYDX_MONIKER/gentx
```

5. Create a pull request from your branch into `main`

6. The pull request should trigger a "Validate Genesis" workflow, which runs some sanity checks on the submitted `gentx`. Please try to resolve any issue if the workflow doesn't pass, and post in `#v-dydx-public-testnet-discussion` if you need help.

## Changelog
8/3/2023: updated for the second public testnet `dydx-testnet-2`
9/1/2023: updated for the third public testnet `dydx-testnet-3`.