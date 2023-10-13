## Testnets

To join the testnet network, you need to:
1. run the correct binary version and 
2. specify the correct `genesis.json` and
3. use the correct `seed node` info

The info for 1 and 2 can be found in [`v4-testnets` repository](https://github.com/dydxprotocol/v4-testnets).

### Seed Node for `dydx-testnet-4`

* Lavender.Five: `20e1000e88125698264454a884812746c2eb4807@seeds.lavenderfive.com:23856`
* Crosnest: `87ee8de5f0f82af6ee6740a30f8844bbe6434413@seed.dydx-testnet.cros-nest.com:26656`
* CryptoCrew: `38e5a5ec34c578dc323cbdd9b98330abb448d586@tenderseed.ccvalidators.com:29104`
* StakingCabin: `182ab0015fb4b7d751b12a9c0162ac123445eac1@seed.dydx-testnet.stakingcabin.com:26656`
* StakerSpace: `76b472b107ccf20c3d6c110c4a2a217306d2dedb@dydx-seed.staker.space:26656`

### Chain info
```json
{
  "rpc": "https://dydx-testnet-archive.allthatnode.com:26657",
  "rest": "https://dydx-testnet-archive.allthatnode.com:1317",
  "chainId": "dydx-testnet-4",
  "chainName": "dYdX Public Testnet",
  "chainSymbolImageUrl": "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/dydx-testnet-4/chain.png",
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
    "coinDecimals": 18,
    "coinMinimalDenom": "adv4tnt",
  },
  "currencies": [
    {
      "coinDenom": "DV4TNT",
      "coinDecimals": 18,
      "coinMinimalDenom": "adv4tnt",
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
      "coinDecimals": 18,
      "coinMinimalDenom": "adv4tnt",
    }
  ],
  "features": []
}
```
