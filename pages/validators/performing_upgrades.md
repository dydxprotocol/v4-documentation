# Performing upgrades

## Running a validator and managing upgrades

Validators can choose how to run a validator and manage software upgrades according to their preferred option:

1. Using `cosmovisor`
2. Manual

`cosmovisor` is a small process manager for Cosmos SDK application binaries that monitors the governance module for incoming chain upgrade proposals. If it sees a proposal that gets approved, `cosmovisor` can automatically download the new binary, stop the current binary, switch from the old binary to the new one, and finally restart the node with the new binary.

We recommend validators to use `cosmovisor` to run their nodes. This will make low-downtime upgrades smoother, as validators don’t have to manually upgrade binaries during the upgrade. Instead, they can pre-install new binaries, and `cosmovisor` will automatically update them based on the on-chain software upgrade proposals.

### Installation instructions

See [here](https://v4-mainnet-docs.vercel.app/validators/cosmovisor)  for installation instructions.

---

## Upgrades


Releases for the dYdX chain will use [semantic versioning](https://semver.org/). See [here](https://v4-mainnet-docs.vercel.app/validators/types_of_upgrades) for details.


### ⚒️ Cosmovisor Users

#### Upgrading to a new Major/Minor Version (e.g. v0.1.0)

1. Download the [binary](https://github.com/dydxprotocol/v4-chain/releases) for the new release, rename the binary to `dydxprotocold`.

```bash
mv dydxprotocold.<version>-<platform> dydxprotocold
```

2. Make sure that the new binary is executable. 

```bash
chmod 755 dydxprotocold
```

3. Create a new directory `$DAEMON_HOME/cosmovisor/upgrades/<name>/bin` where `<name>` is the URI-encoded name of the upgrade as specified in the Software Upgrade Plan.

```bash
mkdir -p $DAEMON_HOME/cosmovisor/upgrades/<name>/bin
```

4. Place the new binary under `$DAEMON_HOME/cosmovisor/upgrades/<name>/bin` before the upgrade height.


```bash
mv <path_to_major_version> $DAEMON_HOME/cosmovisor/upgrades/<name>/bin
```

💡 **IMPORTANT**: Do this before the upgrade height, so that `cosmovisor` can make the switch.

That’s it! The old binary will stop itself at the upgrade height, and `cosmovisor` will switch to the new binary automatically. For a `Plan` with name `v0.1.0`, your `cosmovisor/` directory should look like this:

```
cosmovisor/
├── current/   # either genesis or upgrades/<name>
├── genesis
│   └── bin
│       └── dydxprotocold
└── upgrades
    └── v0.1.0
        ├── bin
           └── dydxprotocold
```

#### Upgrading to a Patch Version (e.g. v0.0.2)

1. Download the [binary](https://github.com/dydxprotocol/v4-chain/releases) for the new patch release, rename the binary to `dydxprotocold`. 

```bash
mv dydxprotocold.<version>-<platform> dydxprotocold
```

2. Make sure that the new binary is executable. 

```bash
chmod 755 dydxprotocold
```

3. Replace the binary under `$DAEMON_HOME/cosmovisor/current/bin` with the new binary.

```bash
mv <path_to_patch_version> $DAEMON_HOME/cosmovisor/current/bin
```

4. Stop the current binary (e.g. Ctrl+C)
5. Restart `cosmovisor`

```bash
cosmovisor run start --p2p.seeds="[seed_node_id]@[seed_node_ip_addr]:26656" 
```

### 🦾 Manual Users

#### Upgrading to a Major/Minor Version (e.g. v0.1.0)

1. Download the [binary](https://github.com/dydxprotocol/v4-chain/releases) for the new release.
    1. Ideally also before the upgrade height to minimize downtime
2. Make sure that the new binary is executable. 

```bash
chmod 755 dydxprotocold
```

3. Wait for the old binary to stop at the upgrade height (this should happen automatically).
4. Restart the application using the **new binary from step 1**.

```bash
./dydxprotocold start --p2p.seeds="[seed_node_id]@[seed_node_ip_addr]:26656"
```

#### Upgrading to a Patch Version (e.g. v0.0.2)

1. Download the [binary](https://github.com/dydxprotocol/v4-chain/releases) for the new release.
2. Make sure that the new binary is executable.

```bash
chmod 755 dydxprotocold
```

3. Stop the current binary (e.g. Ctrl+C)
4. Restart the application using the new binary from step 1.

```bash
./dydxprotocold start --p2p.seeds="[seed_node_id]@[seed_node_ip_addr]:26656"
```

---

## Rollback


In the case of an unsuccessful chain upgrade, an incorrect `AppHash` might get persisted by Tendermint. To move forward, validators will need to rollback to the previous state so that upon restart, Tendermint can replay the last block to get the correct `AppHash`.


### ⚒️ Cosmovisor Users

Cosmovisor backs up the `data` directory before attempting an upgrade. To restore to a previous version:

1. Stop the node (e.g. Ctrl+C)
2. Then, copy the contents of your backup data directory back to `~/.dydxprotocol`

```bash
rm -rf ~/.dydxprotocol/data
mv ~/.dydxprotocol/data-backup-YYYY-MM-DD ~/.dydxprotocol/data
```

3. Restart your node.

```bash
cosmovisor run start --p2p.seeds="[seed_node_id]@[seed_node_ip_addr]:26656" 
```

### 🦾 Manual Users

If you don’t have a data backup:

1. Stop the node (e.g. Ctrl+C)
2. Rollback the application and Tendermint state by one block height.

```bash
./dydxprotocold rollback
```

3. Restart your node.

```bash
./dydxprotocold start --p2p.seeds="[seed_node_id]@[seed_node_ip_addr]:26656"
```
