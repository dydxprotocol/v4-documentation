# Resources

## `networks` repositories

For **the deployment by DYDX token holders**, use the below:
| Chain Id          | GitHub Folder                                                     |
| ----------------- | ----------------------------------------------------------------- |
| dydx-mainnet-1    | `https://github.com/dydxopsdao/networks/tree/main/dydx-mainnet-1` |

For **Testnet**, use the below:
| Chain Id          | GitHub Folder                                                             |
| ----------------- | ------------------------------------------------------------------------- |
| dydx-testnet-4    | `https://github.com/dydxprotocol/v4-testnets/tree/main/dydx-testnet-4`    |

## Upgrades History

For **the deployment by DYDX token holders**, use the below:
| Block Height  | Compatible Versions | Comments |
|---------------|---------------------| -------- |
| 1 ~ 1,805,000 | [v2.0.1](https://github.com/dydxprotocol/v4-chain/releases/tag/protocol%2Fv2.0.1) <br> [v1.0.1](https://github.com/dydxprotocol/v4-chain/releases/tag/protocol%2Fv1.0.1) <br> [v1.0.0](https://github.com/dydxprotocol/v4-chain/releases/tag/protocol%2Fv1.0.0) | `v1.0.1` was a rolling upgrade; <br> `v2.0.1` was backported to enable easier syncing from block 1 |
| 1,805,001 ~ 7,147,832 | [v2.0.1](https://github.com/dydxprotocol/v4-chain/releases/tag/protocol%2Fv2.0.1) <br> [v2.0.0](https://github.com/dydxprotocol/v4-chain/releases/tag/protocol%2Fv2.0.0) | `v2.0.0` was an emergency fix |
| 7,147,833 ~ TBD | [v3.0.0](https://github.com/dydxprotocol/v4-chain/releases/tag/protocol%2Fv3.0.0) | |
| TBD ~ | [v4.0.0](https://github.com/dydxprotocol/v4-chain/releases/tag/protocol%2Fv4.0.0) | |

For **Testnet**, use the below:
| Block Height  | Compatible Versions | Comments |
|---------------|---------------------| -------- |
| 1 ~ 5,000,000 | [v2.0.1](https://github.com/dydxprotocol/v4-chain/releases/tag/protocol%2Fv2.0.1) <br> [v2.0.0](https://github.com/dydxprotocol/v4-chain/releases/tag/protocol%2Fv2.0.0) <br> [v1.0.1](https://github.com/dydxprotocol/v4-chain/releases/tag/protocol%2Fv1.0.1) <br> [v1.0.0](https://github.com/dydxprotocol/v4-chain/releases/tag/protocol%2Fv1.0.0) | The chain was never upgraded to `v2.0.0` |
| 5,000,001 ~ 6,880,000 | [v3.0.0](https://github.com/dydxprotocol/v4-chain/releases/tag/protocol%2Fv3.0.0) | |
| 6,880,001 ~  | [v4.0.0](https://github.com/dydxprotocol/v4-chain/releases/tag/protocol%2Fv4.0.0) | |

## Seed Nodes

For **the deployment by DYDX token holders**, use the below:
| Team          | URI                                                                                    |
| ------------- | -------------------------------------------------------------------------------------- |
| Polkachu      | `ade4d8bc8cbe014af6ebdf3cb7b1e9ad36f412c0@seeds.polkachu.com:23856`                    |
| KingNodes     | `65b740ee326c9260c30af1f044e9cda63c73f7c1@seeds.kingnodes.net:23856`                   |
| Bware Labs    | `f04a77b92d0d86725cdb2d6b7a7eb0eda8c27089@dydx-mainnet-seed.bwarelabs.com:36656`       |
| Lavender.Five | `20e1000e88125698264454a884812746c2eb4807@seeds.lavenderfive.com:23856`                |
| CryptoCrew    | `c2c2fcb5e6e4755e06b83b499aff93e97282f8e8@tenderseed.ccvalidators.com:26401`           |
| DSRV          | `a9cae4047d5c34772442322b10ef5600d8e54900@dydx-mainnet-seednode.allthatnode.com:26656` |
| Luganodes     | `802607c6db8148b0c68c8a9ec1a86fd3ba606af6@64.227.38.88:26656`                          |
| AutoStake     | `ebc272824924ea1a27ea3183dd0b9ba713494f83@dydx-mainnet-seed.autostake.com:27366`       |

For **Testnet**, use the below:
| Team          | URI                                                                                     |
| ------------- | --------------------------------------------------------------------------------------- |
| AllThatNode:  | `19d38bb5cea1378db3e16615e63594dc26119a1a@dydx-testnet4-seednode.allthatnode.com:26656` |
| Crosnest:     | `87ee8de5f0f82af6ee6740a30f8844bbe6434413@seed.dydx-testnet.cros-nest.com:26656`        |
| CryptoCrew:   | `38e5a5ec34c578dc323cbdd9b98330abb448d586@tenderseed.ccvalidators.com:29104`            |
| KingNodes:    | `80a1a6cd086634c34008c6457d3f7441cfc05c47@seeds.kingnodes.com:27056`                    |
| StakingCabin: | `182ab0015fb4b7d751b12a9c0162ac123445eac1@seed.dydx-testnet.stakingcabin.com:26656`     |
| StakerSpace:  | `76b472b107ccf20c3d6c110c4a2a217306d2dedb@dydx-seed.staker.space:26656`                 |

## Indexer endpoints

For **the deployment by DYDX token holders**, use the below:
| Type | URI                              |
| ---- | -------------------------------- |
| API  | `https://indexer.dydx.trade/v4`  |
| WS   | `wss://indexer.dydx.trade/v4/ws` |

For **Testnet**, use the below:
| Type | URI                                           |
| ---- | --------------------------------------------- |
| API  | `https://indexer.v4testnet.dydx.exchange`     |
| WS   | `wss://indexer.v4testnet.dydx.exchange/v4/ws` |

## StateSync nodes

For **the deployment by DYDX token holders**, use the below:
| Team          | StateSync Peers                                                                                                                                                                                                                                                                                                                                   | Region                                                                  |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| KingNodes     | `f94dcfbccb9019584d1790562a020507b050d9ba@51.77.56.23:23856` <br> `6bc1068d9a257931083ddc75ad3b1003a46e5b0d@15.235.160.127:23856`                                                                                                                                                                                                                 | `EU_West` <br> `Asia_SE`                                                |
| Polkachu      | `580ec248de1f41d4e50abe132b7838348db55b80@176.9.144.40:23856` <br> `90b0ee8e73d8237b06356b244ff9854d1991a1f8@65.109.115.228:23856` <br> `874b5ab53d8f5edae6674ad394f20e2b297cf73f@199.254.199.182:23856` <br> `e3aa07f6f97fcccdf57b64aa5f4f11761df3852a@15.235.160.15:23856` <br> `a879fe2926c2b8f0d86e8e973210c30b8634abb4@15.235.204.159:23856` | `Germany` <br> `Finland` <br> `Japan` <br> `Singapore` <br> `Singapore` |
| Bware Labs    | `b0137ca9fec8d2990d804e20bc5b74e641bb45e8@dydx-mainnet-statesync-rpc.bwarelabs.com:443`                                                                                                                                                                                                                                                           | `Germany`                                                               |
| AutoStake     | `ebc272824924ea1a27ea3183dd0b9ba713494f83@dydx-mainnet-peer.autostake.com:27366`                                                                                                                                                                                                                                                                  | `EU,Poland`                                                             |

For **Testnet**, use the below:
| Team     | StateSync Peers                                                |
| -------- | -------------------------------------------------------------- |
| Polkachu | `0d17772cbba3b488ad895b17b9a48948e480b1fa@65.109.23.114:23856` |

## Snapshot Service

For **the deployment by DYDX token holders**, use the below:
| Team          | URI                                                       | Pruning | Index |
| ------------- | --------------------------------------------------------- | ------- | ----- |
| Bware Labs    | `https://bwarelabs.com/snapshots/dydx`                    | Yes     | null  |
| Polkachu      | `https://polkachu.com/tendermint_snapshots/dydx`          | Yes     | null  |
| KingNodes     | `https://dydx-archive-snapshot.kingnodes.com/`            | No      | kv    |
| Lavender.Five | `https://services.lavenderfive.com/mainnet/dydx/snapshot` | Yes     |       |
| AutoStake     | `https://autostake.com/networks/dydx/#services`           | Yes     | null  |

For **Testnet**, use the below:
| Team       | URI                                    | Pruning | Index |
| ---------- | -------------------------------------- | ------- | ----- |
| Bware Labs | `https://bwarelabs.com/snapshots/dydx` | Yes     | null  |

## Full node endpoints

### RPC (For the deployment by DYDX token holders)
| Team          | URI                                                    | Rate limit |
| ------------- | ------------------------------------------------------ | ---------- |
| Polkachu      | `https://dydx-dao-rpc.polkachu.com:443`                | 300 req/m  |
| Bware Labs    | `https://dydx-mainnet-full-rpc.public.blastapi.io:443` | 20 req/s   |
| KingNodes     | `https://dydx-ops-rpc.kingnodes.com:443`               | 250 req/m  |
| Lavender.Five | `https://dydx-rpc.lavenderfive.com:443`                |            |
| AutoStake     | `https://dydx-mainnet-rpc.autostake.com:443`           | 4 req/s    |
| EcoStake      | `https://rpc-dydx.ecostake.com:443`                    |            |
| PublicNode    | `https://dydx-rpc.publicnode.com:443`                  |            |
| Enigma        | `https://dydx-rpc.enigma-validator.com:443`            |            |
| CosmosSpaces  | `https://rpc-dydx.cosmos-spaces.cloud:443`             |            |

### REST (For the deployment by DYDX token holders)
| Team          | URI                                                    | Rate limit |
| ------------- | ------------------------------------------------------ | ---------- |
| Polkachu      | `https://dydx-dao-api.polkachu.com:443`                | 300 req/m  |
| Bware Labs    | `https://dydx-mainnet-full-lcd.public.blastapi.io:443` | 20 req/s   |
| KingNodes     | `https://dydx-ops-rest.kingnodes.com:443`              | 250 req/m  |
| Lavender.Five | `https://dydx-api.lavenderfive.com:443`                |            |
| AutoStake     | `https://dydx-mainnet-lcd.autostake.com:443`           | 4 req/s    |
| EcoStake      | `https://rest-dydx.ecostake.com:443`                   |            |
| PublicNode    | `https://dydx-rest.publicnode.com:443`                 |            |
| Enigma        | `https://dydx-lcd.enigma-validator.com:443`            |            |
| CosmosSpaces  | `https://api-dydx.cosmos-spaces.cloud:443`             |            |

### gRPC (For the deployment by DYDX token holders)
| Team          | URI                                                                                                                                                                                                                                             | Rate limit |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| Polkachu      | `http://dydx-dao-grpc-1.polkachu.com:23890` <br> `http://dydx-dao-grpc-2.polkachu.com:23890` <br> `http://dydx-dao-grpc-3.polkachu.com:23890` <br> `http://dydx-dao-grpc-4.polkachu.com:23890` <br> `http://dydx-dao-grpc-5.polkachu.com:23890` | 300 req/m  |
| Bware Labs    | `https://dydx-mainnet-full-grpc.public.blastapi.io:443`                                                                                                                                                                                         | 20 req/s   |
| KingNodes     | `https://dydx-ops-grpc.kingnodes.com:443`                                                                                                                                                                                                       | 250 req/m  |
| Lavender.Five | `https://dydx-grpc.lavenderfive.com:443`                                                                                                                                                                                                        |            |
| AutoStake     | `https://dydx-mainnet-grpc.autostake.com:443`                                                                                                                                                                                                   | 4 req/s    |
| EcoStake      | `https://grpc-dydx.ecostake.com:443`                                                                                                                                                                                                            |            |
| PublicNode    | `https://dydx-grpc.publicnode.com:443`                                                                                                                                                                                                          |            |
| CosmosSpaces  | `http://grpc-dydx.cosmos-spaces.cloud:4990`                                                                                                                                                                                                     |            |

### RPC (For Testnet)
| Team          | URI                                             |
| ------------- | ----------------------------------------------- |
| Enigma        | `https://dydx-rpc-testnet.enigma-validator.com` |
| Lavendar Five | `https://testnet-dydx-rpc.lavenderfive.com`     |
| King Nodes    | `https://test-dydx-rpc.kingnodes.com`           |
| Polkachu      | `https://dydx-testnet-rpc.polkachu.com`         |

### REST (For Testnet)
| Team          | URI                                              |
| ------------- | ------------------------------------------------ |
| Enigma        | `https://dydx-lcd-testnet.enigma-validator.com\` |
| Lavendar Five | `https://testnet-dydx-api.lavenderfive.com`      |
| King Nodes    | `https://test-dydx-rest.kingnodes.com`           |
| Polkachu      | `https://dydx-testnet-api.polkachu.com`          |

### gRPC (For Testnet)
| Team          | URI                                      |
| ------------- | ---------------------------------------- |
| Lavendar Five | `testnet-dydx-grpc.lavenderfive.com:443` |
| King Nodes    | `https://test-dydx-grpc.kingnodes.com` <br> `https://test-dydx-grpc-web.kingnodes.com`   |
| Polkachu      | `dydx-testnet-grpc.polkachu.com:23890`   |

## Archival node endpoints

### RPC (For the deployment by DYDX token holders)
| Team       | URI                                                       | Rate limit |
| ---------- | --------------------------------------------------------- | ---------- |
| Polkachu   | `https://dydx-dao-archive-rpc.polkachu.com:443`           | 300 req/m  |
| Bware Labs | `https://dydx-mainnet-archive-rpc.public.blastapi.io:443` | 20 req/s   |
| KingNodes  | `https://dydx-ops-archive-rpc.kingnodes.com:443`          | 50 req/m   |

### REST (For the deployment by DYDX token holders)
| Team       | URI                                                       | Rate limit |
| ---------- | --------------------------------------------------------- | ---------- |
| Polkachu   | `https://dydx-dao-archive-api.polkachu.com:443`           | 300 req/m  |
| Bware Labs | `https://dydx-mainnet-archive-lcd.public.blastapi.io:443` | 20 req/s   |
| KingNodes  | `https://dydx-ops-archive-rest.kingnodes.com:443`         | 50 req/m   |

### gRPC (For the deployment by DYDX token holders)
| Team       | URI                                                                                                          | Rate limit |
| ---------- | ------------------------------------------------------------------------------------------------------------ | ---------- |
| Polkachu   | `http://dydx-dao-archive-grpc-1.polkachu.com:23890` <br> `http://dydx-dao-archive-grpc-2.polkachu.com:23890` | 300 req/m  |
| Bware Labs | `https://dydx-mainnet-archive-grpc.public.blastapi.io:443`                                                   | 20 req/s   |
| KingNodes  | `https://dydx-ops-archive-grpc.kingnodes.com:443`                                                            | 50 req/m   |


## Other Links

For **the deployment by DYDX token holders**, use the below:

| Name                        | URI                                                                                                    |
| --------------------------- | ------------------------------------------------------------------------------------------------------ |
| dYdX Chain Web Frontend     | `https://dydx.trade/`                                                                                  |
| Status Page                 | `https://status.dydx.trade`                                                                            |
| Mintscan                    | `https://www.mintscan.io/dydx`                                                                         |
| Keplr                       | `https://wallet.keplr.app/chains/dydx`                                                                 |
| Validator Metrics           | `https://p.ap1.datadoghq.com/sb/610e1836-51dd-11ee-a995-da7ad0900009-78607847ff8632d8a96737ed3437f40c` |
| #validators Discord Channel | `https://discord.com/channels/724804754382782534/1029585380170805379`                                  |
| FE Bug Report Form          | `https://www.dydxopsdao.com/feedback`                                                                  |

For **Testnet**, use the below:

| Name                       | URI                                                                                                   |
| -------------------------- | ----------------------------------------------------------------------------------------------------- |
| Public Testnet Front-end   | `https://v4.testnet.dydx.exchange`                                                                    |
| Status Page                | `https://status.v4testnet.dydx.exchange`                                                              |
| Mintscan                   | `https://testnet.mintscan.io/dydx-testnet`                                                            |
| Keplr                      | `https://testnet.keplr.app/chains/dydx-testnet`                                                       |
| Validator Metrics          | `https://p.datadoghq.com/sb/dc160ddf0-05a98d2dbe2a01d8caa5783eb616f826`                               |
| Discord Channel (Feedback) | `https://discord.com/channels/724804754382782534/1117897181886677012`                                 |
| Google Form (Feedback)     | `https://docs.google.com/forms/d/e/1FAIpQLSezLsWCKvAYDEb7L-2O4wOON1T56xxro9A2Azvl6IxXHP_15Q/viewform` |
