# Order Execution Options

## Immediate or Cancel Order (IOC)
An Immediate or Cancel order is an immediate execution order that will be filled against the book. Any remaining size will be cancelled. Immediate or Cancel can only be set on non-long term orders ([short-term or stateful](../api_integration-trading/short_term_vs_stateful.mdx)). Immediate or cancel orders cannot be maker orders.

## Reduce Only Order (RO)

*Reduce only orders are currently only enabled on FOK/IOC orders as of right now.*

Reduce Only orders are a type of order that can only reduce your position size. For example, a 1.25 BTC Sell Reduce Only order on a 1 BTC long can only decrease your position size by 1. The remaining .25 BTC sell will not fill and be cancelled. Reduce Only orders are used to close out your positions.