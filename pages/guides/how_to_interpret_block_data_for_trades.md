## dYdX v4: How to Interpret the Block Data for Trades

<img width="639" alt="Screenshot 2024-03-29 at 2 34 06 PM" src="https://github.com/dydxprotocol/v4-documentation/assets/130097657/19bc0173-0d79-473f-b88a-f99b72c7065a">

In dYdX Chain trading, quantities and prices are represented in quantums (for quantities) and subticks (for prices), which need conversion for practical understanding.

### Quantums

The smallest increment of position size. Determined from `atomicResolution`.

atomicResolution - Determines the size of a quantum. [For example](https://github.com/dydxprotocol/v4/blob/08069ba905753158b9f390ca52e3f9f0fb2cb3d5/config.yml#L101), an `atomicResolution` of 10 for `BTC`, means that 1 quantum is `1e-10` `BTC`.

### Subticks

Human-readable units: `USDC/<currency>` e.g. USDC/BTC

Units in V4 protocol: `quote quantums/base quantums` e.g. (`1e-14 USDC/1e-10 BTC`)

Determined by `quantum_conversion_exponent`, this allows for flexibility in the case that an asset’s prices plummet, since prices are represent in subticks, decreasing `subticks_per_tick` would allow for ticks to denote smaller increments between prices.

E.g. 1 `subtick` = `1e-14 USDC/1e-10 BTC`  and if BTC was at 20,000 USDC/BTC, a `tick` being 100 USDC/BTC (`subtick_per_tick` = 10000) may make sense.

If BTC drops to 200 USDC/BTC, a `tick` being 100 USDC/BTC no longer makes sense, and we may want a `tick` to be 1 USDC/BTC, which lets us set `subtick_per_tick` to 100 to get to a `tick` size of 1 USDC/BTC.

### Now back to the interpretation of the above image:

1. First, notice column I is negative.  That means this trade is a sell by the taker account.  If It was positive, it would be a buy.

Result: Determined if this is a buy or a sell

2. Next, look at column N.  The perpetual_id is 7, which maps to AVAX-USD market.  You can see all the mappings from this endpoint for the dYdX Chain deployment by dYdX Operations Services Ltd. https://indexer.dydx.trade/v4/perpetualMarkets where the clobPairId is the perpetual_id.

Result: Determined the market

3. Next, we need to get the decimals for this market.  First, get the atomicResolution from that endpoint above which we see is -7.  Now we can get the size of the trade.  From column I and J, take this number -500000000 and multiply by 10^(AtomicResolution) and you get: -500000000 x 10^-7 = 50, so the quantity is 50.

Result: Determined the quantity

4. Next, look at columns, E, F, G, H, I, and J

<img width="619" alt="Screenshot 2024-03-29 at 2 37 28 PM" src="https://github.com/dydxprotocol/v4-documentation/assets/130097657/44661861-3ec0-40fb-951d-43c3ce9bb015">

The price of the trade is either abs((G+E)/I)*10e(-6 - AtomicResolution), or abs((H+F)/J)*10e(-6 - AtomicResolution), either one is the same.  Note that the ‘-6’ is because the AtomicResolution of USDC is -6.

abs((1479130125 + 369875)/-500000000)*10e(-6 + 7) = 29.59

abs((-1479337255 - 162745)/500000000)*10e(-6 +7) = 29.59

Result: Determined the price

### Conclusion

In conclusion, we have determined that this trade is SELL 50 AVAX-USD at price $29.59
