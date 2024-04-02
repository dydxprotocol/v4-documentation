# Using Cosmovisor to stage dYdXChain binary upgrade 

## Prerequisite

1. Linux (Ubuntu Server 22.04.3 recommended)
2. 8-cpu (ARM or x86_64), 64 GB RAM, 500 GB SSD NVME Storage
3. Already installed dYdXChain full node

## Preparation

1. Install Go from https://go.dev/doc/install (Version tested is 1.22.1)
2. Install Cosmovisor, with the following command:
go install cosmossdk.io/tools/cosmovisor/cmd/cosmovisor@latest
3. Copy cosmovisor from $HOME/go/bin/ to a directory in your $PATH
4. Add two environment variables to $HOME/.profile.  The data directory is typically $HOME/.dydx-mainnet-1
export DAEMON_NAME=dydxprotocold
export DAEMON_HOME=<your data directory>
5. Log out and log back in.
6. Initialize Cosmovisor with the following command.  The <path to executable> is the the full path to dydxprotocold
cosmovisor init <path to executable>
7.Cosmovisor is now ready for use.

## Running dydxprotocold under Cosmovisor

You have to change the way you currently run dydxprotocold to run under Cosmovisor.  This is done simply by specifying “cosmovisor run” in place of the “dydxprotocold” command you used previously.  Therefore, if you previously used “dydxprotocold start --p2p.seeds="ade4d8…”, you would change that to “cosmovisor run start --p2p.seeds="ade4d8…”

## Staging upgrade

1. The Cosmovisor directory structure looks like this:

<img width="505" alt="Screenshot 2024-04-01 at 7 31 42 PM" src="https://github.com/TommyGarch/v4-documentation/assets/130097657/f7ed283f-4f6f-4ff6-8f73-490dc44c2388">

2. To stage an upgrade, you would create a <name> directory inside the upgrades/ directory.  For example, as of 4/1/2024, the current version is v3.0.0 and the next upgrade version is v4.0.0.  Therefore you would create a directory called “v4.0.0” and then a bin directory inside it.

<img width="700" alt="Screenshot 2024-04-01 at 7 32 11 PM" src="https://github.com/TommyGarch/v4-documentation/assets/130097657/62d68c4a-b081-4778-87b9-6fae206a8f9e">

3. Now, download the upgraded binary and put it inside the bin directory created previously.  It must be named dydxprotocold

4. Restart dydxprotocold with Cosmovisor.  Now, Cosmovisor will automatically halt the current binary at the block activation height and start the upgrade binary.
