# Network Constants

## Native Token Denom

```
NATIVE_TOKEN_DENOM=adydx
```

## Chain ID

```
CHAIN_ID=dydx-mainnet-1
```

## Chain Registry

```json
{
  "rpc": "https://dydx-dao-rpc.polkachu.com:26657",
  "rest": "https://dydx-dao-api.polkachu.com",
  "chainId": "dydx-mainnet-1",
  "chainName": "dYdX Chain",
  "chainSymbolImageUrl": "https://raw.githubusercontent.com/cosmos/chain-registry/master/dydx/images/dydx.png",
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
    "coinDenom": "DYDX",
    "coinDecimals": 18,
    "coinMinimalDenom": "adydx",
  },
  "currencies": [
    {
      "coinDenom": "DYDX",
      "coinDecimals": 18,
      "coinMinimalDenom": "adydx",
    },
    {
      "coinDenom": "USDC",
      "coinDecimals": 6,
      "coinMinimalDenom": "ibc/8E27BA2D5493AF5636760E354E46004562C46AB7EC0CC4C1CA14E9E20E2545B5",
    }
  ],
  "feeCurrencies": [
    {
      "coinDenom": "DYDX",
      "coinDecimals": 18,
      "coinMinimalDenom": "adydx",
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