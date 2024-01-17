## CLI commands

### Deposit to Subaccount

```bash
dydxprotocold tx sending deposit-to-subaccount <sender_key_or_address> <recipient_address> <recipient_subaccount_number> <quantums> [flags]
```

Example:
```bash
NATIVE_TOKEN_DENOM=adv4tnt
dydxprotocold tx sending deposit-to-subaccount dydx1g2ygh8ufgwwpg5clp2qh3tmcmlewuyt2z6px8k dydx1g2ygh8ufgwwpg5clp2qh3tmcmlewuyt2z6px8k 0 <usdc_quantum_uint64> --keyring-backend test --fees 5000$NATIVE_TOKEN_DENOM
```
Note: Token denoms for transfer amounts and fees can be found [here](https://docs.dydx.exchange/networks/network1/network_constants#native-token-denom)


### Withdraw from Subaccount

```bash
dydxprotocold tx sending withdraw-from-subaccount <sender_key_or_address> <sender_subaccount_number> <recipient_address> <quantums> [flags]
```

Example:
```bash
NATIVE_TOKEN_DENOM=adv4tnt
dydxprotocold tx sending withdraw-from-subaccount dydx1g2ygh8ufgwwpg5clp2qh3tmcmlewuyt2z6px8k 0 dydx1g2ygh8ufgwwpg5clp2qh3tmcmlewuyt2z6px8k <usdc_quantum_uint64> --keyring-backend test --fees 5000$NATIVE_TOKEN_DENOM
```