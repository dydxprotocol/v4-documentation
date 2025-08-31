# Snapshots

Two types of snapshots are available for the dYdX chain, both serving as crucial tools for node operators and network resilience. Snapshots are essential for quickly spinning up new nodes or recovering from failed upgrades without the need to sync from block 1.

## data snapshots

Data snapshots are standard backups of the dYdX chain state. These snapshots are provided by various network services. They offer a fast and reliable way to get a node up and running without undergoing a full state sync from genesis. You can find a list of providers for these services on the [infrastructure providers page](../infrastructure_providers-network/resources.mdx#snapshot-service).

## KYVE snapshots

[KYVE](https://kyve.network) is a decentralized protocol designed to create verifiable, permanent archives of the entire dYdX chain.
The data is immutably stored, making it a highly reliable source for node operators.

You can use this archived data to bootstrap a new node using [Ksync](https://docs.kyve.network/access-data-sets/ksync/overview), KYVE's dedicated tool. Ksync allows a new node to start from a specific, verified snapshot, significantly reducing sync time and ensuring data integrity. This process is particularly useful for:

**New Node Setup**: Starting a new node without syncing the entire chain history.

**Disaster Recovery**: Restoring a node from a known-good state if an upgrade or an issue corrupts the local data.

You can access the KYVE snapshots and the Ksync tool directly from the [KYVE dYdX page](https://app.kyve.network/#/KSYNC?source=dYdX).
