# How to transfer

## Account types

**Main Account**
* Otherwise known as your wallet/address account.
* This account holds assets that are sent to/from the chain, including assets used for gas and collateral.
* Gas for transactions is used from the main account.
* Main accounts cannot not trade.

**Subaccount**
* Subaccounts are used to trade.
* Each main account can have many subaccounts.
* Each subaccount is uniquely identified using `(main account address, integer)`
* Only the main account can send transactions on behalf of a subaccount.
* Subaccounts do not require gas to trade (they will use the main account's gas).
* Subaccounts require collateral token (currently USDC) in order to trade.

## Subaccount types

**Cross-margin Subaccount**
* Cross-margin subaccounts are able to trade positions for all cross markets.
* Cross-margin subaccounts share a single collateral pool for all positions.
* Cross-margin subaccounts are not able to trade isolated markets.
* Frontends (Web, Mobile) will use subaccount number `0` for all cross-margin trading.

**Isolated Subaccount**
* Isolated subaccounts are able to trade positions for single isolated market at a time.
* Isolated subaccounts are not able to trade cross markets.
* Frontends (Web, Mobile) will use subaccount numbers `(TODOx - TODOy)` for isolated market trading.

## Transfer from main account to subaccounts
The `deposit` transaction must be used to perform this transfer.

Parameters ([link](https://github.com/dydxprotocol/v4-chain/blob/main/proto/dydxprotocol/sending/transfer.proto#L31))

## Transfer from subaccount to main account
The `withdraw` transaction must be used to perform this transfer.

Parameters ([link](https://github.com/dydxprotocol/v4-chain/blob/main/proto/dydxprotocol/sending/transfer.proto#L50))

## Transfer from subaccount to subaccount
The `transfer` transaction must be used to perform this transfer.

Parameters ([link](https://github.com/dydxprotocol/v4-chain/blob/main/proto/dydxprotocol/sending/transfer.proto#L13))

## Determining parameters

* Asset
Asset ID can be fetched using the `/dydxprotocol/assets/asset` endpoint. [Example](https://dydx-api.lavenderfive.com:443/dydxprotocol/assets/asset)

* Quantums
For collateral token, multiply by 10^6. For example, `100 USDC = 100_000_000 quantums`
  
## Pulling current balance

TODO
