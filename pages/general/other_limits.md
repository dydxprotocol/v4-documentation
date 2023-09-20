## Other Limits

Accounts may have a limited number of open orders for a given market/side pair at any one time determined by the net collateral of the account as per:

| Net Collateral | Short-term orders | Long-term or Conditional orders |
| -------------- | ----------------- | ------------------------------- |
| < $20          | 0                 | 0                               |
| >= $20 and < $100         | 1                 | 1                               |
| >= $100 and < $1,000       | 5                 | 5                               |
| >= $1,000 and < $10,000      | 10                | 10                              |
| >= $10,000 and < $100,000     | 100               | 100                             |
| >= $100,000      | 200               | 200                             |

For example up to 10 open `BTC-USD` bids for an account with a net collateral of $2,000.

Note that short-term `Immediate-or-Cancel` and `Fill-or-Kill` orders are always allowed.
