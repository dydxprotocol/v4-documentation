# Margin Calculations

As part of the default settings of the v4 open source software (”dYdX Chain”), collateral is held as USDC, and the quote asset for all perpetual markets is USDC. Cross-margining is used by default, meaning an account can open multiple positions that share the same collateral.

As part of the default settings on the v4 open source software, each market has two risk parameters, the initial margin fraction and the maintenance margin fraction, which determine the max leverage available within that market. By default, these are used to calculate the value that must be held by an account in order to open or increase positions (in the case of initial margin) or avoid liquidation (in the case of maintenance margin). With the removal of nonlinear margin scaling, the IMF and MMF are now consistent across all position sizes, providing a predictable leverage limit for traders.

  - **Maximum Leverage**: Each market has a specified maximum leverage. A trader cannot make a trade that would place their leverage above this limit. With the removal of nonlinear scaling, the maximum leverage remains consistent across all position sizes, providing traders with a predictable and uniform leverage limit.

  - **Maintenance Margin Fraction**: Margin fraction is calculated as a trader’s position notional value divided by equity. If a trader’s margin fraction exceeds the maintenance margin fraction, their position will be automatically closed (liquidated) and a liquidation fee of 1.5% could be assessed. With the removal of nonlinear margin scaling, the MMF remains constant across all position sizes, ensuring consistent margin requirements for traders.

  - **Initial Margin Fraction**: Margin fraction is calculated as a trader’s position notional value divided by equity. If a trader’s margin fraction exceeds the initial margin fraction, a trader will no longer be allowed to increase their position. With the nonlinear scaling feature removed, the IMF does not increase based on position size and remains constant regardless of how large the position becomes, providing uniform margin requirements for all traders.

  - **Base Position Notional**: The concept of Base Position Notional becomes redundant with the removal of nonlinear scaling, as margin requirements now remain constant regardless of position size. Thus, the IMF and MMF apply consistently, simplifying the margin requirements framework for all traders.

## How are new margin fractions computed on dYdX Chain?

In the default settings of the v4 open source software, the initial and maintenance margin fractions for each perpetual market are fixed and do not change based on the position's size. This unified approach ensures that all traders face consistent margin requirements:

  - **Initial Margin Fraction (IMF)**: A fixed percentage that determines the value required to open or increase positions.
  - **Maintenance Margin Fraction (MMF)**: A fixed percentage that determines the minimum collateral required to avoid liquidation.

These fixed percentages simplify trading calculations and prevent unexpected increases in margin requirements due to nonlinear scaling. As a result, all traders can better understand the exact leverage and risk they will encounter, regardless of position size.

## Margin Calculation

The margin requirement for a single position is calculated as follows:

    Initial Margin Requirement = abs(S × P × I) Maintenance Margin Requirement = abs(S × P × M)

Where:

- S is the size of the position (positive if long, negative if short)
- P is the oracle price for the market
- I is the initial margin fraction for the market
- M is the maintenance margin fraction for the market

The margin requirement for the account as a whole is the sum of the margin requirement over each market i in which the account holds a position:

    Total Initial Margin Requirement = Σ abs(Si × Pi × Ii) Total Maintenance Margin Requirement = Σ abs(Si × Pi × Mi)

The total margin requirement is compared against the total value of the account, which incorporates the quote asset (USDC) balance of the account as well as the value of the positions held by the account:

    Total Account Value = Q + Σ (Si × Pi)

The Total Account Value is also referred to as equity.

Where:

  - Q is the account's USDC balance (note that Q may be negative). In the API, this is called quoteBalance. Every time a transfer, deposit or withdrawal occurs for an account, the balance changes. Also, when a position is modified for an account, the quoteBalance changes. Also funding payments and liquidations will change an account's quoteBalance.
  - S and P are as defined above (note that S may be negative)

An account cannot open new positions or increase the size of existing positions if it would lead the total account value of the account to drop below the total initial margin requirement. If the total account value ever falls below the total maintenance margin requirement, the account may be liquidated.

Free collateral is calculated as:

    Free collateral = Total Account Value - Total Initial Margin Requirement

Equity and free collateral can be tracked over time using the latest oracle price.
