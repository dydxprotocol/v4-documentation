# Slashing a validator

The chain supports slashing of misbehaving validators through governance vote.

## Proposal Message

The proposal should contain a single [MsgSlashValiator](https://github.com/dydxprotocol/v4-chain/blob/protocol/v4.0.0/proto/dydxprotocol/govplus/tx.proto#L19) message for each validator that should be slashed. See the inline comments for details on each field.

**💡 Important: Both `tokens_at_infraction_height` and `slash_factor` must be set correctly, otherwise undelegations and redelegations might be slashed disproportionately to the rest of the validator's stake.**

### Example Proposal Json

Below is an example proposal JSON file to propose a slashing a validator's total bonded tokens (= total stake, which includes both user delegated and self-delegated) by 0.2 at block height 5000. In other words:
* assuming that the proposal passes governance vote
* assuming that the validator has 1000 total bonded tokens at height 5000
* once the block height reaches 5000, the validator will lose 200 tokens
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
          "tokens_at_infraction_height": "500000000000000000000000",
          "infraction_height": 7647362
        }
    ]
}
  ```

## Submitting an Onchain Proposal

Follow instructions [here](./submitting_a_proposal.md) to submit an onchain proposal.


#### Disclaimer
Users considering using the permissionless markets function of the dYdx v4 software are 
encouraged to consult qualified legal counsel to ensure compliance with the laws of their 
jurisdiction. The information on this page does not constitute and should not be relied on as 
investment, legal, or any other form of professional advice. This page does not recommend 
any specific market, and analyzes only compatibility and functionality from a technical 
standpoint. Use of the v4 software is prohibited in the United States, Canada, and 
sanctioned jurisdictions as described in the [v4 Terms of Use](https://dydx.exchange/v4-terms).
