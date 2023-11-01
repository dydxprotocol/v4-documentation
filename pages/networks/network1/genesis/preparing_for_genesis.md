# Preparing for Genesis

***By using, recording, referencing, or downloading (i.e., any “action”) any information contained on this page or in any dYdX Trading Inc. ("dYdX") database, you hereby and thereby agree to the [v4 Terms of Use](https://dydx.exchange/v4-terms) and [Privacy Policy](https://dydx.exchange/privacy) governing such information, and you agree that such action establishes a binding agreement between you and dYdX.***

***Update 10/10/2023***: the following has been updated for `dydx-testnet-4`.

***Update 9/1/2023***: the following has been updated for the 3rd public testnet `dydx-testnet-3`.

## For Existing Validators for the current testnet
The current testnet `dydx-testnet-3` will be turned down on 10/16/2023 and the next testnet `dydx-testnet-4` will launch on 10/17/2023. If you plan to use the same machine instance for both networks, please make sure you create **a separate home directory** for `dydx-testnet-4`. When running any command with `dydxprotocold`, please explicitly pass in `--home=<directory_of_your_choice>` and `--chain-id=dydx-testnet-4` to specify which network the command is intended for. Alternatively, you are also welcomed to use a separate machine for `dydx-testnet-4`

## Goals

This document contains instructions to do the following steps:

- Initialize the node (i.e. setting up home directory)
- Set up your validator credentials
- Adding genesis accounts (i.e. creating `gentx`)
- Submit `gentx` to the testnet repo

These are necessary steps to register your validator in the genesis and prepare for network startup.

## Get the Latest `dydxprotocold` Binary

Download the latest release binaries from [dydxprotocol/v4-chain releases](https://github.com/dydxprotocol/v4-chain/releases), which is `v0.3.6` [here](https://github.com/dydxprotocol/v4-chain/releases/tag/protocol%2Fv0.3.6)

Choose the binary for the corresponding platform, and set up in $PATH (using `linux-amd64` as example):

```bash
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
commit: 6ed30700011e4d4433272286afaed1465ae71dc3
cosmos_sdk_version: v0.47.3
go: go version go1.19.9 <platform>
name: dydxprotocol
server_name: dydxprotocold
version: 0.3.6
```

**Note:** We will release a newer binary for the actual network launch for `dydx-testnet-4`. Please stay tuned for updates in the Slack channels.

## Initialize Your Node

Initialize the home directory for `dydxprotocold`. **Please note:** we are using `chain-id=dydx-testnet-4` for public testnet #4.

```bash
# Use a new home directory for testnet 4.
export HOME_TESTNET_4=~/.dydx-testnet-4
# Choose a moniker as the custom username of your node. It should be human-readable.
export DYDX_MONIKER=<moniker>
# Configure chain ID.
export CHAIN_ID=dydx-testnet-4
# Init the home directory
dydxprotocold init --chain-id=$CHAIN_ID --home=$HOME_TESTNET_4 $DYDX_MONIKER
```

## Saving/Recovering Consensus Keys

Be sure to **make a copy** of the key pair json `priv_validator_key.json` and `node_key.json` under `$HOME_TESTNET_4/config`, as these key pairs are generated during `dydxprotocold init ....` and **cannot** be recovered later unless they were explicitly derived through the mnenomics.

If you've previously created a `gentx` and are recovering your home directory, you will need to replace the default `priv_validator_key.json` and `node_key.json` files with the files backed up from above.

## Import/Create Validator Key

You could either create a new key for the testnet, or import existing an existing key. 

**Option 1: Creating a New Key**

```bash
# Generate key-ring. 
# Using the `test` keyring-backend as example. 
# Feel free to choose the keyring backend as you like. 
export DYDX_KEY_NAME=<key_name>
dydxprotocold keys add $DYDX_KEY_NAME --keyring-backend test --home=$HOME_TESTNET_4
```

**Option 2: Import Via Mnemonic**

To import via mnemonic, you can do so using the following command and then input your mnemonic when prompted.

```bash
export DYDX_KEY_NAME=<key_name>
dydxprotocold keys add $DYDX_KEY_NAME --recover --keyring-backend test --home=$HOME_TESTNET_4
```

**Store validator address as envvar**

```bash
MY_VALIDATOR_ADDRESS=$(dydxprotocold keys show $DYDX_KEY_NAME -a --keyring-backend test --home=$HOME_TESTNET_4)
```

## Create `gentx`

### Add Genesis Account

Before you can create a gentx, you’ll need to add a genesis account (using the address generated above) to the `genesis.json` file. This local `genesis.json` file will not be used for the testnet, and only helps to generate a gentx. Note that `dv4tnt` is the native token used for the public testnet.

```bash
dydxprotocold add-genesis-account $MY_VALIDATOR_ADDRESS 1000000000000000000000000adv4tnt --home=$HOME_TESTNET_4
```

### Generate `gentx`

Use `gentx` command to create your genesis transaction in `$HOME_TESTNET_4/gentx/`.

You can also use the below optional flags:

```bash
  --website="xxx" \
  --details="xxx" \
  --identity="xxx" \
  --pubkey="xxx"
```

```bash
dydxprotocold gentx $DYDX_KEY_NAME 500000000000000000000000adv4tnt --moniker $DYDX_MONIKER --keyring-backend test --chain-id $CHAIN_ID --home=$HOME_TESTNET_4
```

It will output something similar to:

```bash
Genesis transaction written to "/Users/XXX/.dydx-testnet-4/config/gentx/gentx-ae8a1fd5828866c435f9b559fad39e1bc19a06dc.json"
```

See [here](https://github.com/dydxprotocol/v4-testnets/blob/main/dydx-testnet-4/gentx/gentx-dydx-1.json) for an example gentx file.

<aside>
💡 Do not manually modify the content of generated `gentx` file (except for filename). This will result in invalid signature for transaction.

</aside>

<aside>
💡 We have a GitHub workflow that validates the submitted `gentx` file. Please verify the content of your `gentx` file if validation fails.

</aside>

## Submit Your `gentx`

1. Fork the Public Testnet Github Repo ([dydxprotocol/v4-testnets](https://github.com/dydxprotocol/v4-testnets)).
 
2. Clone the forked repo.

```bash
git clone https://github.com/<your username or organization>/v4-testnets.git
```

3. Create a new local branch:

```bash
git checkout -b $DYDX_MONIKER/gentx
```

4. Copy the gentx file to the forked `v4-testnets` repo (ensure that it is in the correct folder)

```bash
cp $HOME_TESTNET_4/config/gentx/gentx-xxxxxxxxxxxx.json v4-testnets/dydx-testnet-4/gentx/gentx-$DYDX_MONIKER.json
```

5. Commit and push to your repo.

```bash
git add dydx-testnet-4/gentx/*
git commit -m "$DYDX_MONIKER gentx"
git push origin $DYDX_MONIKER/gentx
```

6. Create a pull request in the original `dydxprotocol/v4-testnets` repo. In other words, the `base repository` should be `dydxprotocol/v4-testnets` and the `base` branch should be `main`. 

7. Maintainers will review and merge the PRs. If you need any help, post in `#v-dydx-public-testnet-discussion`.

## Changelog
8/3/2023: updated for the second public testnet `dydx-testnet-2`

9/1/2023: updated for the third public testnet `dydx-testnet-3`

10/10/2023: updated for the third public testnet `dydx-testnet-4`
