## Other Limits

Subaccounts may have a limited number of open orders at any one time determined by the net collateral of the subaccount as per:

| Net Collateral | Long-term or Conditional orders |
| -------------- | ------------------------------- |
| < $20          | 0                               |
| >= $20 and < $100         | 4                               |
| >= $100 and < $1,000       | 8                               |
| >= $1,000 and < $10,000      | 10                              |
| >= $10,000 and < $100,000     | 100                             |
| >= $100,000      | 200                             |

For example up to 10 open bids across all markets for a subaccount with a net collateral of $2,000.

Note that short term orders via API And all limit `Immediate-or-Cancel`, `Fill-or-Kill`, and market orders on the frontend do not have this limitation.
