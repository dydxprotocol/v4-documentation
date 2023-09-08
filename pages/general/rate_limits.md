## Rate Limits

All rate limits are subject to change.

### Cancel Order Rate Limits

Canceling orders is rate limited per order type and account and is applied over a number of blocks:

| Order Type               | # Blocks | Limit     |
| ------------------------ | -------- | --------- |
| Short-term               | 1        | 50        |
| Long-term or Conditional | 1        | Unlimited |

### Place Order Rate Limits

Placing orders is rate limited per order type and account and is applied over a number of blocks:

| Order Type               | # Blocks | Limit |
| ------------------------ | -------- | ----- |
| Short-term               | 1        | 50    |
| Long-term or Conditional | 1        | 2     |
| Long-term or Conditional | 100      | 20    |

For example, 2 long-term orders can be placed for each of the first 10 blocks and then a new long-term order would be rate limited on the 11th block since the limit of 20 long-term orders over the past 100 blocks would apply.
