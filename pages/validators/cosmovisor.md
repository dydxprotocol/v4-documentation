# Setting up Cosmovisor
## Installation

### Using go install

To install the latest version of `cosmovisor`, run the following command:

```bash
go install cosmossdk.io/tools/cosmovisor/cmd/cosmovisor@latest
```

### Manual Build

You can also install from source by pulling the cosmos-sdk repository and switching to the correct version and building as follows:

```bash
git clone https://github.com/cosmos/cosmos-sdk.git
cd cosmos-sdk
git checkout cosmovisor/vx.x.x
make cosmovisor
```

This will build cosmovisor in `/cosmovisor`
 directory. Afterwards you may want to put it into your machine's PATH like as follows:

```bash
cp cosmovisor/cosmovisor ~/go/bin/cosmovisor
```

To check your CosmoVisor version, run

```bash
cosmovisor version
```

## Directory structure

```
.
├── current -> genesis or upgrades/<name>
├── genesis
│   └── bin
│       └── $DAEMON_NAME
└── upgrades
    └── <name>
        ├── bin
        │   └── $DAEMON_NAME
        └── upgrade-info.json
```

## Initializing Cosmovisor

1. Rename binary to `dydxprotocold`

```bash
mv dydxprotocold.<version>-<platform> dydxprotocold
```

2. Set the environment variables 

```bash
export DAEMON_NAME=dydxprotocold
export DAEMON_HOME=<your directory>
```

3. The directory structure can be initialized with 

```bash
cosmovisor init <path to executable>
```

- `DAEMON_HOME` should be set to the **validator’s home directory** since CosmoVisor polls `/data/` for upgrade info.
- `DAEMON_NAME` should be set to `dydxprotocold`

## How to run

`cosmovisor` is simply a thin wrapper around Cosmos applications. Use the following command to start a validator using `cosmovisor` .

```bash
cosmovisor run arg1 arg2 arg3 ...
```

All arguments passed to `cosmovisor run` will be passed to the application binary (as a subprocess). `cosmovisor` will return `/dev/stdout` and  `/dev/stderr` of the subprocess as its own.

Example:

```bash
cosmovisor run start —log-level info —home /dydxprotocol/chain/.alice
```

runs 

```bash
dydxprotocold start —log-level info —home /dydxprotocol/chain/.alice
```

as its subprocess.
