# Withdrawal rate limits and gating

In an effort to reduce risk across the protocol, withdrawals can be rate limited and gated in specific circumstances. 
​

## Withdrawal rate limits

As a default setting, withdrawals of Noble USDC are rate limited to ```max(1% of TVL, $1mm) per hour```

As a default setting, withdrawals of Noble USDC are rate limited to ```max(10% of TVL, $10mm) per day```

These rate limit parameters can be updated by governance.

 

## Withdrawal gating

All subaccount transfers and withdrawals will be gated for 50 blocks if a negative collateralized subaccount is seen in state and/or can't be liquidated or deleveraged

All subaccount transfers and withdrawals will also be gated for 50 blocks if a 5+ minute chain outage occurs.
