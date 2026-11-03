# Perpetual Contracts

The dYdX Perpetual is a non-custodial, decentralized margin product that offers synthetic exposure to a variety of assets.

## Margin

Collateral is held as USDC, and the quote asset for all perpetual markets is USDC. Cross-margining is used by default, meaning an account can open multiple positions that share the same collateral. Isolated margin can be achieved by creating separate accounts (sub-accounts) under the same user.

Each market has three risk parameters, the `initialMarginFraction`, `maintenanceMarginFraction` and `incrementalInitialMarginFraction`, which determine the max leverage available within that market. These are used to calculate the value that must be held by an account in order to open or increase positions (in the case of initial margin) or avoid liquidation (in the case of maintenance margin).

### Risk Parameters and Related Fields

| Risk                               | Description                                                                                                                  |
|------------------------------------|------------------------------------------------------------------------------------------------------------------------------|
| `initialMarginFraction`            | The margin fraction needed to open a position.                                                                               |
| `maintenanceMarginFraction`        | The margin fraction required to prevent liquidation.                                                                         |
| `incrementalInitialMarginFraction` | The increase of `initialMarginFraction` for each `incrementalPositionSize` above the `baselinePositionSize` the position is. |
| baselinePositionSize               | The max position size (in base token) before increasing the initial-margin-fraction.                                         |
| incrementalPositionSize            | The step size (in base token) for increasing the `initialMarginFraction` by (`incrementalInitialMarginFraction` per step).   |

### Portfolio Margining

There is no distinction between realized and unrealized PnL for the purposes of margin calculations. Gains from one position will offset losses from another position within the same account, regardless of whether the profitable position is closed.

### Margin Calculation

The margin requirement for a single position is calculated as follows:

<pre class="center-column">
Initial Margin Requirement = abs(S &times; P &times; I)
Maintenance Margin Requirement = abs(S &times; P &times; M)
</pre>

Where:

* `S` is the size of the position (positive if long, negative if short)
* `P` is the oracle price for the market
* `I` is the initial margin fraction for the market
* `M` is the maintenance margin fraction for the market

The margin requirement for the account as a whole is the sum of the margin requirement over each market `i` in which the account holds a position:

<pre class="center-column">
Total Initial Margin Requirement = Σ abs(S<sub>i</sub> &times; P<sub>i</sub> &times; I<sub>i</sub>)
Total Maintenance Margin Requirement = Σ abs(S<sub>i</sub> &times; P<sub>i</sub> &times; M<sub>i</sub>)
</pre>

The total margin requirement is compared against the total value of the account, which incorporates the quote asset (USDC) balance of the account as well as the value of the positions held by the account:

<pre class="center-column">
Total Account Value = Q + Σ (S<sub>i</sub> &times; P<sub>i</sub>)
</pre>

The Total Account Value is also referred to as equity.

Where:

* `Q` is the account's USDC balance (note that `Q` may be negative). In the API, this is called `quoteBalance`. Every time a transfer, deposit or withdrawal occurs for an account, the balance changes. Also, when a position is modified for an account, the `quoteBalance` changes. Also funding payments and liquidations will change an account's `quoteBalance`.
* `S` and `P` are as defined above (note that `S` may be negative)

An account cannot open new positions or increase the size of existing positions if it would lead the total account value of the account to drop below the total initial margin requirement. If the total account value ever falls below the total maintenance margin requirement, the account may be liquidated.

Free collateral is calculated as:

<pre class="center-column">
Free collateral = Total Account Value - Total Initial Margin Requirement
</pre>

Equity and free collateral can be tracked over time using the latest oracle price (obtained from the markets websocket).

## Liquidations

Accounts whose total value falls below the maintenance margin requirement (described above) may have their positions automatically closed by the liquidation engine. Positions are closed at the close price described below. Profits or losses from liquidations are taken on by the insurance fund.

### Close Price for Liquidations

The close price for a position being liquidated is calculated as follows, depending  whether it is a short or long position:

<pre class="center-column">
Close Price (Short) = P &times; (1 + (M &times; V / W))
Close Price (Long) = P &times; (1 &minus; (M &times; V / W))
</pre>

Where:

* `P` is the oracle price for the market
* `M` is the maintenance margin fraction for the market
* `V` is the total account value, as defined above
* `W` is the total maintentance margin requirement, as defined above

This formula is chosen such that the ratio `V / W` is unchanged as individual positions are liquidated.

## Funding

Funding payments are exchanged between long and short traders to encourage the price of a perpetual contract to trade close to the price of the underlying. If the perpetual trades at a premium relative to the index, long traders will typically make payments to short traders, whereas if the perpetual trades at a discount relative to the index, short traders will typically make payments to long traders.

The payments are credited or debited at the start of each hour, and are included in the realized PnL for the position.

Funding payments can be found by calling [Get /v3/funding](#get-funding-payments) and the predicted funding rate can be found by calling [Get v3/markets](#get-markets).

### Funding Rate Units

Since funding payments are exchanged every hour, the dYdX funding rate is usually represented as a 1-hour rate, which represents the return a position may expect to earn or pay every hour.

When calculating the funding rate, the premium is scaled to have a realization period of 8 hours. That means, for example, that if a certain perpetual market trades consistently at a 0.1% premium relative to the underlying, long traders may expect to pay ~0.1% every 8 hours, and short traders may expect to earn a ~0.1% return every 8 hours (not accounting for the interest rate component).

### Funding Payment Calculation

At the start of each hour, an account receives USDC (if `F` is positive) or pays USDC (if `F` is negative) in an amount equal to:

<pre class="center-column">
F = (-1) &times; S &times; P &times; R
</pre>

Where:

* `S` is the size of the position (positive if long, negative if short)
* `P` is the oracle price for the market
* `R` is the funding rate (as a 1-hour rate)

### Funding Rate Calculation

The main component of the funding rate is a premium that takes into account market activity for the perpetual. It is calculated for each market, every minute (at a random point within the minute) using the formula:

<pre class="center-column">
Premium = (Max(0, Impact Bid Price - Index Price) - Max(0, Index Price - Impact Ask Price)) / Index Price
</pre>

Where the impact bid and impact ask prices are defined as:

<pre class="center-column">
Impact Bid Price = Average execution price for a market sell of the impact notional value
Impact Ask Price = Average execution price for a market buy of the impact notional value
</pre>

And the impact notional amount for a market is:

<pre class="center-column">
Impact Notional Amount = 500 USDC / Initial Margin Fraction
</pre>

For example, for a market with a 10% initial margin fraction, the impact notional value is 5,000 USDC.

At the end of each hour, the premium component is calculated as the simple average (i.e. TWAP) of the 60 premiums calculated over the course of the last hour. In addition to the premium component, each market has a fixed interest rate component that aims to account for the difference in interest rates of the base and quote currencies. The funding rate is then:

<pre class="center-column">
Funding Rate = (Premium Component / 8) + Interest Rate Component
</pre>

Currently, the interest rate component for all dYdX markets is `0.00125%` (equivalent to `0.01%` per 8 hours).

## Contract Loss Mechanisms

During periods of high volatility in the markets underlying the perpetual contracts, the value of some accounts may drop below zero before they can be liquidated.

The insurance fund is the first backstop to maintain the solvency of the system when an account has a negative balance. The account will be liquidated, and the insurance fund will take on the loss.

In the event that the insurance fund is depleted, positions with the most profit and leverage may be used to offset negative-balance accounts, in order to maintain the stability of the system.

## Oracle Prices

The `Oracle Price` for each trading pair is used for the following:

* Ensuring that each account is well-collateralized after each trade
* Determining when an account should be liquidated

### Calculation

Oracle prices are equal to the median of the reported prices of 15 independent Chainlink nodes.

### Node Providers

* Chainlayer
* Inotel
* LinkForest
* SimplyVC
* DexTrac
* Fiews
* dMakers
* linkPool
* SDL
* Ztake
* stakFacils
* infStones
* 01node
* Syncnode
* Vulcan

## Index Prices

The `Index Price` for each trading pair is used for the following:

* Calculating the funding rate
* Triggering "triggerable" order types such as Stop-Limit and Take-Profit orders

### Calculation

Index prices are equal to the median of several exchanges' spot prices.

Each exchange's spot price is calculated as the median of the best-ask, best-bid, and last-traded prices of its spot pair.

If the exchange's quote-asset is a non-USD asset (including USDT), the price is adjusted by our index price for that asset.

### Exchange Sources

#### USDT-USD

For `USDT` pairs where `USDT` is the quote asset, the implied price of `USDT` is taken to be the reciprocal of: the exchange price divided by the index price of the base asset.

* Binance: `USDT-USDC`
* Bitstamp: `USDT-USD`
* Bybit: `USDC-USDT`
* CoinbasePro: `USDT-USD`
* Crypto: `USDT-USD`
* Huobi: `ETH-USDT`
* Kraken: `USDT-USD`
* KuCoin: `BTC-USDT`
* MEXC: `ETH-USDT`
* OKX: `BTC-USDT`

#### ETH-USD

* Binance: `ETH-USDT`
* Bitstamp: `ETH-USD`
* Bybit: `ETH-USDT`
* CoinbasePro: `ETH-USD`
* Kraken: `ETH-USD`
* KuCoin: `ETH-USDT`
* OKX: `ETH-USDT`

#### BTC-USD

* Binance: `BTC-USDT`
* Bitstamp: `BTC-USD`
* Bybit: `BTC-USDT`
* CoinbasePro: `BTC-USD`
* Kraken: `BTC-USD`
* KuCoin: `BTC-USDT`
* OKX: `BTC-USDT`

#### LINK-USD

* Binance: `LINK-USDT`
* Bybit: `LINK-USDT`
* CoinbasePro: `LINK-USD`
* Huobi: `LINK-USDT`
* Kraken: `LINK-USD`
* KuCoin: `LINK-USDT`
* MEXC: `LINK-USDT`
* OKX: `LINK-USDT`

#### AAVE-USD

* Binance: `AAVE-USDT`
* Bybit: `AAVE-USDT`
* CoinbasePro: `AAVE-USD`
* Huobi: `AAVE-USDT`
* Kraken: `AAVE-USD`
* KuCoin: `AAVE-USDT`
* MEXC: `AAVE-USDT`
* OKX: `AAVE-USDT`

#### UNI-USD

* Binance: `UNI-USDT`
* Bybit: `UNI-USDT`
* CoinbasePro: `UNI-USD`
* Gate: `UNI-USDT`
* Huobi: `UNI-USDT`
* Kraken: `UNI-USD`
* MEXC: `UNI-USDT`
* OKX: `UNI-USDT`

#### SUSHI-USD

* Binance: `SUSHI-USDT`
* Bybit: `SUSHI-USDT`
* CoinbasePro: `SUSHI-USD`
* Gate: `SUSHI-USDT`
* Huobi: `SUSHI-USDT`
* Kraken: `SUSHI-USD`
* KuCoin: `SUSHI-USDT`
* MEXC: `SUSHI-USDT`
* OKX: `SUSHI-USDT`

#### SOL-USD

* Binance: `SOL-USDT`
* Bybit: `SOL-USDT`
* CoinbasePro: `SOL-USD`
* Huobi: `SOL-USDT`
* Kraken: `SOL-USD`
* KuCoin: `SOL-USDT`
* MEXC: `SOL-USDT`
* OKX: `SOL-USDT`

#### YFI-USD

* Binance: `YFI-USDT`
* Bybit: `YFI-USDT`
* CoinbasePro: `YFI-USD`
* Gate: `YFI-USDT`
* Huobi: `YFI-USDT`
* Kraken: `YFI-USD`
* MEXC: `YFI-USDT`
* OKX: `YFI-USDT`

#### 1INCH-USD

* Binance: `1INCH-USDT`
* Bybit: `1INCH-USDT`
* CoinbasePro: `1INCH-USD`
* Gate: `1INCH-USDT`
* Huobi: `1INCH-USDT`
* KuCoin: `1INCH-USDT`
* MEXC: `1INCH-USDT`
* OKX: `1INCH-USDT`

#### AVAX-USD

* Binance: `AVAX-USDT`
* Bybit: `AVAX-USDT`
* Coinbase: `AVAX-USD`
* Gate: `AVAX-USDT`
* Huobi: `AVAX-USDT`
* Kraken: `AVAX-USD`
* KuCoin: `AVAX-USDT`
* OKX: `AVAX-USDT`

#### SNX-USD

* Binance: `SNX-USDT`
* Bybit: `SNX-USDT`
* CoinbasePro: `SNX-USD`
* Gate: `SNX-USDT`
* Huobi: `SNX-USDT`
* Kraken: `SNX-USD`
* Kucoin: `SNX-USDT`
* MEXC: `SNX-USDT`
* OKX: `SNX-USDT`

#### CRV-USD

* Binance: `CRV-USDT`
* Bybit: `CRV-USDT`
* CoinbasePro: `CRV-USD`
* Gate: `CRV-USDT`
* Huobi: `CRV-USDT`
* Kraken: `CRV-USD`
* Kucoin: `CRV-USDT`
* MEXC: `CRV-USDT`
* OKX: `CRV-USDT`

#### UMA-USD

* Binance: `UMA-USDT`
* Bybit: `UMA-USDT`
* CoinbasePro: `UMA-USD`
* Gate: `UMA-USDT`
* Huobi: `UMA-USDT`
* KuCoin: `UMA-USDT`
* MEXC: `UMA-USDT`
* OKX: `UMA-USDT`

#### DOT-USD

* Binance: `DOT-USDT`
* Bybit: `DOT-USDT`
* Coinbase: `DOT-USD`
* Gate: `DOT-USDT`
* Huobi: `DOT-USDT`
* Kraken: `DOT-USD`
* KuCoin: `DOT-USDT`
* OKX: `DOT-USDT`

#### DOGE-USD

* Binance: `DOGE-USDT`
* Bybit: `DOGE-USDT`
* Coinbase: `DOGE-USD`
* Gate: `DOGE-USDT`
* Huobi: `DOGE-USDT`
* Kraken: `DOGE-USD`
* KuCoin: `DOGE-USDT`
* OKX: `DOGE-USDT`

#### MATIC-USD

* Binance: `MATIC-USDT`
* Bybit: `MATIC-USDT`
* CoinbasePro: `MATIC-USD`
* Gate: `MATIC-USDT`
* Huobi: `MATIC-USDT`
* Kraken: `MATIC-USD`
* KuCoin: `MATIC-USDT`
* OKX: `MATIC-USDT`

#### MKR-USD

* Binance: `MKR-USDT`
* Bybit: `MKR-USDT`
* CoinbasePro: `MKR-USD`
* Gate: `MKR-USDT`
* Huobi: `MKR-USDT`
* Kraken: `MKR-USD`
* KuCoin: `MKR-USDT`
* OKX: `MKR-USDT`

#### FIL-USD

* Binance: `FIL-USDT`
* Bybit: `FIL-USDT`
* CoinbasePro: `FIL-USD`
* Gate: `FIL-USDT`
* Huobi: `FIL-USDT`
* Kraken: `FIL-USD`
* KuCoin: `FIL-USDT`
* OKX: `FIL-USDT`

#### ADA-USD

* Binance: `ADA-USDT`
* Bybit: `ADA-USDT`
* CoinbasePro: `ADA-USD`
* Gate: `ADA-USDT`
* Huobi: `ADA-USDT`
* Kraken: `ADA-USD`
* KuCoin: `ADA-USDT`
* OKX: `ADA-USDT`

#### ATOM-USD

* Binance: `ATOM-USDT`
* ByBit: `ATOM-USDT`
* CoinbasePro: `ATOM-USD`
* Huobi: `ATOM-USDT`
* Kraken: `ATOM-USD`
* KuCoin: `ATOM-USDT`
* MEXC: `ATOM-USDT`
* OKX: `ATOM-USDT`

#### COMP-USD

* Binance: `COMP-USDT`
* ByBit: `COMP-USDT`
* CoinbasePro: `COMP-USD`
* Huobi: `COMP-USDT`
* Kraken: `COMP-USD`
* KuCoin: `COMP-USDT`
* MEXC: `COMP-USDT`
* OKX: `COMP-USDT`

#### BCH-USD

* Binance: `BCH-USDT`
* Bybit: `BCH-USDT`
* CoinbasePro: `BCH-USD`
* Huobi: `BCH-USDT`
* Kraken: `BCH-USD`
* KuCoin: `BCH-USDT`
* MEXC: `BCH-USDT`
* OKX: `BCH-USDT`

#### LTC-USD

* Binance: `LTC-USDT`
* ByBit: `LTC-USDT`
* CoinbasePro: `LTC-USD`
* Huobi: `LTC-USDT`
* Kraken: `LTC-USD`
* KuCoin: `LTC-USDT`
* MEXC: `LTC-USDT`
* OKX: `LTC-USDT`

#### EOS-USD

* Binance: `EOS-USDT`
* Bybit: `EOS-USDT`
* CoinbasePro: `EOS-USD`
* Huobi: `EOS-USDT`
* Kraken: `EOS-USD`
* KuCoin: `EOS-USDT`
* MEXC: `EOS-USDT`
* OKX: `EOS-USDT`

#### ALGO-USD

* Binance: `ALGO-USDT`
* Bybit: `ALGO-USDT`
* CoinbasePro: `ALGO-USD`
* Gate: `ALGO-USDT`
* Huobi: `ALGO-USDT`
* Kraken: `ALGO-USD`
* KuCoin: `ALGO-USDT`
* OKX: `ALGO-USDT`

#### ZRX-USD

* Binance: `ZRX-USDT`
* Bybit: `ZRX-USDT`
* CoinbasePro: `ZRX-USD`
* Gate: `ZRX-USDT`
* Huobi: `ZRX-USDT`
* Kraken: `ZRX-USD`
* MEXC: `ZRX-USDT`
* OKX: `ZRX-USDT`

#### XMR-USD

* Gate: `XMR-USDT`
* Huobi: `XMR-USDT`
* Kraken: `XMR-USD`
* KuCoin: `XMR-USDT`
* MEXC: `XMR-USDT`

#### ZEC-USD

* Binance: `ZEC-USDT`
* CoinbasePro: `ZEC-USD`
* Gate: `ZEC-USDT`
* HTX: `ZEC-USDT`
* Kraken: `ZEC-USD`
* KuCoin: `ZEC-USDT`
* MEXC: `ZEC-USDT`

#### ENJ-USD

* Binance: `ENJ-USDT`
* CoinbasePro: `ENJ-USD`
* Gate: `ENJ-USDT`
* Huobi: `ENJ-USDT`
* Kraken: `ENJ-USD`
* MEXC: `ENJ-USDT`

#### ETC-USD

* Binance: `ETC-USDT`
* Bybit: `ETC-USDT`
* CoinbasePro: `ETC-USD`
* Gate: `ETC-USDT`
* Huobi: `ETC-USDT`
* Kraken: `ETC-USD`
* KuCoin: `ETC-USDT`
* OKX: `ETC-USDT`

#### XLM-USD

* Binance: `XLM-USDT`
* Bybit: `XLM-USDT`
* CoinbasePro: `XLM-USD`
* Gate: `XLM-USDT`
* Kraken: `XLM-USD`
* KuCoin: `XLM-USDT`
* OKX: `XLM-USDT`

#### TRX-USD

* Binance: `TRX-USDT`
* Bybit: `TRX-USDT`
* Gate: `TRX-USDT`
* Huobi: `TRX-USDT`
* KuCoin: `TRX-USDT`
* MEXC: `TRX-USDT`
* OKX: `TRX-USDT`

#### XTZ-USD

* Binance: `XTZ-USDT`
* Bybit: `XTZ-USDT`
* CoinbasePro: `XTZ-USD`
* Gate: `XTZ-USDT`
* Huobi: `XTZ-USDT`
* Kraken: `XTZ-USD`
* KuCoin: `XTZ-USDT`
* OKX: `XTZ-USDT`

#### ICP-USD

* Binance: `ICP-USDT`
* Bybit: `ICP-USDT`
* CoinbasePro: `ICP-USD`
* Gate: `ICP-USDT`
* Huobi: `ICP-USDT`
* KuCoin: `ICP-USDT`
* OKX: `ICP-USDT`

#### RUNE-USD

* Binance: `RUNE-USDT`
* Bybit: `RUNE-USDT`
* Bitget: `RUNE-USDT`
* Gate: `RUNE-USDT`
* Kraken: `RUNE-USD`
* KuCoin: `RUNE-USDT`

#### NEAR-USD

* Binance: `NEAR-USDT`
* ByBit: `NEAR-USDT`
* CoinbasePro `NEAR-USD`
* Gate: `NEAR-USDT`
* Huobi: `NEAR-USDT`
* KuCoin: `NEAR-USDT`
* OKX: `NEAR-USDT`

#### CELO-USD

* Binance: `CELO-USDT`
* Bybit: `CELO-USDT`
* CoinbasePro: `CELO-USD`
* Gate: `CELO-USDT`
* KuCoin: `CELO-USDT`
* MEXC: `CELO-USDT`
* OKX: `CELO-USDT`
