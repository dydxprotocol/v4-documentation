# Slashing a validator

The chain supports slashing of misbehaving validators through governance vote.

## Proposal Message

The proposal should contain a single [MsgSlashValidator](https://github.com/dydxprotocol/v4-chain/blob/protocol/v4.0.0/proto/dydxprotocol/govplus/tx.proto#L1A9) message for each validator that should be slashed.

Notes:
- The slashing will occur when the proposal is passed, not the `infraction_height`.
- The `infraction_height` must be set so that `time(proposal pass height) - time(infraction_height) < unbonding period`. Typically a good choice for `infraction_height` is the current height unless there is a recent unbonding undelegation/redelegation that should be included in the slash. In that case the `infraction_height` should be set prior to the initiation of the undelegation/redelegation.
- Both `tokens_at_infraction_height` and `slash_factor` must be set correctly, otherwise undelegations and redelegations might be slashed disproportionately to the rest of the validator's stake. `tokens_at_infraction_height * slash_factor` determines the total amount of tokens to be slashed. Unbonding delegations and redelegations are first slashed by `slash_factor`, and then the remaining amount is taken from the validator's stake.
- The x/staking `HistoricalInfo` query endpoint can be used to find the correct value for `tokens_at_infraction_height`.
- See the [MsgSlashValidator](https://github.com/dydxprotocol/v4-chain/blob/protocol/v4.0.0/proto/dydxprotocol/govplus/tx.proto#L19) inline comments for further details on the above requirements.

### Example Proposal Json

Below is an example proposal JSON file to propose a slashing a validator's total bonded tokens (both user delegated and self-delegated) by 0.2 at block height 5000. In other words:
* assuming that the proposal passes governance vote
* assuming that the validator has 1000 total bonded tokens at height 5000
* once the proposal is passed, the validator will lose 200 tokens
* if there are unbonding undelegations and redelegations since height 5000, they will lose 0.2 of their stake, and the remaining will be taken from the validator for a total of 200 tokens lost
```json
{
    "title": "Slash a validator",
    "summary": "We are proposing to slash this misbehaving validator for X reasons.",
    "deposit": "10000000000000000000000adv4tnt",
    "messages": [
        {
          "@type": "/dydxprotocol.govplus.MsgSlashValidator",
          "authority": "dydx10d07y265gmmuvt4z0w9aw880jnsr700jnmapky",
          "validator_address": "dydxvalcons1z79h40nmd777scs93qjxaeak8m2cl6hpqg2rx9",
          "slash_factor": "0.2",
          "tokens_at_infraction_height": "1000",
          "infraction_height": 5000
        }
    ]
}
  ```

## Submitting an Onchain Proposal

Follow instructions [here](./submitting_a_proposal.md) to submit an onchain proposal.
