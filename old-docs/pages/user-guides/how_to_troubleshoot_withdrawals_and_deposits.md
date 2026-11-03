# dYdX Chain: Deposits, Withdrawals & Troubleshooting Guide

This guide provides a **step-by-step** explanation of deposit and withdrawal processes on the dYdX Chain. It includes instructions for **Skip Go Fast (“Instant”), Skip Go (“Default”), Coinbase deposits**, and **direct IBC transfers**, along with **troubleshooting methods** and best practices to ensure seamless transactions.

## Deposit & Withdrawal Methods

| Method                                           | Description                                                               | Finality      | Chains Supported                                                                                | Fee Range (USD)                                                                                                                         |
| :----------------------------------------------- | :------------------------------------------------------------------------ | :------------ | :---------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| **Skip Go Fast ("Instant Deposit")**             | The fastest bridging option for rapid deposits                            | 10-30 seconds | Ethereum Mainnet, Arbitrum, Optimism, Base, Polygon, Avalanche                                  | 10 bps on the transfer size \+ source chain fee: Ethereum: \~$2.5 L2s: $0.01-$0.10                                                      |
| **Skip Go ("Default")**                          | A universal interoperability platform supporting multiple bridges         | 2-30 minutes  | Ethereum Mainnet, Arbitrum, Optimism, Base, Polygon, Avalanche, Solana, Neutron, Osmosis, Noble | Deposits \~$0.02 Withdrawals: \~$0.1-$7 \+ source chain gas fee: Ethereum: gas price L2s: gas price Cosmos: gas price Solana: gas price |
| **Deposit / Withdrawal with Coinbase via Noble** | Direct deposit or withdrawal via Noble Wallet with automatic IBC transfer | 1-3 minutes   | Coinbase to dYdX only                                                                           | Coinbase withdrawal fee \+ IBC fee ($0.1-$0.2)                                                                                          |
| **Direct IBC Transfer**                          | For users familiar with Cosmos ecosystem transfers                        | 15-30 seconds | All Cosmos chains with IBC enabled                                                              | \~$0.1-0.5                                                                                                                              |

### 1\. Skip Go Fast ("Instant Deposit")

Skip Go Fast is a **decentralized bridging protocol**, developed by **Skip**, that enables **rapid and secure cross-chain transactions** across major blockchain ecosystems such as Ethereum, Cosmos, and Solana. Go Fast accelerates cross-chain actions by up to 25 times, **reducing onboarding times from 10+ minutes to seconds**. Learn more [here](https://docs.skip.build/go/advanced-transfer/go-fast#go-fast).

#### Supported Chains & Assets

- **Chains:** Ethereum Mainnet, Arbitrum, Avalanche, Base, Optimism, Polygon
- **Assets:** USDC, ETH, POL

#### Minimum & Maximum Transfer Sizes

| Source Chain     | Min Transfer (USD) | Max Transfer (USD) |
| ---------------- | ------------------ | ------------------ |
| Ethereum Mainnet | 50                 | 25,000             |
| Arbitrum         | 1                  | 25,000             |
| Base             | 1                  | 25,000             |
| Optimism         | 1                  | 25,000             |
| Polygon          | 1                  | 25,000             |

For the latest Minimum & Maximum Transfer Sizes, checkout the Skip API [documents](https://docs.skip.build/go/advanced-transfer/go-fast#what-are-the-minimum-and-maximum-transfer-sizes-for-go-fast%3F).

**Note:** If starting with an asset that is not USDC, Skip Go will swap the asset to USDC on the source chain, and the post-swap amount is used to determine if it falls within the min/max transfer size limits.

#### Fees

All Skip Go Fast

10 bps on the transfer size \+ source chain fee:

| Source Chain     | Fee (USD)                          |
| ---------------- | ---------------------------------- |
| Ethereum Mainnet | \~$2.5 (depends on gas fees)       |
| Arbitrum         | \~$0.01-$0.1 (depends on gas fees) |
| Base             | \~$0.01-$0.1 (depends on gas fees) |
| Optimism         | \~$0.01-$0.1 (depends on gas fees) |
| Polygon          | \~$0.01-$0.1 (depends on gas fees) |

For the latest source chain fees, checkout the Skip API [documents](https://docs.skip.build/go/advanced-transfer/go-fast#what-is-the-fee-model-for-go-fast%3F).

#### Process Flow (Deposit)

1. **Connect your wallet** to the dYdX interface and navigate to the "Deposit" section
2. **Enter the amount** you wish to transfer (ensure it meets minimum requirements)
3. **Select “Instant”** as your deposit method
4. **Choose the source chain and asset** you wish to deposit
5. **Review the transaction details** including estimated fees and finality time
6. **Confirm and sign** the transaction from your wallet
7. **Skip Go Fast protocol's solvers** monitor for confirmation of fund arrival at Noble
   - _Note: This process relies on Skip's decentralized solver network_
   - _If your source token is not USDC, an automatic swap occurs via integrated DEXs_
8. **Once confirmed**, funds are automatically **sent to dYdX Chain** via IBC transfer
   - _This step uses Cosmos IBC relayers to complete the cross-chain transfer_
9. **Final step:** Funds are **moved from the main account to the subaccount for trading**
   - _This internal transfer is handled by dYdX Chain’s infrastructure_

#### Example Deposit (Base → dYdX via Skip Go Fast)

```
{
    "operations": [
        {
            "evm_swap": {
                "from_chain_id": "8453",
                "denom_in": "base-native",
                "denom_out": "USDC",
                "amount_in": "10511954965182950",
                "amount_out": "21430265",
                "swap_venues": [
                    {"name": "base-uniswap"}
                ]
            }
        },
        {
            "cctp_transfer": {
                "from_chain_id": "8453",
                "to_chain_id": "noble-1",
                "denom_in": "USDC",
                "denom_out": "uusdc",
                "bridge_id": "CCTP"
            }
        },
        {
            "transfer": {
                "from_chain_id": "noble-1",
                "to_chain_id": "dydx-mainnet-1",
                "denom_in": "uusdc",
                "denom_out": "ibc/USDC",
                "bridge_id": "IBC"
            }
        }
    ]
}
```

#### How Skip Go Fast Works

Skip Go Fast uses an innovative solver-based approach to achieve near-instant finality:

1. **User Intent Submission**
   - When you initiate a transfer, you call the `submitOrder` function on the protocol contract
   - This broadcasts your intent to transfer assets across chains
   - Your intent specifies the assets, destination address, and any additional message payload
2. **Solver Network**
   - Permissionless participants called "solvers" watch for these intents
   - Solvers evaluate whether they can fulfill your intent based on:
     - Their available liquidity on the destination chain
     - Potential reward for fulfilling the intent
   - When a solver agrees to fulfill your intent, they use their own capital to front the assets
3. **Instant Fulfillment**
   - The solver calls the `fillOrder` function on the destination chain
   - This transfers the specified assets and processes any additional actions
   - From your perspective, the assets appear on the destination chain almost instantly
4. **Settlement Process**
   - After fulfilling your transfer, the solver initiates settlement to recover their fronted assets
   - The protocol verifies the solver's actions via a cross-chain messaging system
   - Once confirmed, the solver receives their assets back plus any earned fees
   - This settlement happens in the background and doesn't affect your user experience.

### 2\. Skip Go ("Normal")

Skip Go API is a **universal interoperability platform**, allowing **seamless swaps and transfers** across multiple blockchain ecosystems via **bridges such as CCTP and Axelar**.

Supported Chains & Assets

- **Chains:** Ethereum Mainnet, Arbitrum, Avalanche, Base, Optimism, Polygon, Solana, and Cosmos chains
- **Assets:** USDC, ETH, POL

#### Minimum & Maximum Transfer Sizes

| Source Chain     | Min Transfer (USD) | Max Transfer (USD) |
| ---------------- | ------------------ | ------------------ |
| Ethereum Mainnet | \~$0.05            | \~$1,000,000       |
| Other EVM Chains | \~$0.05            | \~$1,000,000       |
| Solana           | \~$0.05            | \~$1,000,000       |
| Cosmos Chains    | \~$0.05            | \~$1,000,000       |

####Fees  
Source chain gas fees \+ Deposits \~$0.02 Withdrawals: \~$0.1-$7

| Source Chain     | Fee (USD)                               |
| ---------------- | --------------------------------------- |
| Ethereum Mainnet | Deposits \~$0.02 Withdrawals: \~$0.1-$7 |
| Other EVM Chains | Deposits \~$0.02 Withdrawals: \~$0.1-$7 |
| Solana           | Deposits \~$0.02 Withdrawals: \~$0.1-$7 |
| Cosmos Chains    | Deposits \~$0.02 Withdrawals: \~$0.1-$7 |

#### Process Flow (Deposit)

1. **Connect your wallet** to the dYdX interface and navigate to the "Deposit" section
2. **Enter the amount** you wish to transfer (First time 1.25 USDC will be kept in wallet for gas fees)
3. **Select “Normal”** as your deposit method
4. **Choose source chain and asset** you wish to deposit
5. **Review the transaction details** including estimated fees and finality time
6. **Confirm and sign** the transaction from your wallet
7. **Third-party protocol interactions begin:**
   - _If your source token is not USDC, an automatic swap occurs via integrated DEXs_
   - _Funds are sent to bridge contracts (CCTP, Axelar, etc.) based on optimal route_
   - _These bridges rely on external validators and relayers to verify cross-chain transactions_
8. **Wait for confirmation** across all involved networks (may take 10-20 minutes)
   - _Multiple relayer networks and validators must reach consensus_
   - _Each bridge and network has its own finality period_
9. **Once confirmed**, funds are available in your dYdX account
   - _Relayers monitor and trigger the final IBC transfer to dYdX Chain_

#### Example Deposit (Ethereum → dYdX via Skip Go)

```
{
    "operations": [
        {
            "cctp_transfer": {
                "from_chain_id": "1",
                "to_chain_id": "noble-1",
                "denom_in": "USDC",
                "denom_out": "uusdc",
                "bridge_id": "CCTP"
            }
        },
        {
            "transfer": {
                "from_chain_id": "noble-1",
                "to_chain_id": "dydx-mainnet-1",
                "denom_in": "uusdc",
                "denom_out": "ibc/USDC",
                "bridge_id": "IBC"
            }
        }
    ]
}
```

### 3\. Deposit with Coinbase

**Coinbase deposits** involve an **automatic Noble Wallet to dYdX IBC transfer** without needing a third-party bridge.

Process Flow (Deposit)

1. **On dYdX, select "Coinbase" to display the Noble address associated with the trader's dYdX address.**
   - The trader can then scan the QR code on Coinbase using the Coinbase QR code scanner, or copy and paste the Noble address into the destination address on the Coinbase withdrawal modal. Traders should make sure the Noble address is correct when depositing from Coinbase.
2. **Open Coinbase app** and navigate to the USDC asset page
3. **Select "Send"** and choose "Coinbase Pay" as the destination
4. **Enter your Noble address wallet address** (starts with "noble1...")
5. **Enter the amount** you wish to transfer
6. **Confirm the transaction** in Coinbase
7. **Wait for confirmation** (typically 1-3 minutes)
   - _Note: This process relies on Coinbase's infrastructure and Noble's IBC integration_
   - _Coinbase handles the initial funds transfer to Noble's USDC hub_
8. **Funds will automatically route** through Noble to dYdX via IBC
   - _This automatic routing uses the IBC relayer network_
   - _No swaps occur in this process as USDC moves directly between compatible chains_

#### Example Deposit (Coinbase → dYdX)

```
{
    "operations": [
        {
            "transfer": {
                "from_chain_id": "noble-1",
                "to_chain_id": "dydx-mainnet-1",
                "denom_in": "uusdc",
                "denom_out": "ibc/USDC",
                "bridge_id": "IBC"
            }
        }
    ]
}
```

### 4\. Direct IBC Transfer

For users familiar with the Cosmos ecosystem, direct IBC transfers provide a straightforward method to deposit funds.

Supported Cosmos Chains

- Osmosis
- Cosmos Hub
- Kujira
- Noble
- Injective
- And other IBC-enabled chains

#### Process Flow (Deposit)

1. **Open your Cosmos wallet** (Keplr, Leap, etc.)
2. **Navigate to the IBC Transfer section**
3. **Select dYdX Chain as the destination**
4. **Enter your dYdX wallet address**
5. **Enter the amount** you wish to transfer
6. **Confirm the transaction**
7. **IBC relayer network processes the transfer:**
   - _IBC relayers run by validators and third-party services handle the cross-chain message delivery_
   - _No centralized entity controls this process; it's based on the Cosmos IBC protocol_
   - _If transferring a non-native token, ensure it's an IBC-supported asset on both chains_
8. **Wait for confirmation** (typically 15-30 seconds)
   - _Faster than bridging solutions as it doesn't require multi-chain consensus_

#### Withdrawal Process

Withdrawing from dYdX Chain requires first moving funds from your trading subaccount to your main account before bridging to your destination chain.

Step-by-Step Withdrawal Guide

1. **Connect your wallet** to the dYdX interface
2. **Navigate to "Portfolio" \> "Balances"**
3. **Navigate to "Withdraw" section**
4. **Select your preferred withdrawal method:**
   - Skip Go (for more chain options)
   - Direct IBC Transfer (for Cosmos destinations)
5. **Choose destination chain and asset**
   - _If withdrawing to a non-USDC token, a swap will be executed by third-party DEXs_
6. **Enter withdrawal amount (minimum 11 USDC)**
7. **Review transaction details**
   - _Pay attention to the relayers and bridges involved in your specific route_
8. **Confirm and sign the transaction**
9. **Third-party services process your withdrawal:**
   - _For Skip methods: Relayers monitor for your transaction and execute cross-chain transfers_
   - _For IBC transfers: IBC relayer network handles the IBC_
   - _Multiple validators may need to confirm your transaction depending on the route_
10. **Wait for confirmation** across all networks
    - _Timeframes vary based on network congestion and the third-party services involved_

#### Withdrawal Timeframes

| Withdrawal Method | Approximate Time |
| ----------------- | ---------------- |
| Skip Go           | 1-5 minutes      |
| Direct IBC        | 30 seconds       |

## **Troubleshooting**

### **Common Deposit Issues**

1. **Funds not appearing in your dYdX account**
   - Verify transaction succeeded on source blockchain explorer
   - Check Noble explorer for IBC transfer confirmation
   - Ensure you've connected the correct wallet to dYdX interface; this is important for the autosweeping to happen from noble to dYdX chain and to sweep into your dYdX subaccount
   - Check [Range Tracker Tool](https://usdc.range.org/usdc) to see if relayers have picked up your transaction
   - Wait at least 30 minutes for all confirmations to complete
2. **Transaction stuck or pending**
   - For EVM chains, check if gas price was too low
   - Verify if transaction was rejected on source chain
   - For Skip bridges, check status on [Range](https://usdc.range.org/usdc) to see if relayers have picked up your transaction
   - Check if relayer networks are experiencing delays or outages
   - Verify all involved third-party services are operational
3. **Insufficient funds error**
   - Ensure you're accounting for network fees in addition to transfer amount
   - Verify minimum transfer requirements are met
   - For swaps, account for price impact and slippage
4. **Failed at swap stage**
   - Check if the DEX had sufficient liquidity for your swap
   - Verify slippage settings were appropriate for market conditions
   - Consider trying another deposit method that doesn't require a swap

### **Bridge-Specific Troubleshooting**

For detailed troubleshooting guides specific to each bridge, please refer to:

1. **Skip Transaction Troubleshooting**
   - [Skip Documentation Portal](https://docs.skip.money)
   - Input _tx_hash_ and source chain _chain_id_ into [Skip API](https://docs.skip.build/go/api-reference/prod/transaction/get-v2txstatus?playground=open)
2. **CCTP Troubleshooting Guide**
   - [dYdX CCTP Documentation](https://dydx.exchange/blog/cctp)
   - [Circle CCTP Status Page](https://status.circle.com)
   - [USDC Tracker Tool](https://usdc.range.org/usdc)
   - **dYdX Chain Explorer**: [https://www.mintscan.io/dydx](https://www.mintscan.io/dydx)
   - **Noble Chain Explorer**: [https://www.mintscan.io/noble](https://www.mintscan.io/noble)
   - **Source Chain Explorer**: Etherscan, Arbiscan, etc.
3. **IBC Transfer Issues**
   - [Mintscan IBC Explorer](https://www.mintscan.io/ibc)
   - [IBC Relayer Status](https://ibc.range.org)
4. **Relayer issues**
   - Check status pages for relayer networks involved in your transaction
   - Wait for relayer networks to resume normal operation if experiencing downtime
   - Consider using an alternative deposit method if persistent issues occur

If you encounter persistent bridging issues, follow these steps:

1. **Identify where your funds are currently located**
   - Use block explorers for each relevant chain (source, Noble, dYdX)
   - For Skip transactions, check the `transfer_asset_release` field in the API response
2. **Try manual recovery methods if needed**
   - For IBC: Use Keplr or Leap wallet to manually complete pending transfers
   - For CCTP: Follow the manual process described in the CCTP section
   - For Skip: Contact Skip support through their Discord
3. **Contact appropriate support**
   - **Check the [dYdX Status Page](https://status.dydx.exchange)** for any known issues
   - **Join the [dYdX Discord](https://discord.gg/dydx)** for community support
   - **Open a support ticket** via the dYdX interface
   - **Skip issues:** [Skip Discord](https://discord.gg/skip-protocol)
   - **Noble issues:** [Noble Discord](https://discord.gg/noble)

Remember to include transaction details, wallet addresses, and a clear description of the issue for faster resolution.

## **Best Practices**

1. **Always start with a small test transaction** when using a new deposit or withdrawal method
2. **Keep your wallet connected** to dYdX frontend for auto-sweeping
3. **Save transaction hashes** for all operations
4. **Double-check all addresses** before confirming transactions
5. **Ensure your destination wallet supports** the asset you're withdrawing
6. **For large transfers, use Skip Go** instead of Skip Go Fast for better reliability
7. **Always move funds from sub account to main account** before initiating withdrawals
8. **Understand third-party dependencies** in your chosen transfer route:
   - _Skip relies on their own solver network and DEX integrations_
   - _IBC transfers depend on the Cosmos relayer infrastructure_
   - _Coinbase deposits rely on Coinbase's infrastructure and Noble's IBC integration_
9. **Monitor relayer and bridge status** during high network congestion periods
10. **Have backup withdrawal methods** in case one bridge or relayer network experiences issues
