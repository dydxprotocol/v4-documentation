# Staking Rewards

Staking rewards are designed to reward `Validators` and `Stakers` (=Delegators). The sources of staking rewards are trading fees and gas fees collected by the protocol.

The protocol uses the [CosmosSDK’s x/distribution module](https://docs.cosmos.network/main/build/modules/distribution) to allocate the accrued trading and gas fees to `Validators` and `Stakers`.

![Staking Rewards](../../artifacts/staking_rewards.png)

All trading fees (`USDC`) and gas fees (`USDC` and `NATIVE_TOKEN`) collected by the protocol are accrued and distributed within a block. Specifically — for each block, the fees generated are collected in `fee_collector` module account and then sent to the `distribution` module account in the following block. Then, the `community_tax` and `validator_commission` are subtracted from the collected pool and the resulting amount will be distributed to Validators and Stakers in accordance with their staked token amount.

>💡 Note that `Stakers` must claim the rewards manually. Unclaimed rewards will remain in the distribution module account until they are claimed.

## Details

```
Staking Rewards = 
fee pool * (# of delegator's staked tokens / total # of staked tokens) * (1 -
community tax rate) * (1 - validator commission rate)
```

The details of how the Staking Rewards are calculated can be found in the [CosmosSDK’s x/distribution documentation](https://docs.cosmos.network/main/build/modules/distribution#the-distribution-scheme).

## Parameters

>💡 The current configuration and parameters can be found by querying the network.

- `x/distribution/community_tax` : specifies the proportion of fee pool that should be sent to `community_treasury` before staking rewards are distributed. This value can be configured via gov.
- `x/staking/validator_commission` : specifies the proportion of the staking rewards that a given validator will take from delegator’s reward. This is configured per validator and can be updated by the validator.

See [CosmosSDK doc](https://docs.cosmos.network/main/build/modules/distribution#params) for details.
