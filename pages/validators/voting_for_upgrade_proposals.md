# Voting for upgrade proposals

## Save your Chain ID in `dydxprotocold` config

Save the `chain-id`. This will make it so you do not have to manually pass in the chain-id flag for every CLI command.

```bash
dydxprotocold config chain-id [chain_id]
```

## View the status of a proposal

To view the status of a proposal, use the following command:

```bash
dydxprotocold query gov proposal [proposal_id]
```

The status of the proposal will be returned:

```bash
deposit_end_time: "2023-04-02T19:21:27.467932675Z"
final_tally_result:
  abstain_count: "0"
  no_count: "0"
  no_with_veto_count: "0"
  yes_count: "0"
id: "1"
messages:
- '@type': /cosmos.upgrade.v1beta1.MsgSoftwareUpgrade
  authority: dydx10d07y265gmmuvt4z0w9aw880jnsr700jnmapky
  plan:
    height: "60400"
    info: ""
    name: v0.1.0
    time: "0001-01-01T00:00:00Z"
    upgraded_client_state: null
metadata: ""
proposer: dydx199tqg4wdlnu4qjlxchpd7seg454937hjrknju4
status: PROPOSAL_STATUS_VOTING_PERIOD
submit_time: "2023-03-31T19:21:27.467932675Z"
summary: This is a proposal to schedule v0.1.0 software upgrade at block height 60400,
  estimated to occur on Tuesday April 4th at 1PM EDT.
title: dYdX Protocol v1.0.0 Upgrade
total_deposit:
- amount: "10000000"
  denom: stake
voting_end_time: "2023-03-31T19:22:27.467932675Z"
voting_start_time: "2023-03-31T19:21:27.467932675Z"
```

## Voting for a proposal

To vote for a governance proposal, use the following command:

```bash
dydxprotocold tx gov vote [proposal_id] [option] --from [key]
```

The option can be either `Yes`, `No`, `NoWithVeto`, `Abstain`. See [here](https://docs.cosmos.network/v0.47/modules/gov#option-set) for the descriptions of the these options.

## To see the votes

```bash
dydxprotocold query gov votes [proposal_id]
```

```bash
pagination:
  next_key: null
  total: "0"
votes:
- metadata: ""
  options:
  - option: VOTE_OPTION_YES
    weight: "1.000000000000000000"
  proposal_id: "1"
  voter: dydx199tqg4wdlnu4qjlxchpd7seg454937hjrknju4
...
```

## To see the tally of votes

To query tally of votes on a proposal:

```bash
dydxprotocold query gov tally [proposal_id]
```

This will return something like:

```bash
abstain_count: "0"
no_count: "0"
no_with_veto_count: "0"
yes_count: "0"

```
