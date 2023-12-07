# Resources

## `networks` repository and `genesis.json`

To join the mainnet network, you need to run the correct binary version and specify the correct `genesis.json` as well as the `seed node` info.

The above info can be found in this [`networks` repository](https://github.com/dydxopsdao/networks).


## Seed nodes
| Team           |  URI                                                                                  |
|----------------|---------------------------------------------------------------------------------------|
| Polkachu       | `ade4d8bc8cbe014af6ebdf3cb7b1e9ad36f412c0@seeds.polkachu.com:23856`                   |
| KingNodes      | `65b740ee326c9260c30af1f044e9cda63c73f7c1@seeds.kingnodes.net:23856`                  |
| Bware Labs     | `f04a77b92d0d86725cdb2d6b7a7eb0eda8c27089@dydx-mainnet-seed.bwarelabs.com:36656`      |
| Lavender.Five  | `20e1000e88125698264454a884812746c2eb4807@seeds.lavenderfive.com:23856`               |
| CryptoCrew     | `c2c2fcb5e6e4755e06b83b499aff93e97282f8e8@tenderseed.ccvalidators.com:26401`          |
| Crosnest       | `4f20c3e303c9515051b6276aeb89c0b88ee79f8f@seed.dydx.cros-nest.com:26656`              |
| DSRV           | `a9cae4047d5c34772442322b10ef5600d8e54900@dydx-mainnet-seednode.allthatnode.com:26656`|
| Luganodes      | `802607c6db8148b0c68c8a9ec1a86fd3ba606af6@64.227.38.88:26656`                         |
| NodeStake      | `4c30c8a95e26b07b249813b677caab28bf0c54eb@rpc.dydx.nodestake.top:666`                 |
| AutoStake      | `ebc272824924ea1a27ea3183dd0b9ba713494f83@dydx-mainnet-seed.autostake.com:27366`      |
| genznodes      | `09ba537d6563018b97c502979c3478df4decf426@dydxprotocol-seed.genznodes.dev:22656`      |


## Indexer endpoints
| Type  | URI                              |
|-------|----------------------------------|
| API   | `https://indexer.dydx.trade/v4`  |
| WS    | `wss://indexer.dydx.trade/v4/ws` |


## Snapshot service
| Type      | URI                                                    |
|-----------|--------------------------------------------------------|
| StateSync | `https://dydx-mainnet-statesync-rpc.bwarelabs.com` <br> `https://polkachu.com/state_sync/dydx` <br> `https://dydx-ops-statesync.kingnodes.com/` <br> `https://services.lavenderfive.com/mainnet/dydx/statesync` <br> `https://nodestake.top/dydx` <br> `https://autostake.com/networks/dydx/#services` <br> `https://genznodes.dev/resources/statesync/dydx` |
| Snapshots | `https://bwarelabs.com/snapshots/dydx` <br> `https://polkachu.com/tendermint_snapshots/dydx` <br> `https://dydx-archive-snapshot.kingnodes.com/` <br> `https://services.lavenderfive.com/mainnet/dydx/snapshot` <br> `https://nodestake.top/dydx`  <br> `https://autostake.com/networks/dydx/#services` <br> `https://genznodes.dev/resources/snapshot/dydx` |


## RPC endpoints
| Type  | URI                                                                                       |
|-------|-------------------------------------------------------------------------------------------|
| RPC   | `https://dydx-dao-rpc.polkachu.com` <br> `https://dydx-mainnet-full-rpc.public.blastapi.io` <br> `https://dydx-ops-rpc.kingnodes.com` <br> `https://dydx-rpc.lavenderfive.com` <br> `https://rpc.dydx.nodestake.top` <br> `https://dydx-mainnet-rpc.autostake.com:443` <br> `https://dydxprotocol-rpc.genznodes.dev` <br> `https://rpc-dydx.ecostake.com:443` <br> `https://rpc-dydx.cosmos-spaces.cloud` <br> `https://dydx-rpc.publicnode.com:443` <br> `https://dydx-rpc.enigma-validator.com` |
| REST  | `https://dydx-dao-api.polkachu.com` <br> `https://dydx-mainnet-full-lcd.public.blastapi.io` <br> `https://dydx-ops-rest.kingnodes.com` <br> `https://dydx-api.lavenderfive.com` <br> `https://dydx-mainnet-lcd.autostake.com:443` <br> `https://rest-dydx.ecostake.com:443` <br> `https://api-dydx.cosmos-spaces.cloud` <br> `https://api.dydx.nodestake.top` <br> `https://dydxprotocol-api.genznodes.dev` <br> `https://dydx-rest.publicnode.com` <br> `https://rest-dydx.cros-nest.com:443` <br> `https://dydx-lcd.enigma-validator.com` |
| gRPC  | `dydx-dao-grpc-1.polkachu.com:23890` <br> `dydx-dao-grpc-2.polkachu.com:23890` <br> `dydx-dao-grpc-3.polkachu.com:23890` <br> `dydx-dao-grpc-4.polkachu.com:23890` <br> `dydx-dao-grpc-5.polkachu.com:23890` <br> `dydx-mainnet-full-grpc.public.blastapi.io:443` <br> `https://dydx-ops-grpc.kingnodes.com` <br> `https://dydx-grpc.lavenderfive.com` <br> `https://grpc.dydx.nodestake.top` <br> `dydx-mainnet-grpc.autostake.com:443` <br> `dydxprotocol-grpc.genznodes.dev:27090` <br> `grpc-dydx.cosmos-spaces.cloud:4990` <br> `dydx-grpc.publicnode.com:443` |


## Archival nodes endpoints
| Type  | URI                                                                                       |
|-------|-------------------------------------------------------------------------------------------|
| RPC   | `https://dydx-dao-archive-rpc.polkachu.com` <br> `https://dydx-mainnet-archive-rpc.public.blastapi.io` <br> `https://dydx-ops-archive-rpc.kingnodes.com` |
| REST  | `https://dydx-dao-archive-api.polkachu.com` <br> `https://dydx-mainnet-archive-lcd.public.blastapi.io` <br> `https://dydx-ops-archive-rest.kingnodes.com` |
| gRPC  | `dydx-dao-archive-grpc-1.polkachu.com:23890` <br> `dydx-dao-archive-grpc-2.polkachu.com:23890` <br> `dydx-mainnet-archive-grpc.public.blastapi.io:443` <br> `https://dydx-ops-archive-grpc.kingnodes.com` |


## Other Links

**DYDX Migration/Bridge UI:**\
[https://bridge.dydx.trade/](https://bridge.dydx.trade/)

**dYdX Chain web frontend (soon):**\
[https://dydx.trade/](https://dydx.trade/)

**Mainnet Status Page:**\
[https://status.dydx.trade](https://status.dydx.trade)

**[Mintscan](https://www.mintscan.io/dydx)**

**[Keplr](https://wallet.keplr.app/chains/dydx)**

**[NodeStake](https://explorer.nodestake.top/dydx)**

**[Cosmos.Directory](https://cosmos.directory/dydx)**

**[Restake](https://restake.app/dydx)**

**[Validator Metrics](https://p.ap1.datadoghq.com/sb/610e1836-51dd-11ee-a995-da7ad0900009-78607847ff8632d8a96737ed3437f40c)**

**[#validators Discord Channel](https://discord.com/channels/724804754382782534/1029585380170805379)**

**Public Testnet Documentation:**\
[https://v4-teacher.vercel.app](https://t.co/tKTUWacKld)
