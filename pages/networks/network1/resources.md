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


## Indexer endpoints
| Type  | URI                              |
|-------|----------------------------------|
| API   | `https://indexer.dydx.trade/v4`  |
| WS    | `wss://indexer.dydx.trade/v4/ws` |


## StateSync nodes
| Team           | StateSync Peers                                                                       | Region |
|----------------|---------------------------------------------------------------------------------------|--------|
| KingNodes      | `f94dcfbccb9019584d1790562a020507b050d9ba@51.77.56.23:23856` <br> `6bc1068d9a257931083ddc75ad3b1003a46e5b0d@15.235.160.127:23856` | `EU_West` <br> `Asia_SE` |
| Polkachu       | `580ec248de1f41d4e50abe132b7838348db55b80@176.9.144.40:23856` <br> `90b0ee8e73d8237b06356b244ff9854d1991a1f8@65.109.115.228:23856` <br> `874b5ab53d8f5edae6674ad394f20e2b297cf73f@199.254.199.182:23856` <br> `e3aa07f6f97fcccdf57b64aa5f4f11761df3852a@15.235.160.15:23856` <br> `a879fe2926c2b8f0d86e8e973210c30b8634abb4@15.235.204.159:23856` | `Germany` <br> `Finland` <br> `Japan` <br> `Singapore` <br> `Singapore` |
| Bware Labs     | `b0137ca9fec8d2990d804e20bc5b74e641bb45e8@dydx-mainnet-statesync-rpc.bwarelabs.com:443` | `Germany` |
| Lavender.Five  |  |  |
| NodeStake      | `4b0b87467129127d69ea6bb13ebae1153e8f801c@3.67.197.220:26656` |  |
| AutoStake      | `ebc272824924ea1a27ea3183dd0b9ba713494f83@dydx-mainnet-peer.autostake.com:27366` | `EU,Poland` |

## Snapshot service
| Team           | URI                                                       | Pruning | Index |
|----------------|-----------------------------------------------------------|---------|-------|
| Bware Labs     | `https://bwarelabs.com/snapshots/dydx`                    | Yes     | null  |
| Polkachu       | `https://polkachu.com/tendermint_snapshots/dydx`          | Yes     | null  |
| KingNodes      | `https://dydx-archive-snapshot.kingnodes.com/`            | No      | kv    |
| Lavender.Five  | `https://services.lavenderfive.com/mainnet/dydx/snapshot` | Yes     |       |
| NodeStake      | `https://nodestake.top/dydx`                              | Yes     | null  |
| AutoStake      | `https://autostake.com/networks/dydx/#services`           | Yes     | null  |


## Full node endpoints
### RPC
| Team           | URI                                                       | Rate limit |
|----------------|-----------------------------------------------------------|------------|
| Polkachu       | `https://dydx-dao-rpc.polkachu.com:443`                   | 300 req/m  |
| Bware Labs     | `https://dydx-mainnet-full-rpc.public.blastapi.io:443`    | 20 req/s   |
| KingNodes      | `https://dydx-ops-rpc.kingnodes.com:443`                  | 250 req/m  |
| Lavender.Five  | `https://dydx-rpc.lavenderfive.com:443`                   |            |
| NodeStake      | `https://rpc.dydx.nodestake.top:443`                      | 350 req/m  |
| AutoStake      | `https://dydx-mainnet-rpc.autostake.com:443`              | 4 req/s    |
| EcoStake       | `https://rpc-dydx.ecostake.com:443`                       |            |
| CosmosSpaces   | `https://rpc-dydx.cosmos-spaces.cloud:443`                |            |
| PublicNode     | `https://dydx-rpc.publicnode.com:443`                     |            |
| Cros-Nest      | `https://rpc-dydx.cros-nest.com:443`                      |            |
| Enigma         | `https://dydx-rpc.enigma-validator.com:443`               |            |

### REST
| Team           | URI                                                       | Rate limit |
|----------------|-----------------------------------------------------------|------------|
| Polkachu       | `https://dydx-dao-api.polkachu.com:443`                   | 300 req/m  |
| Bware Labs     | `https://dydx-mainnet-full-lcd.public.blastapi.io:443`    | 20 req/s   |
| KingNodes      | `https://dydx-ops-rest.kingnodes.com:443`                 | 250 req/m  |
| Lavender.Five  | `https://dydx-api.lavenderfive.com:443`                   |            |
| NodeStake      | `https://api.dydx.nodestake.top:443`                      | 350 req/m  |
| AutoStake      | `https://dydx-mainnet-lcd.autostake.com:443`              | 4 req/s    |
| EcoStake       | `https://rest-dydx.ecostake.com:443`                      |            |
| CosmosSpaces   | `https://api-dydx.cosmos-spaces.cloud:443`                |            |
| PublicNode     | `https://dydx-rest.publicnode.com:443`                    |            |
| Cros-Nest      | `https://rest-dydx.cros-nest.com:443`                     |            |
| Enigma         | `https://dydx-lcd.enigma-validator.com:443`               |            |

### gRPC
| Team           | URI                                                       | Rate limit |
|----------------|-----------------------------------------------------------|------------|
| Polkachu       | `http://dydx-dao-grpc-1.polkachu.com:23890` <br> `http://dydx-dao-grpc-2.polkachu.com:23890` <br> `http://dydx-dao-grpc-3.polkachu.com:23890` <br> `http://dydx-dao-grpc-4.polkachu.com:23890` <br> `http://dydx-dao-grpc-5.polkachu.com:23890`| 300 req/m  |
| Bware Labs     | `https://dydx-mainnet-full-grpc.public.blastapi.io:443`   | 20 req/s   |
| KingNodes      | `https://dydx-ops-grpc.kingnodes.com:443`                 | 250 req/m  |
| Lavender.Five  | `https://dydx-grpc.lavenderfive.com:443`                  |            |
| NodeStake      | `https://grpc.dydx.nodestake.top:443`                     | 350 req/m  |
| AutoStake      | `https://dydx-mainnet-grpc.autostake.com:443`             | 4 req/s    |
| EcoStake       | `https://grpc-dydx.ecostake.com:443`                      |            |
| CosmosSpaces   | `http://grpc-dydx.cosmos-spaces.cloud:4990`               |            |
| PublicNode     | `https://dydx-grpc.publicnode.com:443`                    |            |
| Cros-Nest      | `https://grpc-dydx.cros-nest.com:443`                     |            |

## Archival node endpoints
### RPC
| Team           | URI                                                       | Rate limit |
|----------------|-----------------------------------------------------------|------------|
| Polkachu       | `https://dydx-dao-archive-rpc.polkachu.com:443`           | 300 req/m  |
| Bware Labs     | `https://dydx-mainnet-archive-rpc.public.blastapi.io:443` | 20 req/s   |
| KingNodes      | `https://dydx-ops-archive-rpc.kingnodes.com:443`          | 50 req/m   |

### REST
| Team           | URI                                                       | Rate limit |
|----------------|-----------------------------------------------------------|------------|
| Polkachu       | `https://dydx-dao-archive-api.polkachu.com:443`           | 300 req/m  |
| Bware Labs     | `https://dydx-mainnet-archive-lcd.public.blastapi.io:443` | 20 req/s   |
| KingNodes      | `https://dydx-ops-archive-rest.kingnodes.com:443`         | 50 req/m   |

### gRPC
| Team           | URI                                                       | Rate limit |
|----------------|-----------------------------------------------------------|------------|
| Polkachu       | `http://dydx-dao-archive-grpc-1.polkachu.com:23890` <br> `http://dydx-dao-archive-grpc-2.polkachu.com:23890` | 300 req/m  |
| Bware Labs     | `https://dydx-mainnet-archive-grpc.public.blastapi.io:443`| 20 req/s   |
| KingNodes      | `https://dydx-ops-archive-grpc.kingnodes.com:443`         | 50 req/m   |

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
