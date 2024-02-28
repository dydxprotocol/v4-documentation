# Network Constants

## Native Token Denom

```
# For the deployment by DYDX token holders
NATIVE_TOKEN_DENOM=adydx
```

```
# For testnet
NATIVE_TOKEN_DENOM=adv4tnt
```

## Chain ID

```
# For the deployment by DYDX token holders
# CHAIN_ID=dydx-mainnet-1
```

```
# For testnet
CHAIN_ID=dydx-testnet-4
```

## Chain Registry

For **the deployment by DYDX token holders**, use the below:

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

For **Testnet**, use the below:

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

# Disclaimer
Note that as of the date hereof, the testnet and dYdX Chain deployment by DYDX token holders are the only known deployments of the dYdX v4 software, and other deployment options may be added. For more information, please see https://dydx.exchange/dydx-chain-front-end-options
