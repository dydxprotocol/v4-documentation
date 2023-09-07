## Testnets

To join the testnet network, you need to run the correct binary version and specify the correct `genesis.json` as well as the `seed node` info.

The above info can be found in this [`networks` repository](https://github.com/dydxprotocol/networks).

| Testnet Chain ID | Description     | Status        | Binary Version | Seed Node ID and IP Address                                                | Github                                                                    |
| ---------------- | --------------- | ------------- | -------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `dydx-testnet-1` | Test Network #1 | 🔴 Inactive    | v0.0.1-rc1     |                                                                            | [Link](https://github.com/dydxprotocol/networks/tree/main/dydx-testnet-1) |
| `dydx-testnet-2` | Test Network #2 | ✅ Live        | v0.1.0-rc2     | IP: 13.59.4.93, ID: 25dd504d86d82673b9cf94fe78c00714f236c9f8               | [Link](https://github.com/dydxprotocol/networks/tree/main/dydx-testnet-2) |
| `dydx-testnet-3` | Test Network #3 | 🏗️ Preparation | TBD            | 5454e22c769c5103e51c336121c532e9d6289348@tenderseed.ccvalidators.com:29103 | [Link](https://github.com/dydxprotocol/networks/tree/main/dydx-testnet-3) |


### Chain info
```json
{
  "rpc": "3.139.242.161:26657",
  "rest": "3.139.242.161:1317",
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
