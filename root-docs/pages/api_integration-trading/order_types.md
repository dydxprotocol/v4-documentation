# Order Execution Options

## [Time In Force](https://github.com/dydxprotocol/v4-chain/blob/aefa183b759efe62a53c0fbbb23d97d8095868e9/proto/dydxprotocol/clob/order.proto#L159)
Execution options can be specified using the `TimeInForce` field for order placements.

### Unspecified/Empty
Leaving order execution as unspecified/empty represents the default behavior where an order will first match with existing orders on the book, and any remaining size will be added to the book as a maker order.

### Immediate or Cancel Order (IOC)
IOC enforces that an order only be matched with maker orders on the book. If the order has remaining size after matching with existing orders on the book, the remaining size is not placed on the book.

### Post Only
Post only enforces that an order only be placed on the book as a maker order. Note this means that validators will cancel any newly-placed post only orders that would cross with other maker orders.

## [Reduce Only Order (RO)](https://github.com/dydxprotocol/v4-chain/blob/aefa183b759efe62a53c0fbbb23d97d8095868e9/proto/dydxprotocol/clob/order.proto#L189)

*Reduce only orders are currently only enabled on FOK/IOC orders as of right now.*

Reduce Only orders are a type of order that can only reduce your position size. For example, a 1.25 BTC Sell Reduce Only order on a 1 BTC long can only decrease your position size by 1. The remaining .25 BTC sell will not fill and be cancelled. Reduce Only orders are used to close out your positions.

## [Condition Types](https://github.com/dydxprotocol/v4-chain/blob/aefa183b759efe62a53c0fbbb23d97d8095868e9/proto/dydxprotocol/clob/order.proto#L195)

### Unspecified
Unspecified represents the default behavior where an order will be placed immediately on the orderbook.

### Stop Loss
Stop loss represents a stop order. A stop order will trigger when the oracle price moves at or above the trigger price for buys, and at or below the trigger price for sells.

### Take Profit
Take profit represents a take profit order. A take profit order will trigger when the oracle price moves at or below the trigger price for buys and at or above the trigger price for sells.
