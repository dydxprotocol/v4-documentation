

# Orderbook Stream

This feature aims to provide real-time, accurate orderbook updates and fills. Complete orderbook activities and fills are streamed to the client and can be used to construct a full depth L3 orderbook. Streams are implemented using the existing GRPC query service from Cosmos SDK.

The current implementation provides information on orders and fills. Note that by dYdX V4’s design, the orderbook can be slightly different across different nodes.

**Disclaimer:** It’s possible for the full node to block indefinitely when sending a message to an unresponsive client, so right now we recommend you use this exclusively with your own node and that the client always close the gRPC stream before shutting down. This issue will be fixed in the next version.

## Enabling GRPC Streaming

This feature can be enabled via a command line flag (`--grpc-streaming-enabled=true`) when starting your full node. This feature can only be used on non validating full nodes and when grpc is also enabled.

Further, please ensure your full node binary is `v3.0.1`, or `v4.0.1` when it becomes mandatory on April 8, 2024 (subject to governance vote).   

## Consuming the gRPC Stream

To follow along with [Google's documentation on gRPC streaming clients](https://grpc.io/docs/languages/go/basics/#client):

1. Clone the [github.com/dydxprotocol/v4-chain](https://github.com/dydxprotocol/v4-chain) repository at same version as your full node.
2. Generate the protos: `make proto-gen && make proto-export-deps`.
3. The generated protos are now in the `.proto-export-deps` directory.
4. Use the protobuf compiler (protoc) to [generate stubs](https://protobuf.dev/getting-started/) in any supported language.
5. Follow the documentation to write a streaming client.

For Python, the corresponding code is already generated in [the v4-proto PyPi package](https://pypi.org/project/v4-proto/).

## Request / Response

To subscribe to the stream, the client can send a 'StreamOrderbookUpdatesRequest' specifying the clob pair ids to subscribe to.

<details>

<summary>Protobuf Structs</summary>

```protobuf
// StreamOrderbookUpdatesRequest is a request message for the
// StreamOrderbookUpdates method.
message StreamOrderbookUpdatesRequest {
  // Clob pair ids to stream orderbook updates for.
  repeated uint32 clob_pair_id = 1;
}
```
</details>
&nbsp;

Response will contain a `oneof` field that contains either:
- an `OffChainUpdateV1` orderbook update (Add/Remove/Update), whether the updates are coming from a snapshot
- a `ClobMatch` object describing a fill (order or liquidation), with full order information and order fill amounts

as well as some debugging metadata about `block_height` and `exec_mode`. It is not advised to write business logic around this metadata.

<details>

<summary>Protobuf Structs</summary>

```protobuf
// StreamOrderbookUpdatesResponse is a response message for the
// StreamOrderbookUpdates method.
message StreamOrderbookUpdatesResponse {
  // Orderbook updates for the clob pair.
  repeated StreamUpdate updates = 1 [ (gogoproto.nullable) = false ];

  // ---Additional fields used to debug issues---
  // Block height of the updates.
  uint32 block_height = 2;

  // Exec mode of the updates.
  uint32 exec_mode = 3;
}

// StreamUpdate is an update that will be pushed through the
// GRPC stream.
message StreamUpdate {
  // Contains one of an StreamOrderbookUpdate,
  // StreamOrderbookFill.
  oneof update_message {
    StreamOrderbookUpdate orderbook_update = 1;
    StreamOrderbookFill order_fill = 2;
  }
}

// StreamOrderbookUpdate provides information on an orderbook update. Used in
// the full node GRPC stream.
message StreamOrderbookUpdate {
  // Orderbook updates for the clob pair. Can contain order place, removals,
  // or updates.
  repeated dydxprotocol.indexer.off_chain_updates.OffChainUpdateV1 updates = 1
      [ (gogoproto.nullable) = false ];

  // Snapshot indicates if the response is from a snapshot of the orderbook.
  // This is true for the initial response and false for all subsequent updates.
  // Note that if the snapshot is true, then all previous entries should be
  // discarded and the orderbook should be resynced.
  bool snapshot = 2;
}

// StreamOrderbookFill provides information on an orderbook fill. Used in
// the full node GRPC stream.
message StreamOrderbookFill {
  // Clob match. Provides information on which orders were matched
  // and the type of order. Fill amounts here are relative.
  ClobMatch clob_match = 1;

  // All orders involved in the specified clob match. Used to look up
  // price of a match through a given maker order id.
  repeated Order orders = 2 [ (gogoproto.nullable) = false ];

  // Resulting fill amounts for each order in the orders array.
  repeated uint64 fill_amounts = 3 [ (gogoproto.nullable) = false ];
}
```
</details>


## Maintaining a local orderbook

After subscribing to the orderbook updates, use the orderbook in the snapshot as the starting orderbook.

### OrderPlaceV1
When `OrderPlaceV1` is received,  add the corresponding order to the end of the price level.
- This message is sent out whenever an order is added to the in-memory orderbook.
- This may occur in various places such as when an order is initially placed, or when an order is replayed during the ProcessCheckState step.
- A Placement message will always be followed by an Update message.

<details>

<summary>Code Snippet</summary>

```go
func (l *LocalOrderbook) AddOrder(order v1types.IndexerOrder) {
	l.Lock()
	defer l.Unlock()

	if _, ok := l.OrderIdToOrder[order.OrderId]; ok {
		l.Logger.Error("order already exists in orderbook")
	}

	subticks := order.GetSubticks()
	if order.Side == v1types.IndexerOrder_SIDE_BUY {
		if _, ok := l.Bids[subticks]; !ok {
			l.Bids[subticks] = make([]v1types.IndexerOrder, 0)
		}
		l.Bids[subticks] = append(l.Bids[subticks], order)
	} else {
		if _, ok := l.Asks[subticks]; !ok {
			l.Asks[subticks] = make([]v1types.IndexerOrder, 0)
		}
		l.Asks[subticks] = append(l.Asks[subticks], order)
	}

	l.OrderIdToOrder[order.OrderId] = order
	l.OrderRemainingAmount[order.OrderId] = 0
}
```
</details>

### OrderUpdateV1
When `OrderUpdateV1` is received, update the order's fill amount to the amount specified.
- This message only carries information about an order's updated fill amount.
- This message is sent out whenever an an order's fill amount changes from an action that isn't a `ClobMatch`.
- This includes when deliverState is reset to the checkState from last block, or when branched state is written to and then discarded if there was a matching error.
- An update message will always accompany an order placement message.

<details>

<summary>Code Snippet</summary>

```go
func (l *LocalOrderbook) SetOrderFillAmount(
	orderId *v1types.IndexerOrderId,
	fillAmount uint64,
) {
	l.Lock()
	defer l.Unlock()

	if fillAmount == 0 {
		delete(l.FillAmounts, *orderId)
	} else {
		l.FillAmounts[*orderId] = fillAmount
	}
}
```
</details>


### OrderRemoveV1
When `OrderRemoveV1` is received, remove the order from the orderbook.
- This message is emitted when an order is removed from the in-memory orderbook.
- Note that this does not mean the fills are removed from state yet.
	- When fills are removed from state, a separate Update message will be sent with 0 quantum.

<details>

<summary>Code Snippet</summary>

```go
func (l *LocalOrderbook) RemoveOrder(orderId v1types.IndexerOrderId) {
	l.Lock()
	defer l.Unlock()

	if _, ok := l.OrderIdToOrder[orderId]; !ok {
		l.Logger.Error("order not found in orderbook")
	}

	order := l.OrderIdToOrder[orderId]
	subticks := order.GetSubticks()

	if order.Side == v1types.IndexerOrder_SIDE_BUY {
		for i, o := range l.Bids[subticks] {
			if o.OrderId == order.OrderId {
				l.Bids[subticks] = append(
					l.Bids[subticks][:i],
					l.Bids[subticks][i+1:]...,
				)
				break
			}
		}
		if len(l.Bids[subticks]) == 0 {
			delete(l.Bids, subticks)
		}
	} else {
		for i, o := range l.Asks[subticks] {
			if o.OrderId == order.OrderId {
				l.Asks[subticks] = append(
					l.Asks[subticks][:i],
					l.Asks[subticks][i+1:]...,
				)
				break
			}
		}
		if len(l.Asks[subticks]) == 0 {
			delete(l.Asks, subticks)
		}
	}
	delete(l.OrderIdToOrder, orderId)
}
```

</details>

## Maintaining Order Fill Amounts

The `ClobMatch` data structure exposed contains either a `MatchOrders` or a `MatchPerpetualLiquidation` object. Match Deleveraging events are not emitted. Within each Match object, a `MakerFill` array contains the various maker orders that matched with the singular taker order and the amount of quantums matched.

Note that prices are always matched at the maker order price.  The `orders` field in the `StreamOrderbookFill` object allow for price lookups based on order id.

Mapping each order in `orders` to the corresponding value in the `fill_amounts` field provides the absolute filled amount of quantums that each order is filled to after the ClobMatch was processed.


<details>

<summary>Code Snippet</summary>

```go
// fillAmountMap is a zipped map of `orders` and `fill_amounts` mapping order ids to fill amounts.
func (c *GrpcClient) ProcessMatchOrders(
	matchOrders *clobtypes.MatchOrders,
	orderMap map[clobtypes.OrderId]clobtypes.Order,
	fillAmountMap map[clobtypes.OrderId]uint64,
) {
	takerOrderId := matchOrders.TakerOrderId
	clobPairId := takerOrderId.GetClobPairId()
	localOrderbook := c.Orderbook[clobPairId]

	indexerTakerOrder := v1.OrderIdToIndexerOrderId(takerOrderId)
	localOrderbook.SetOrderFillAmount(&indexerTakerOrder, fillAmountMap[takerOrderId])

	for _, fill := range matchOrders.Fills {
		makerOrder := orderMap[fill.MakerOrderId]
		indexerMakerOrder := v1.OrderIdToIndexerOrderId(makerOrder.OrderId)
		localOrderbook.SetOrderFillAmount(&indexerMakerOrder, fillAmountMap[makerOrder.OrderId])
	}
}

func (c *GrpcClient) ProcessMatchPerpetualLiquidation(
	perpLiquidation *clobtypes.MatchPerpetualLiquidation,
	orderMap map[clobtypes.OrderId]clobtypes.Order,
	fillAmountMap map[clobtypes.OrderId]uint64,
) {
	localOrderbook := c.Orderbook[perpLiquidation.ClobPairId]
	for _, fill := range perpLiquidation.GetFills() {
		makerOrder := orderMap[fill.MakerOrderId]
		indexerMakerOrderId := v1.OrderIdToIndexerOrderId(makerOrder.OrderId)
		localOrderbook.SetOrderFillAmount(&indexerMakerOrderId, fillAmountMap[makerOrder.OrderId])
	}
}
```

</details>

## Example Scenario

- Trader places a bid at price 100 for size 1
  - OrderPlace, price = 100, size = 1
  - OrderUpdate, total filled amount = 0
- Trader replaces that original bid to be price 99 at size 2
  - OrderRemove
  - OrderPlace, price = 99, size = 2
  - OrderUpdate, total filled amount = 0
- Another trader submits an IOC ask at price 100 for size 1.
  - Full node doesn't see this matching anything so no updates.
- Block is confirmed that there was a fill for the trader's original order at price 100 for size 1 (BP didn't see the order replacement)
  - OrderUpdate, set total fill amount to be 0 (no-op) from checkState -> deliverState reset
  - MatchOrder emitted for block proposer's original order match, total filled amount = 1
 
## FAQs

Q: Suppose the full node saw the cancellation of order X at t0 before the placement of the order X at t1. What would the updates be like?
- **A: No updates because the order was never added to the book**

Q: A few questions because it often results in crossed books:
In which cases shall we not expect to see OrderRemove message?
- Post only reject? → **PO reject won’t have a removal since they were never added to the book**
- IOC/FOK auto cancel? → **IOC/FOK also won’t have a removal message for similar reason**
- Order expired outside of block window? → **expired orders will generate a removal message**
- Passive limit order was fully filled → **fully filled maker will generate a removal message**
- Aggressive limit order was fully filled? → **fully filled taker won’t have a removal**

Q: Why does `StreamOrderbookUpdate` use IndexerOrderId and `StreamOrderbookFill` use dydxprotocol.OrderId?
- A: GRPC streaming exposes inner structs of the matching engine and our updates are processed differently from fills. The two data structures have equivalent fields, and a lightweight translation layer to go from Indexer OrderId to Protocol OrderId can be written.

Q: During DeliverTx
- A: GRPC streaming exposes inner structs of the matching engine and our updates are processed differently from fills. The two data structures have equivalent fields, and a lightweight translation layer to go from Indexer OrderId to Protocol OrderId can be written.

Q: What are the exec modes?
<details>

<summary>Exec Modes</summary>

```go
	const (
		execModeCheck           execMode = iota // Check a transaction
		execModeReCheck                         // Recheck a (pending) transaction after a commit
		execModeSimulate                        // Simulate a transaction
		execModePrepareProposal                 // Prepare a block proposal
		execModeProcessProposal                 // Process a block proposal
		execModeVoteExtension                   // Extend or verify a pre-commit vote
		execModeFinalize                        // Finalize a block proposal
	)

	ExecModeBeginBlock        = 100
	ExecModeEndBlock          = 101
	ExecModePrepareCheckState = 102
```
</details>