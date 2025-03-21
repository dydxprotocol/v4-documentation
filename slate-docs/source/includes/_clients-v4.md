<!-- # Clients

Python and TypeScript clients are available, allowing programmatic usage of dYdX.

## Python Client

This guide will help you get started with the dYdX Python SDK, which allows for asynchronous programming and interaction with the dYdX protocol.

### Installation

Install `dydx-v3-python` from [PyPI](https://pypi.org/project/dydx-v3-python) using `pip`:

<pre class="center-column">
pip install dydx-v4-client
</pre>

> Initialize

```python
from dydx_v4_client.network import make_testnet
from dydx_v4_client.node.client import NodeClient

CUSTOM_TESTNET = make_testnet(
    node_url="your-custom-testnet-node-url",
    rest_indexer="your-custom-testnet-rest-url",
    websocket_indexer="your-custom-testnet-websocket-url"
)

node = await NodeClient.connect(TESTNET.node)
```

### Usage

See [dydxprotocol/v4-clients](https://github.com/dydxprotocol/v4-clients/tree/main/v4-client-py-v2).

See the [examples]((https://github.com/dydxprotocol/v4-clients/tree/main/v4-client-py-v2/examples) folder for simple python examples.

## TypeScript Client

### Installation

Install `pnpm install @dydxprotocol/v4-client-js` from [NPM](https://www.npmjs.com/package/@dydxprotocol/v4-client-js):

<pre class="center-column">
pnpm install @dydxprotocol/v4-client-js
</pre>

### Usage

See [dydxprotocol/v4-client-js](https://github.com/dydxprotocol/v4-clients/tree/main/v4-client-js).

See the [examples](https://github.com/dydxprotocol/v4-clients/tree/main/v4-client-js/examples) folder for simple typescript examples.

> Initialize

```typescript
import { CompositeClient, Network } from "@dydxprotocol/v4-client-js";

    /**
    // For the deployment by DYDX token holders, use below:

    import { IndexerConfig, ValidatorConfig } from "@dydxprotocol/v4-client-js";

    const NETWORK: Network = new Network(
      'mainnet',
      new IndexerConfig(
        'https://indexer.dydx.trade',
        'wss://indexer.dydx.trade',
      ),
      new ValidatorConfig(
        'https://dydx-ops-rpc.kingnodes.com', // or other node URL
        'dydx-mainnet-1',
        {
          CHAINTOKEN_DENOM: 'adydx',
          CHAINTOKEN_DECIMALS: 18,
          USDC_DENOM: 'ibc/8E27BA2D5493AF5636760E354E46004562C46AB7EC0CC4C1CA14E9E20E2545B5',
          USDC_GAS_DENOM: 'uusdc',
          USDC_DECIMALS: 6,
        },
      ),
    );
    */
    const NETWORK = Network.testnet();

    const client = await CompositeClient.connect(NETWORK);
```

The Typescript client is organized into various clients

<aside class="notice">
The Python client uses a node client as opposed to these various clients.
</aside>

| Module     | Description                                                      |
|------------|------------------------------------------------------------------|
| `Composite`  | CompositeClient simplifies the transactions by transforming human readable parameters to chain-specific parameters.|
| `Validator` | Validator client   |
| `Indexer`   | Indexer client for read-only calls |
| `Socket`    | Websocket for streaming data read-only         |
| `Node`        | Python Node client                |

The following configuration options are available:

| Parameter                | Description                                                                                                                                                                          |
|--------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| host                     | The HTTP API host.                                                                                                                                                                   |
| api_timeout              | Timeout for HTTP requests, in milliseconds.                                                                                                                                          |
| default_ethereum_address | (Optional) The default account for Ethereum key auth and sending Ethereum transactions.                                                                                              |
| eth_private_key          | (Optional) May be used for Ethereum key auth.                                                                                                                                        |
| eth_send_options         | (Optional) Options for Ethereum transactions, see [`sendTransaction`](https://web3py.readthedocs.io/en/stable/web3.eth.html?highlight=signTransaction#web3.eth.Eth.sendTransaction). |
| network_id               | (Optional) Chain ID for Ethereum key auth and smart contract addresses. Defaults to `web3.net.version` if available, or `1` (mainnet).                                               |
| stark_private_key        | (Optional) STARK private key, used to sign orders and withdrawals.                                                                                                                   |
| web3                     | (Optional) Web3 object used for Ethereum key auth and/or smart contract interactions.                                                                                                |
| web3_account             | (Optional) May be used for Ethereum key auth.                                                                                                                                        |
| web3_provider            | (Optional) Web3 provider object, same usage as `web3`.                                                                                                                               |
| api_key_credentials      | (Optional) Dictionary containing the key, secret and passphrase required for the private module to sign requests.                                                                    |
| crypto_c_exports_path    | (Optional) For python only, will use faster C++ code to run hashing, signing and verifying. It's expected to be compiled from the `crypto_c_exports` target from Starkware's [repository](https://github.com/starkware-libs/crypto-cpp/blob/master/src/starkware/crypto/ffi/CMakeLists.txt). See [section on this below for more information](#c-methods-for-faster-stark-signing).|


## Rust,  C++ and Python v1 (deprecated) Client

<aside class="notice">
Notice that the V1 client (deprecated) will not be maintained further

</aside>
 -->
