# Running a full node

# Staying up to date with latest state

Here are a few recommendations to stay up to date with the latest state.

## Connecting to Healthy Peers

In order for the full node to have the latest state, it needs to connect to peers which have the latest state Use the following links to get a list of live peers which have the latest state

https://services.lavenderfive.com/mainnet/dydx#live-peers

https://polkachu.com/live_peers/dydx

Update `persistent_peers`  in the config.toml file to include a randomly selected list of 5 peers from the list of live peers obtained using the links above

## Snapshots

Snapshots contain a compressed copy of the chain data which allow the full node to bootstrap to a recent state in the blockchain. A list of snapshot services can be found here https://docs.dydx.exchange/network/resources#snapshot-service. 

## State sync(Alternative to snapshots)

State Sync enables a new node to join the network by obtaining a snapshot of the application state from a state sync node at a recent height. This eliminates the need to fetch and replay all historical blocks. A list of state sync services with instructions are listed below

https://polkachu.com/state_sync/dydx

https://services.lavenderfive.com/mainnet/dydx/statesync

https://autostake.com/networks/dydx/ca

## Address Book

The **`addrbook.json`** file is used to store configuration details that help a node connect to other peers in the network more efficiently. This can be obtained from the one of the below services and needs to be stored in the `config` folder.

https://polkachu.com/addrbooks/dydx

https://services.lavenderfive.com/mainnet/dydx#latest-addrbook

https://autostake.com/networks/dydx/

# Pruning Settings

For optimal storage, use the following pruning setting in the app.toml file:

```bash
# 2 latest states will be kept; pruning at 10 block intervals.
pruning = "everything"
```

If the full node is being used for historical queries, a custom strategy should be used to maintain more states. This will increase storage requirements.