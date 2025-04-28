import { defineConfig } from 'vocs'

export default defineConfig({
    title: 'dYdX Documentation',
    basePath: '/dydx-documentation',
    sidebar: [
        {
            text: 'Getting Started',
            link: '/client',
            items: [
                {
                    text: 'Quick start with Python 🚧',
                    link: '/client/quick-start-py',
                },
                {
                    text: 'Quick start with Rust 🚧',
                    link: '/client/quick-start-rs',
                },
                {
                    text: 'Quick start with TypeScript 🚧',
                    link: '/client/quick-start-ts',
                },
                {
                    text: 'Getting the mnemonic phrase',
                    link: '/todo',
                },
            ],
        },
        {
            text: 'Interaction',
            link: '/interaction',
            items: [
                {
                    text: 'Wallet Setup',
                    link: '/interaction/wallet-setup',
                },
                {
                    text: 'Available clients',
                    link: '/interaction/clients',
                },
                {
                    text: 'Trading',
                    link: '/interaction/trading',
                },
                {
                    text: 'Asset management',
                    link: '/interaction/asset-management',
                },
                {
                    text: 'Data',
                    link: '/interaction/data',
                    collapsed: true,
                    items: [
                        {
                            text: 'Account balance',
                            link: '/interaction/account-balance',
                        },
                        {
                            text: 'List orders',
                            link: '/interaction/list-orders',
                        },
                        {
                            text: 'List positions',
                            link: '/interaction/list-positions',
                        },
                        {
                            text: 'List fills',
                            link: '/interaction/list-fills',
                        },
                        {
                            text: 'List markets',
                            link: '/interaction/list-markets',
                        },
                        {
                            text: 'Block height',
                            link: '/interaction/block-height',
                        },
                        {
                            text: 'Trading rewards',
                            link: '/interaction/trading-rewards',
                        },
                        {
                            text: 'Fee tiers',
                            link: '/interaction/fee-tiers',
                        },
                        {
                            text: 'Reward parameters',
                            link: '/interaction/reward-parameters',
                        },
                        {
                            text: 'Watch orderbook',
                            link: '/interaction/watch-orderbook',
                        },
                    ],
                },
                {
                    text: 'MegaVault',
                    link: '/megavault',
                    collapsed: true,
                    items: [
                        {
                            text: 'Deposit',
                            link: '/interaction/depoist',
                        },
                        {
                            text: 'Withdraw',
                            link: '/interaction/withdraw',
                        },
                    ],
                },
                {
                    text: 'Permissioned Keys',
                    link: '/permissioned-keys',
                },
            ],
        },
        {
            text: 'Architecture',
            link: '/todo',
            items: [
                {
                    text: 'Structure',
                    link: '/todo',
                    collapsed: true,
                    items: [
                        {
                            text: 'Validators (aka Nodes)',
                            link: '/todo',
                        },
                        {
                            text: 'Indexer',
                            link: '/todo',
                        },
                        {
                            text: 'Networks',
                            link: '/todo',
                        },
                    ],
                },
                {
                    text: 'Trading / Perpetual Contracts',
                    link: '/todo',
                    collapsed: true,
                    items: [
                        {
                            text: 'Accounts and Subaccounts',
                            link: '/todo',
                        },
                        {
                            text: 'Assets and Perpetuals',
                            link: '/todo',
                        },
                        {
                            text: 'Orders',
                            link: '/todo',
                        },
                        {
                            text: 'Margin',
                            link: '/todo',
                        },
                        {
                            text: 'Funding',
                            link: '/todo',
                        },
                        {
                            text: 'Price data',
                            link: '/todo',
                        },
                        {
                            text: 'Permissioned keys / Authenticators',
                            link: '/todo',
                        },
                        {
                            text: 'MegaVault',
                            link: '/todo',
                        },
                        {
                            text: 'Markets',
                            link: '/todo',
                        },
                    ],
                },
            ],
        },
        /*
        {
            text: 'Full API',
            link: '/todo',
            items: [
                {
                    text: 'HTTP API',
                    link: '/todo',
                },
                {
                    text: 'WebSockets',
                    link: '/todo',
                },
                {
                    text: 'gRPC',
                    link: '/todo',
                },
            ],
        },
        */
        {
            text: 'Full API',
            link: '/api',
            items: [
                {
                    text: 'Node API',
                    link: '/node-client',
                    collapsed: false,
                    items: [
                        {
                            text: 'Public API',
                            link: '/node-client/public',
                        },
                        {
                            text: 'Private API',
                            link: '/node-client/private',
                        },
                    ],
                },
                {
                    text: 'Indexer API',
                    link: '/indexer-client',
                },
                {
                    text: 'Noble API',
                    link: '/noble-client',
                },
                {
                    text: 'Faucet API',
                    link: '/faucet-client',
                },
            ],
        },
        {
            text: 'Policies',
            link: '/todo',
            items: [
                {
                    text: 'Security',
                    link: '/todo',
                },
                {
                    text: 'Terms of Service and Privacy',
                    link: '/todo',
                },
            ],
        },
        /*
        {
            text: 'Setup',
            link: '/setup',
            items: [
                {
                    text: 'Endpoints',
                    link: '/endpoints',
                },
                {
                    text: 'Wallet Setup',
                    link: '/wallet-setup',
                },
                {
                    text: 'Clients',
                    link: '/clients',
                },
            ]
        },
        {
            text: 'API Map',
            link: '/api-map',
        },
        {
            text: 'Node Client',
            link: '/node-client/intro',
            items: [
            ],
        },
        {
            text: 'Trading',
            link: '/api',
            items: [
                {
                    text: 'Order Parameters 🚧',
                    link: '/api/order_parameters',
                },
                {
                    text: 'Placing An Order 🚧',
                    link: '/api/place_order',
                },
                {
                    text: 'Cancelling An Order 🚧',
                    link: '/api/cancel_order',
                },
            ]
        },
        */
    ],
})

/*
Clients +
    JavaScript / TypeScript +
    Python +
    Rust +
    Getting the mnemonic phrase

API: functional
    Wallet setup
    Available clients
    Trading
        Placing an order
        Cancelling an order
    Asset management
    Data
        Account balance
        List orders
        List positions
        List fills
        List markets
        Block height
        Trading rewards
        Fee tiers
        Reward parameters
        Create orderbook?
    MegaVault
        Deposit
        Withdraw
    Permissioned Keys
        Creating an authenticator
        Add authenticator
        Remove authenticator
        Permissioned trading
    Noble client
    Faucet client

Architecture
    Structure
        Validators (aka Nodes)
        Indexer
        Networks
    Trading / Perpetual Contracts
        Accounts and Subaccounts
        Assets and Perpetuals
        Orders
        Margin
        Funding
        Price data
        Permissioned keys / Authenticators
        MegaVault
        Markets
API: doc all methods
    HTTP API
    WebSockets
    gRPC
Policies
    Security
    Terms of Service and Privacy
*/


/*
Onboarding
Configuring a Network
Initialize Client
Setup Mnemonic
Transfer
Deposit
Withdraw
Simulate a Transaction
Sign a Transaction
Send a Transaction
Selecting desired gas token
Get Account Balances
Placing an Order
Replacing an Order
Cancelling an Order
*/

/*
GetAddress
GetSubaccount
GetParentSubaccount
GetAssetPositions
GetAssetPositionsForParentSubaccount
GetCandles
Screen
GetFills
GetFillsForParentSubaccount
GetHeight
GetTradingRewards
GetHistoricalFunding
GetHistoricalPnl
GetHistoricalPnlForParentSubaccount
GetAggregations
GetPerpetualMarket
ListOrders
ListOrdersForParentSubaccount
GetOrder
ListPerpetualMarkets
ListPositions
ListPositionsForParentSubaccount
Get
GetTime
GetTrades
GetTransfers
GetTransfersForParentSubacc
*/
