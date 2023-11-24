# Preparing for Genesis

***By using, recording, referencing, or downloading (i.e., any “action”) any information contained on this page or in any dYdX Operations Services Ltd. ("dYdX Operations subDAO") database, you hereby and thereby agree to the [dYdX Chain Docs Terms of Use](../../../terms_and_policies/terms_of_use) governing such information, and you agree that such action establishes a binding agreement between you and dYdX Operations subDAO.***


## Goals

This document contains instructions to do the following steps:

- Initialize the node (i.e. setting up home directory)
- Set up your validator credentials
- Adding genesis accounts (i.e. creating `gentx`)
- Submit `gentx` to the mainnet repo

These are necessary steps to register your validator in the genesis and prepare for network startup.


## Preparing `DYDX` for self-delegation

To participate in the potential Genesis process, there is a requirement for genesis Validators to self-delegate `DYDX` tokens, which necessitates locking `DYDX` on Ethereum ([Blogpost 1](https://www.dydx.foundation/blog/exploring-the-future-of-dydx), [Blogpost 2](https://www.dydx.foundation/blog/update-on-exploring-the-future-of-dydx), [Community Docs](https://docs.dydx.community/dydx-token-migration/migration-of-dydx-from-ethereum-to-dydx-chain/migration-and-bridge-overview), [Community Proposal](https://dydx.community/dashboard/proposal/15)).

---

### ⚠️ Disclaimer 🦔

The steps outlined in this section for migrating `DYDX` tokens from Ethereum to dYdX Chain are merely suggestions based on a particular interpretation of the public contracts and tools available. Users are encouraged to derive their own process and thoroughly test and understand the implications of their actions in interacting with the Ethereum smart contracts. The information provided here is for informational purposes only and should not be construed as financial or investment advice.

dYdX Operations Services Ltd does not assume responsibility or liability for any errors, omissions, or inaccuracies in the information provided, nor for any user's reliance on any such information. Users are solely responsible for the actions they take when bridging tokens, and are advised to consult with a qualified professional before making any decisions regarding the bridging of `DYDX` tokens or engaging in any related activities.

By proceeding to use the information provided on this page, users acknowledge and agree that they do so at their own risk, and that dYdX Operations Services Ltd shall not be liable for any losses, damages, or harm that may result from such use.



---

To approve the `wethDYDX` Smart Contract to transfer the bridging amount of `DYDX` on your behalf
1. navigate to [`approve` function](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5#writeContract#F2) of the `DYDX` Token on Etherscan
2. click `Connect to Web3`
4. input
    - `spender` address - [`wethDYDX` Smart Contract Address](https://etherscan.io/address/0x46b2deae6eff3011008ea27ea36b7c27255ddfa9)(`0x46b2DeAe6eFf3011008EA27EA36b7c27255ddFA9`)
    - approval `amount`, e.g. `1000000000000000000000` for bridging `1000 DYDX` tokens ([`decimals` for `DYDX`](https://etherscan.io/address/0x92D6C1e31e14520e676a687F0a93788B716BEff5#readContract#F24) is `18`)
6. click `Write` and sign the transaction

Make sure you have access to your `accAddress` for dYdX Chain - you will need to provide it to the `wethDYDX` Ethereum contract (this is your `delegator_address` in `genesis.json`, for more on Cosmos Addresses, you can check [this link](https://twitter.com/JoeAbbey/status/1633474883815456769)).

Transform your `accAddress` to hexidecimal bytes
```bash
git clone https://github.com/dydxprotocol/v4-chain.git
cd v4-chain/protocol
go run scripts/bech32_to_hex/bech32_to_hex.go -address <bech32_address>
```

To initiate the migration of your self-delegation `DYDX` amount from Ethereum
1. navigate to the [`bridge` function](https://etherscan.io/address/0x46b2deae6eff3011008ea27ea36b7c27255ddfa9#writeContract#F2) of `wethDYDX` on Etherscan
2. click `Connect to Web3`
3. input the bridging parameters
    - `amount` - e.g. `1000000000000000000000` for bridging `1000 DYDX`
    - `accAddress` - in its hexidecimal form acquired above, make sure the value starts with `0x`
    - `memo` - use `0x` to pass in empty value
5. click `Write` and sign the transaction

You can use the `bridge_events.go` script to validate your bridging transaction has been recorded successfully
```bash
go run scripts/bridge_events/bridge_events.go \
  -denom adydx \
  -address 0x46b2DeAe6eFf3011008EA27EA36b7c27255ddFA9 \
  -rpc <rpc_node_url> \
  -toblock <last_block_inclusive>
```

In case you would like to experiment with bridging on Sepolia first, you can use [testTOKEN](https://sepolia.etherscan.io/token/0x6D5Bb505A4f85C10B122cCC36E30F57E2B86A291) and [wrappedTestToken](https://sepolia.etherscan.io/address/0xcca9D5f0a3c58b6f02BD0985fC7F9420EA24C1f0).

## Get the Latest `dydxprotocold` Binary

Download the latest binaries from [dYdX Protocol Github Repo](https://github.com/dydxprotocol/v4-chain/releases).

Choose the version (e.g. `"v1.0.0"`), and binary (`linux-amd64` as example) for the corresponding platform, and set up in $PATH:

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

The output should look like this (**make sure** the `version` and `commit` are consistent):

```bash
commit: bd3ff30248d271719c687cc10159de479fdd904d
cosmos_sdk_version: v0.47.4
go: go version go1.21.3 <platform>
name: dydxprotocol
server_name: dydxprotocold
version: 1.0.0
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

Be sure to **make a copy** of the key pair json `priv_validator_key.json` and `node_key.json` under `$HOME_MAINNET_1/config`, as these key pairs are generated during `dydxprotocold init ....` and **cannot** be recovered later unless they were explicitly derived through the mnemonics.

If you've previously created a `gentx` and are recovering your home directory, you will need to replace the default `priv_validator_key.json` and `node_key.json` files with the files backed up from above.

## Import/Create Validator Key

You could either create a new key for the mainnet, or import an existing key. 

**Option 1: Creating a New Key**

⚠️ The below keyrings are examples, we do not recommend using `test` for production.

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

### Download pregenesis.json

We recommend you use the `pregenesis.json` published in dYdX Operations subDAO's [GitHub repo](https://github.com/dydxopsdao/networks/tree/main/dydx-mainnet-1).

Download `pregenesis.json` file into `$HOME_MAINNET_1`, replacing the previous `genesis.json` file:
```bash
# Run at root of `networks`.
export HOME_MAINNET_1=<your dir>
git checkout main
git pull origin main
cp dydx-mainnet-1/pregenesis.json $HOME_MAINNET_1/config/genesis.json
```

Feel free to inspect the content of the `pregenesis.json` file, and let us know if there’s any questions/concerns.

### Generate `gentx`

Use `gentx` command to create your genesis transaction in `$HOME_MAINNET_1/gentx/`.

You can also use the below optional flags:

```bash
  --website="xxx" \
  --details="xxx" \
  --identity="xxx" \
  --pubkey="xxx"
```

You may consider self-delegating slightly less than 100% of your bridged DYDX tokens.

```bash
dydxprotocold gentx $DYDX_KEY_NAME <self-delegation amount>adydx --moniker $DYDX_MONIKER --keyring-backend test --chain-id $CHAIN_ID --home=$HOME_MAINNET_1
```

It will output something similar to:

```bash
Genesis transaction written to "/Users/XXX/.dydx-mainnet-1/config/gentx/gentx-ae8a1fd5828866c435f9b559fad39e1bc19a06dc.json"
```

See [here](https://github.com/dydxprotocol/v4-testnets/blob/main/dydx-testnet-4/gentx/gentx-dydx-1.json) for an example gentx file.

<aside>
💡 Do not manually modify the content of generated `gentx` file (except for filename). This will result in invalid signature for transaction.

</aside>

<aside>
💡 We have a GitHub workflow that validates the submitted `gentx` file. Please verify the content of your `gentx` file if validation fails.

</aside>

## Submit Your `gentx`

1. Fork the [Mainnet Github Repo](https://github.com/dydxopsdao/networks).
 
2. Clone the forked repo.

```bash
git clone https://github.com/<your username or organization>/networks.git
```

3. Create a new local branch:

```bash
git checkout -b $DYDX_MONIKER/gentx
```

4. Copy the gentx file to the forked `networks` repo (ensure that it is in the correct folder)

```bash
cp $HOME_MAINNET_1/config/gentx/gentx-xxxxxxxxxxxx.json v4-mainnets/dydx-mainnet-1/gentx/gentx-$DYDX_MONIKER.json
```

5. Commit and push to your repo.

```bash
git add dydx-mainnet-1/gentx/*
git commit -m "$DYDX_MONIKER gentx"
git push origin $DYDX_MONIKER/gentx
```

6. Create a pull request in the original `dydxopsdao/networks` repo. In other words, the `base repository` should be `dydxopsdao/networks` and the `base` branch should be `main`. 

7. The maintainers will run the "Validate Genesis" workflow, which runs some sanity checks on the submitted `gentx`. Please try to resolve any issue if the workflow doesn't pass, and post in `#ext-dydx-v4-validators-discussion` if you need help.

8. Maintainers will review and merge the PRs. If you need any help, post in `#ext-dydx-v4-validators-discussion`.

