# Running a Validator

💡Note: failure to set up below configurations on a validator node may compromise chain functionality.

## Ethereum RPC Endpoint

For the chain to process bridge transactions from Ethereum, Ethereum testnet, or other chain that supports the `eth_getLogs` RPC method, the bridge daemon queries an RPC endpoint for logs emitted by the bridge contract. By default, a node will use a public testnet endpoint that may have rate-limiting, low reliability, or other restricted functionality.

For your node to successfully ingest bridge transactions from the relevant blockchain, you are required to specify your own private RPC endpoint with flag `--bridge-daemon-eth-rpc-endpoint <YOUR_PRIVATE_RPC_ENDPOINT>` in the command you run when starting the node.

The RPC endpoint you choose *MUST* satisfy the following requirements
* supports `eth_chainId` method
* supports `eth_getLogs` method
* supports `"finalized"` as an input to `toBlock` parameter (Erigon is currently the only major Ethereum node software that does not support this.)

| Deployment         | Chain ID       | Origination Chain | Example Bridge Endpoint (`--bridge-daemon-eth-rpc-endpoint`) |
| ------------------ | -------------- | ----------------- | ------------------------------------------------------------ |
| DYDX token holders | dydx-mainnet-1 | Ethereum          | https://eth-mainnet.g.alchemy.com/v2/demo                    |
| Testnet            | dydx-testnet-4 | Sepolia Testnet   | https://eth-sepolia.g.alchemy.com/v2/demo                    |

Note: example endpoints will work out of the box, but will be quickly rate limited and will not be useable over long periods of blocks.

## Slinky Sidecar

Starting in `v5.0.0`, running a validating full node requires a Skip Protocol's Slinky Sidecar to be run in order to fetch Oracle prices. The sidecar should be started before upgrading from `v4` to `v5`. Instructions to start Slinky Sidecar can be found [here](https://docs.skip.build/connect/validators/quickstart).

Support issues with Skip's Sidecar should be directed [here](https://discord.gg/7hxEThEaRQ).

For mainnet deployment by dYdX Operation Services, Ltd. run: [`v0.4.6`](https://github.com/skip-mev/slinky/tree/v0.4.6) (`ghcr.io/skip-mev/slinky-sidecar:v0.4.6`)

For testnet run: [`v0.4.6`](https://github.com/skip-mev/slinky/tree/v0.4.6) (`ghcr.io/skip-mev/slinky-sidecar:v0.4.6`)

Instructions on upgrading sidecar can be found [here](./upgrades/upgrading_sidecar.md).
