# Submitting a Proposal

## Obtaining the `dydxprotocold` Binary
For instructions on compiling the `protocold` binary locally, refer to the dYdX Protocol's [README](https://github.com/dydxprotocol/v4-chain/tree/main/protocol#readme).

Alternatively, if your platform is supported by the prebuilt binaries found in the [releases section](https://github.com/dydxprotocol/v4-chain/releases) of the repository, you can opt to download and use these binaries directly.

## Save your Chain ID in `dydxprotocold` config
Save the [chain-id](../infrastructure_providers-network/network_constants.mdx#chain-id). This will make it so you do not have to manually pass in the chain-id flag for every CLI command.

```bash
dydxprotocold config chain-id [chain_id]
```

## Confirming Connectivity
To ensure that you are successfully connecting, use any of the RPC endpoints listed in the [resources](../infrastructure_providers-network/resources.mdx#full-node-endpoints). Remember to append `:443` to the end of the RPC URI for proper access. Execute the following command, replacing `[RPC ENDPOINT]` with your chosen endpoint:

```bash
dydxprotocold status --node https://[RPC ENDPOINT]:443
```

## Registering an Account in the Keychain
- Choose a unique key name to replace `[KEY NAME]`. This name will be used to identify your key within the keychain.
```bash
dydxprotocold keys add [KEY NAME] --recover
```
- Input your MNEMONIC into the terminal when prompted.

## Crafting a Proposal File
To create a proposal, follow the template provided below. This structure outlines the essential elements of a proposal, including its title, deposit amount, summary, and specific messages. 

```json
{
  "title": "[TEXT TITLE OF THE PROPOSAL]",
  "deposit": "[DEPOSIT AMOUNT IN NATIVE COINS - INCLUDE DENOMINATION]",
  "summary": "[TEXT SUMMARY OF THE PROPOSAL]",
  "messages": [
      {
          [MESSAGE 1]
      },
      {
          [MESSAGE 2]
      },
      ...
  ]
}
```

Once you have filled in the necessary details, save this structure as a JSON file. This file will be used in the submission process of your proposal.

## Submitting the Proposal
```bash
dydxprotocold tx gov submit-proposal [PROPOSAL JSON FILE] --from [KEY NAME] --gas auto --fees [FEE AMOUNT IN TOKEN DENOMINATION] --node https://[RPC ENDPOINT]:443
```
- `[PROPOSAL JSON FILE]`: This is the path to the JSON file containing your proposal details.
- `[KEY NAME]`: This refers to the name of the key you added to your dYdX keychain. It identifies the account from which the proposal is being submitted. Replace this with the key name you chose when you added your account to the keychain.
- `[FEE AMOUNT IN TOKEN DENOMINATION]`: This is the transaction fee for submitting the proposal, specified in the native token of the dYdX blockchain. You need to replace this with the actual amount and the token denomination.
- `[RPC ENDPOINT]`: This is the endpoint of the RPC (Remote Procedure Call) node you are connecting to on the dYdX network. Replace this with the actual RPC endpoint URL you intend to use. Make sure to include `:443` at the end of the URL for the correct port.
