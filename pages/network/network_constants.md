# Network Constants

## Native Token Denom

```
NATIVE_TOKEN_DENOM=adv4tnt
```

## Chain ID

```
CHAIN_ID=dydx-testnet-4
```

## Chain Registry

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
      "coinDecimals": 6,
      "coinMinimalDenom": "ibc/8E27BA2D5493AF5636760E354E46004562C46AB7EC0CC4C1CA14E9E20E2545B5",
    }
  ],
  "feeCurrencies": [
    {
      "coinDenom": "DV4TNT",
      "coinDecimals": 18,
      "coinMinimalDenom": "adv4tnt",
    },
    {
      "coinDenom": "USDC",
      "coinDecimals": 6,
      "coinMinimalDenom": "ibc/8E27BA2D5493AF5636760E354E46004562C46AB7EC0CC4C1CA14E9E20E2545B5",
    }
  ],
  "features": []
}
```