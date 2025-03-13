# Trading Fees

The dYdX Chain uses a tiered fee structure based on 30-day trailing trading volume.

| Tier | 30d Trailing Volume                   | Taker (bps) | Maker (bps) |
| ---- | ------------------------------------- | ----------- | ----------- |
| 1    | < $1M                                 | 5.0         | 1.0         |
| 2    | ≥ $1M                                 | 4.5         | 1.0         |
| 3    | ≥ $5M                                 | 4.0         | 0.5         |
| 4    | ≥ $25M                                | 3.5         | —           |
| 5    | ≥ $125M                               | 3.0         | —           |
| 6    | ≥ $125M and ≥0.5% exchange mkt. share | 2.5         | -0.5        |
| 7    | ≥ $125M and ≥1% maker mkt. share      | 2.5         | -0.7        |
| 8    | ≥ $125M and ≥2% maker mkt. share      | 2.5         | -0.9        |
| 9    | ≥ $125M and ≥4% maker mkt. share      | 2.5         | -1.1        |

> Negative maker fees represent rebates where traders earn a percentage of the notional value when providing liquidity as makers.

- **Taker Fees**: Applied when you remove liquidity from the order book (market orders, limit orders that cross the spread)
- **Maker Fees/Rebates**: Applied when you add liquidity to the order book (limit orders that don't cross the spread)
- **Volume Calculation**: Includes trading activity across all your subaccounts and markets

## Onchain Parameters

Fee tiers are set by governance and can be queried from a full node with the `/dydxprotocol/v4/feetiers/perpetual_fee_params` RPC endpoint.

For example:

https://dydx-ops-rest.kingnodes.com/dydxprotocol/v4/feetiers/perpetual_fee_params

## More Info

For more detailed information about trading rewards, fee structures, and parameters, please see the [Rewards, Fees and Parameters](./concepts-trading/rewards_fees_and_parameters.md) section.
