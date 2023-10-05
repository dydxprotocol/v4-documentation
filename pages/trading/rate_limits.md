## Rate Limits

All rate limits are subject to change.

### Cancel Order Rate Limits

Canceling short-term orders is rate limited per account and is applied over a number of blocks:

| # Blocks | Limit     |
| -------- |-----------|
| 1        | 200       |

Canceling long-term or conditional orders is not rate limited.

### Place Order Rate Limits

Placing short-term orders is rate limited per account and is applied over a number of blocks:

| # Blocks | Limit |
| -------- |-------|
| 1        | 200   |

Placing long-term or conditional orders is rate limited per subaccount and is applied over a number of blocks:

| # Blocks | Limit |
| -------- |-------|
| 1        | 2     |
| 100      | 20    |

For example, in a given subaccount 2 long-term orders can be placed for each of the first 10 blocks and then a new long-term order would be rate limited on the 11th block since the limit of 20 long-term orders over the past 100 blocks would apply.
