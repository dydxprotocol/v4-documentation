# Testnet Expectations

This document lays expectations for testnet participants.

1. 📖 Please read and follow the shared documentation / instructions
2. ⚠️ [Validators] For time-sensitive activities (i.e. submitting `gentx` , performing upgrades, and etc), please complete the activities by the deadline.
   - If you are unable to complete the task by the given deadline, you may not be able to participate in the testnet.
3. 🕛 dYdX engineers will be available during working hours: Monday to Friday 9am - 6pm EST
   - We will do our best to address network issues outside those hours, but this will be on a best-effort basis
4. 🙇 Provide feedback and ask questions by
   - submitting bugs / issues to this [Google form](https://forms.gle/3bQYBwLFZEUWkjkB9)
   - being involved in our [v4 public testnet feedback channel](https://discord.com/channels/724804754382782534/1117897181886677012) on Discord
   - [Validators] replying to survey questions that will be sent out
   - [Validators] bringing up topics in your communication channels
5. 🧑‍🔧 The below core trading flow will be available for testing via integrations/APIs/websockets. There will also be a frontend component to the public testnet, accessible at https://v4.testnet.dydx.exchange/.
   - Generating private keys
   - Getting funds from faucet
      - Users will be primarily directed to receive testnet USDC from a faucet operated by dYdX Trading
      - Over the course of the public testnet, feature releases will be rolled out that enables users to test bridging mechanics from other chains
      - Rate limits apply: 1000 USDC per request, 2 requests per wallet per day, 10 requests per IP address per day, and 1000 requests total per day
   - Trading in all v3 markets except for RUNE, UMA, ENJ, and CELO
   - Viewing the order book
   - Viewing the price chart, depth chart, funding chart, and market details
   - Viewing the market stats header (e.g., 1h funding, 24h volume, etc.)
   - Placing market orders
   - Placing limit orders with GTT, IoC, FoK, and post-only advanced options
   - Canceling short-term and stateful (long-term and on-chain) orders
   - Viewing orders and fills history by selected market or all markets
   - Viewing position information by selected market or all markets
   - Viewing your account’s information and state diffs when placing an order
   - Viewing PnL
6. 💜 Be helpful and kind to one another
