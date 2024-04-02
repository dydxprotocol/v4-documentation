# Clients

Python and TypeScript clients are available, allowing programmatic usage of dYdX.

## Python Client

### Installation

Install `dydx-v3-python` from [PyPI](https://pypi.org/project/dydx-v3-python) using `pip`:

<pre class="center-column">
pip install dydx-v3-python
</pre>

### Usage

See [dydxprotocol/dydx-v3-python](https://github.com/dydxprotocol/dydx-v3-python).

See the [examples](https://github.com/dydxprotocol/dydx-v3-python/tree/master/examples) folder for simple python examples.

## TypeScript Client

### Installation

Install `@dydxprotocol/v3-client` from [NPM](https://www.npmjs.com/package/@dydxprotocol/v3-client):

<pre class="center-column">
npm i -s @dydxprotocol/v3-client
</pre>

### Usage

See [dydxprotocol/v3-client](https://github.com/dydxprotocol/v3-client).

See the [examples](https://github.com/dydxprotocol/v3-client/tree/master/examples) folder for simple typescript examples.

## Client Initialization

> Initialize

```python
client = Client(
    host='https://api.dydx.exchange',
    web3=Web3('...'),
    stark_private_key='01234abcd...',
)
```

```typescript
const client: DydxClient = new Client(
    'host',
    {
        apiTimeout: 3000,
        starkPrivateKey: '01234abcd...',
    },
);
```

The client is organized into modules, based on the type of authentication needed for different requests. The configuration options passed into the client determine which modules are available. See [Authentication](#authentication) for more information.

<aside class="notice">
Multiple methods of authorization are available, so users never need to provide private keys directly to the client, if so desired. Ethereum signatures are needed only for onboarding and managing API keys, not trading, and may be provided via a web3 provider. STARK key signatures are required for trading, and the STARK key can be held either in the client or elsewhere.
</aside>

| Module     | Description                                                      |
|------------|------------------------------------------------------------------|
| public     | Public API endpoints. Does not require authentication.           |
| onboarding | Endpoint to create a new user, authenticated via Ethereum key.   |
| api_keys   | Endpoints for managing API keys, authenticated via Ethereum key. |
| private    | All other private endpoints, authenticated via API key.          |
| eth        | Calling and querying L1 Ethereum smart contracts.                |

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


### C++ Methods for Faster STARK Signing

<aside class="notice">
This optimization is only available for the Python client currently.
</aside>

The C++ wrapper methods in the client expect an absolute path to a [Shared Object](https://www.cprogramming.com/tutorial/shared-libraries-linux-gcc.html). This has to be compiled from [Starkware's crypto C++ library](https://github.com/starkware-libs/crypto-cpp/blob/master/src/starkware/crypto/ffi/CMakeLists.txt).
