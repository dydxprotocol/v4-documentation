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
* Frontends (Web, Mobile) will use subaccount numbers `TODO` for isolated market trading.

## Transfer from main account to subaccounts
Use deposit transaction

## Transfer from subaccount to main account
Use withdraw transaction

## Transfer from subaccount to subaccount
Use transfer transaction

Note: Transactions (which require gas requires native token) in your main account, which has a separate balance from your subaccount.

Things to mention:
* How to determine quantums
* How to pull current balance (main account vs subaccount)