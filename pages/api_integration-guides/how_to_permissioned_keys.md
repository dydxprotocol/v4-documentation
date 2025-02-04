# Permissioned Keys

## Overview

Permissioned Keys are a dYdX specific extension to the Cosmos authentication system that allows an account to add custom logic for verifying and confirming transactions placed on that account. For example, an account could enable other accounts to sign and place transactions on their behalf, limit those transactions to certain message types or clob pairs etc, all in a composable way.

To enable this there are currently six types of "authenticator" that can used, four that enable specific authentication methods and two that allow for composability:

**Sub-Authenticator Types**

- **SignatureVerification** – Enables authentication via a specific key
- **MessageFilter** – Restricts authentication to certain message types
- **SubaccountFilter** – Restricts authentication to certain subaccount constraints
- **ClobPairIdFilter** – Restricts transactions to specific CLOB pair IDs

**Composable Authenticators**

- **AnyOf** - Succeeds if *any* of its sub-authenticators succeeds
- **AllOf** - Succeeds only if *all* sub-authenticators succeed

## Capabilities

### Available Features ✅

1. **Account Access Control**

   - Limit withdrawals/transfers entirely
   - Multiple trading keys under same account
   - Trading key separation from withdrawal keys

2. **Asset-Specific Trading**

   - Whitelist specific trading pairs
   - E.g., Allow BTC/USD and ETH/USD, restrict others

3. **Subaccount Management**
   - Control trading permissions per subaccount
   - E.g., Enable trading on subaccount 0, restrict subaccount 1

### Current Limitations ❌

1. **Position Management**

   - Cannot set maximum position sizes
   - No order size restrictions
   - No custom leverage limits

2. **Order Book Behavior**

   - Cannot control execution of resting orders
   - Orders remain executable while on book

3. **Asset Management**
   - No internal portfolio management features
   - Standard platform risk measures apply

---

## **Example: Setup permission keys using Golang**

### **Adding an AllOf Authenticator With SignatureVerification + MessageFilter**

The following example demonstrates how “Bob” can add an “AllOf” authenticator that grants “Alice” permission to submit only “MsgPlaceOrder” transactions on Bob’s account.

**1. Building Sub-Authenticators**

To allow Alice’s key to sign transactions, and to restrict transactions to the “MsgPlaceOrder” message type, construct two sub-authenticators:

- SignatureVerification: Uses Alice’s public key
- MessageFilter: Only allows `"/dydxprotocol.clob.MsgPlaceOrder"` messages.

In Go (pseudocode):

```go
subAuths := []aptypes.SubAuthenticatorInitData{
    {
        Type:   "SignatureVerification",
        Config: AlicePrivateKey.PubKey().Bytes(),
    },
    {
        Type:   "MessageFilter",
        Config: []byte("/dydxprotocol.clob.MsgPlaceOrder"),
    },
}

// Marshal sub-authenticators into JSON data for the AllOf authenticator.
allOfData, err := json.Marshal(subAuths)
require.NoError(t, err)
```

**2. Creating the AllOf Authenticator**

We want to associate this new authenticator with Bob’s account. Therefore, Bob must be the “Sender” of a “MsgAddAuthenticator.”

The “AuthenticatorType” is "AllOf," and the “Data” is the marshaled sub-authenticators from step 1.

```go
addAllOfMsg := &aptypes.MsgAddAuthenticator{
    Sender:            constants.BobAccAddress.String(),
    AuthenticatorType: "AllOf",
    Data:              allOfData,
}
```

This tells the chain to store a new “AllOf” authenticator on Bob’s account. The chain will return an authenticator ID (for example, 0).

**3. Submitting the Add Authenticator Transaction**

Because Bob owns the account, Bob’s signature is required to add this authenticator:

```go
tx, err := testtx.GenTx(
    ctx,
    txConfig,
    []sdk.Msg{addAllOfMsg},
    someFeeCoins,         // transaction fee
    someGasAmount,        // gas
    chainID,
    []uint64{bobAccNum},  // Bob’s account number
    []uint64{bobSeqNum},  // Bob’s sequence
    []cryptotypes.PrivKey{bobPrivKey},  // signature by Bob
    []cryptotypes.PrivKey{bobPrivKey},  // fee payer is also Bob
    nil,                  // no additional authenticators referenced here
)
```

Broadcast the transaction to the network. If successful, Bob’s account now has an AllOf authenticator. The chain references it by an ID (e.g. 0).

---

### **Submitting an Order With the New Authenticator**

After adding this AllOf authenticator, Bob implicitly allows transactions on his account, but only if they match both sub-authenticators (Alice must sign, and the message must be “MsgPlaceOrder”).

**4. Creating a PlaceOrder Message**

Construct a “MsgPlaceOrder.” In Go:

```go
placeOrderMsg := clobtypes.NewMsgPlaceOrder(
// Place order using Bob's account details
    ),
)
```

**5. Building and Signing the Transaction**

Even though the account belongs to Bob, the AllOf authenticator requires Alice’s signature. Hence, we sign the PlaceOrder transaction with Alice’s private key:

```go
orderTx, err := testtx.GenTx(
    ctx,
    txConfig,
    []sdk.Msg{placeOrderMsg},
    someFeeCoins,
    someGasAmount,
    chainID,
    []uint64{bobAccNum},              // Bob's account number
    []uint64{bobSeqNum},              // Bob's sequence
    []cryptotypes.PrivKey{alicePrivKey}, // sign with Alice’s key
    []cryptotypes.PrivKey{alicePrivKey}, // Alice is also paying fees
    []uint64{0},                      // reference the AllOf authenticator by ID = 0
)
```

Broadcast this transaction. During verification:

- SignatureVerification sub-authenticator checks that Alice signed the transaction.
- MessageFilter sub-authenticator checks that the message is `/dydxprotocol.clob.MsgPlaceOrder`
- AllOf requires that both sub-authenticators pass, which they do if Alice is indeed signing and the message is of the correct type.

Once successful, Bob’s account effectively “permits” the order to be placed, but only under the conditions enforced by the AllOf authenticator.

## **Example: Setup permission keys using Typescript**

### **Adding an AllOf Authenticator With multiple filters**

**1. Setup the client**

Make sure that you are using at least @dydxprotocol/v4-client-js `v1.16.0`

```typescript
import { CompositeClient, AuthenticatorType } from '@dydxprotocol/v4-client-js';

const client = await CompositeClient.connect(Network.mainnet());
```

**2. Define permissions**

Each authenticator can have one or multiple restrictions that are combined with `ALL_OF`:

```typescript
import { toBase64 } from '@cosmjs/encoding';
import { TextEncoder } from 'util';

const subAuthenticators = [
  // Who: Allow this specific public key to sign transactions
  {
    type: AuthenticatorType.SIGNATURE_VERIFICATION,
    config: authedPubKey,
  },
  // What: Only allow placing e.g. orders
  {
    type: AuthenticatorType.MESSAGE_FILTER,
    config: toBase64(new TextEncoder().encode('/dydxprotocol.clob.MsgPlaceOrder')),
  },
  // Where: Only on subaccount 0
  {
    type: AuthenticatorType.SUBACCOUNT_FILTER,
    config: toBase64(new TextEncoder().encode('0')),
  },
  // Which market: Only ETH-USD (clobpair 1)
  {
    type: AuthenticatorType.CLOB_PAIR_ID_FILTER,
    config: toBase64(new TextEncoder().encode('1')),
  },
];
```

**3. Creating an All-Of Authenticator**

Encode the overall authenticator and submit the transaction.

```typescript
async function addAuthenticator(
  client: CompositeClient,
  subaccount: SubaccountInfo,
  authedPubKey: string
): Promise<void> {
  const jsonString = JSON.stringify(subAuthenticators);
  const encodedData = new TextEncoder().encode(jsonString);
  const auth = await client.addAuthenticator(subaccount, AuthenticatorType.ALL_OF, encodedData);
}
```

### **Submitting an Order With the New Authenticator**

**4. Place order with authenticator**

```typescript
// Wallet1 wants to allow Wallet2 to place ETH-USD orders on its subaccount 0
const subaccount1 = new SubaccountInfo(wallet1, 0);
const subaccount2 = new SubaccountInfo(wallet2, 0);

// Wallet1 Adds an authenticator to allow wallet2
await addAuthenticator(client, subaccount1, wallet2.pubKey!.value);
const authenticators = await client.getAuthenticators(wallet1.address!);

//  Get the authenticator ID, the last element in authenticators array is the most recently created
const lastElement = authenticators.accountAuthenticators.length - 1;
const authenticatorID = authenticators.accountAuthenticators[lastElement].id;

//  Now Wallet2 can place orders on Wallet1's subaccount
await placeOrder(client, subaccount2, subaccount1, authenticatorID);
```

**5. Remove the authenticator again**

```typescript
// Remove the authenticator
await removeAuthenticator(client, subaccount1, authenticatorID);

// Placing an order using subaccount2 will now fail
await placeOrder(client, subaccount2, subaccount1, authenticatorID);
```

### **End-to-end example**

Our Typescript client has helper functions for:

- Adding an authenticator ([link](https://github.com/dydxprotocol/v4-clients/blob/e0d1c76564dabb85715e34197799edc0b5d0ecc5/v4-client-js/src/clients/composite-client.ts#L1239))
- Removing an authenticator ([link](https://github.com/dydxprotocol/v4-clients/blob/e0d1c76564dabb85715e34197799edc0b5d0ecc5/v4-client-js/src/clients/composite-client.ts#L1247C9-L1247C28))
- Viewing all authenticators for an given address ([link](https://github.com/dydxprotocol/v4-clients/blob/e0d1c76564dabb85715e34197799edc0b5d0ecc5/v4-client-js/src/clients/composite-client.ts#L1254C9-L1254C26))

This guide demonstrates how to set up permissioned keys, allowing one wallet to execute trades on behalf of another wallet's subaccount with specific restrictions.

For the end to end example, adding an authenticator and placing a short term order with the authenticated account, see here:
[Link to e2e example](https://github.com/dydxprotocol/v4-clients/blob/adam/add-authentications-functions/v4-client-js/examples/permissioned_keys_example.ts)
