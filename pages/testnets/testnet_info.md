## Testnets

To join the testnet network, you need to run the correct binary version and specify the correct `genesis.json` as well as the `seed node` info.

The above info can be found in this [`networks` repository](https://github.com/dydxprotocol/networks).

| Testnet Chain ID | Description     | Status        | Binary Version | Seed Node ID and IP Address                                                                                                                                                                                                                                                                                         | Github                                                                    |
| ---------------- | --------------- | ------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `dydx-testnet-1` | Test Network #1 | 🔴 Inactive    | v0.0.1-rc1     |                                                                                                                                                                                                                                                                                                                     | [Link](https://github.com/dydxprotocol/networks/tree/main/dydx-testnet-1) |
| `dydx-testnet-2` | Test Network #2 | 🔴 Inactive    | v0.1.0-rc2     |                                                                                                                                                                                                                                                                                                                     | [Link](https://github.com/dydxprotocol/networks/tree/main/dydx-testnet-2) |
| `dydx-testnet-3` | Test Network #3 | 🏗️ Preparation | v0.2.1         | *5b00f9ab668c35f7fcaff9a0607da59273bee399@dydx-testnet3-seednode.allthatnode.com:26656, *5454e22c769c5103e51c336121c532e9d6289348@tenderseed.ccvalidators.com:29103, *f3339d67eac6e6a082555d2db6556ee4c0ce5f61@test-dydx-seed.kingnodes.com, *20e1000e88125698264454a884812746c2eb4807@seeds.lavenderfive.com:23856 | [Link](https://github.com/dydxprotocol/networks/tree/main/dydx-testnet-3) |


### Chain info
```json
{
  "rpc": "3.136.5.36:26657",
  "rest": "3.136.5.36:1317",
  "chainId": "dydx-testnet-3",
  "chainName": "dYdX Public Testnet",
  "chainSymbolImageUrl": "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/dydx-testnet-3/chain.png",
  "bech32Config": {
    "bech32PrefixAccPub": "dydxpub",
    "bech32PrefixValPub": "dydxvaloperpub",
    "bech32PrefixAccAddr": "dydx",
    "bech32PrefixConsPub": "dydxvalconspub",
    "bech32PrefixValAddr": "dydxvaloper",
    "bech32PrefixConsAddr": "dydxvalcons"
  },
  "bip44": {
    "coinType": 118
  },
  "stakeCurrency": {
    "coinDenom": "DV4TNT",
    "coinDecimals": 6,
    "coinMinimalDenom": "dv4tnt",
  },
  "currencies": [
    {
      "coinDenom": "DV4TNT",
      "coinDecimals": 6,
      "coinMinimalDenom": "dv4tnt",
    },
    {
      "coinDenom": "USDC",
      "coinMinimalDenom": "ibc/8E27BA2D5493AF5636760E354E46004562C46AB7EC0CC4C1CA14E9E20E2545B5",
      "coinDecimals": 6
    }
  ],
  "feeCurrencies": [
    {
      "coinDenom": "DV4TNT",
      "coinDecimals": 6,
      "coinMinimalDenom": "dv4tnt",
    }
  ],
  "features": []
}
```
