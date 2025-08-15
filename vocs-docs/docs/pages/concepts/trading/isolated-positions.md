# Isolated Positions

**Isolated positions** on the **dYdX frontend** are perpetual positions held in subaccounts with a subaccount number greater than 127, up to the limit of 128,000. Each isolated position is held in a separate subaccount.

:::tip
**Isolated positions** are a feature provided and managed by the **dYdX frontend** (web) interface. This page provides information on how to integrate this feature into your API-based implementation.
:::

## Mapping of isolated positions to subaccounts

The dYdX frontend implementation separates subaccounts (0 - 128,000) into 2 separate types.

### Parent subaccounts

Subaccounts 0 to 127 are parent subaccounts. Parent subaccounts can have multiple positions opened and all positions are cross-margined.

### Child subaccounts

Subaccounts 128 to 128,000 are child subaccounts. Child subaccounts will only ever have up to 1 position open. Each open isolated position on the frontend is held by a separate child subaccount.
Once an isolated position is closed in the frontend, the subaccount associated with isolated position can be re-used for the next isolated position.

Child subaccounts are mapped to parent subaccounts using the formula:
e.g. parent subaccount 0 has child subaccounts 128, 256,...
parent subaccount 1 has child subaccounts 129, 257,...

```
parent_subaccount_number = child_subaccount_number % 128
```

> Note that currently only parent subaccount 0 is exposed via the frontend and so isolated positions will be held in subaccounts number 128, 256, ...

> Note that the above "types" of subaccounts are not enforced at a protocol level, and only on the frontend. Any subaccount can hold any number of positions in cross-marginable markets which all will cross-margined at the protocol level.

## Getting data for parent subaccount

API endpoints exist to get data for a parent subaccount and all it's child subaccounts on the Indexer.

> Currently all data for an account viewable on the frontend can be fetched by using the parent subaccount APIs to fetch data for parent subaccount number 0.

See the [Indexer API](../../indexer-client/http/accounts/get_parent_subaccount) page for more details of the parent subaccount APIs.
