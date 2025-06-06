import { defineConfig } from 'vocs'

export default defineConfig({
    title: 'dYdX Documentation',
    basePath: '/',
    sidebar: [
        {
            text: 'Guide',
            collapsed: true,
            items: [
                {
                    text: 'Getting Started',
                    link: '/interaction/client',
                    collapsed: true,
                    items: [
                        {
                            text: 'Quick start with Python',
                            link: '/interaction/client/quick-start-py',
                        },
                        {
                            text: 'Quick start with Rust',
                            link: '/interaction/client/quick-start-rs',
                        },
                        {
                            text: 'Quick start with TypeScript',
                            link: '/interaction/client/quick-start-ts',
                        },
                    ],
                },
                {
                    text: 'Preparing to Trade',
                    link: '/interaction/endpoints',
                },
                {
                    text: 'Wallet Setup',
                    link: '/interaction/wallet-setup',
                },
                {
                    text: 'Trading',
                    link: '/interaction/trading',
                },
                {
                    text: 'Trading Data',
                    collapsed: true,
                    items: [
                        {
                            text: 'Accounts',
                            link: '/interaction/data/accounts',
                        },
                        {
                            text: 'Market Data',
                            link: '/interaction/data/market',
                        },
                        {
                            text: 'WebSockets',
                            link: '/interaction/data/feeds',
                        },
                        {
                            text: 'Watch Orderbook',
                            link: '/interaction/data/watch-orderbook',
                        },
                    ],
                },
                {
                    text: 'Permissioned Keys',
                    link: '/interaction/permissioned-keys',
                },
                {
                    text: 'Deposits and Withdrawals',
                    link: '/interaction/deposits-and-withdrawals',
                },
            ],
        },
        {
            text: 'API',
            collapsed: true,
            items: [
                {
                    text: 'Indexer API',
                    collapsed: true,
                    items: [
                        {
                            text: 'HTTP API',
                            link: '/indexer-client/http',
                        },
                        {
                            text: 'WebSockets API',
                            link: '/indexer-client/websockets',
                        },
                    ],
                },
                {
                    text: 'Node API',
                    link: '/node-client',
                    collapsed: true,
                    items: [
                        {
                            text: 'Private API',
                            link: '/node-client/private',
                        },
                        {
                            text: 'Public API',
                            link: '/node-client/public',
                        },
                    ],
                },
                {
                    text: 'Other API',
                    collapsed: true,
                    items: [
                         {
                            text: 'Noble API',
                            link: '/noble-client',
                        },
                        {
                            text: 'Faucet API',
                            link: '/faucet-client',
                        },
                    ]
                }
            ],
        },
        {
            text: 'Concepts',
            collapsed: true,
            items: [
                {
                    text: 'Architecture',
                    collapsed: true,
                    items: [
                        {
                            text: 'Overview',
                            link: '/concepts/architecture/overview',
                        },
                        {
                            text: 'Indexer',
                            link: '/concepts/architecture/indexer',
                        },
                    ],
                },
                {
                    text: 'Trading',
                    collapsed: true,
                    items: [
                        {
                            text: 'Markets',
                            collapsed: true,
                            items: [
                                {
                                    text: 'Perpetuals and Assets',
                                    link: '/concepts/trading/assets',
                                },
                                {
                                    text: 'Isolated Markets',
                                    link: '/concepts/trading/isolated-markets'
                                },
                                {
                                    text: 'MegaVault',
                                    link: '/concepts/trading/megavault',
                                },
                                {
                                    text: 'Contract Loss Mechanism',
                                    link: '/concepts/trading/contract-loss-mechanism'
                                },
                                {
                                    text: 'Index Prices',
                                    link: '/concepts/trading/index-prices'
                                },
                                {
                                    text: 'Price Data',
                                    link: '/concepts/trading/oracle',
                                },
                            ],
                        },
                        {
                            text: 'Account Operations',
                            collapsed: true,
                            items: [
                                {
                                    text: 'Orders',
                                    link: '/concepts/trading/orders',
                                },
                                {
                                    text: 'Margin',
                                    link: '/concepts/trading/margin',
                                },
                                {
                                    text: 'Funding',
                                    link: '/concepts/trading/funding',
                                },
                                {
                                    text: 'Liquidations',
                                    link: '/concepts/trading/liquidations'
                                },
                                {
                                    text: 'Accounts and Subaccounts',
                                    link: '/concepts/trading/accounts',
                                },
                                {
                                    text: 'Permissioned Keys',
                                    link: '/concepts/trading/authenticators',
                                },
                            ],
                        },
                        {
                            text: 'Configuration, Controls & Environment',
                            collapsed: true,
                            items: [
                                {
                                    text: 'Rewards, Fees and Parameters',
                                    link: '/concepts/trading/rewards',
                                    collapsed: true,
                                    items: [
                                        {
                                            text: 'Staking Rewards',
                                            link: '/concepts/trading/rewards/staking-rewards',
                                        },
                                        {
                                            text: 'Trading Rewards',
                                            link: '/concepts/trading/rewards/trading-rewards',
                                        }
                                    ],
                                },
                                {
                                    text: 'Other Limits',
                                    link: '/concepts/trading/other-limits'
                                },
                                {
                                    text: 'Withdrawal Rate Limits and Gating',
                                    link: '/concepts/trading/withdrawal-rate-limits-and-gating'
                                },
                                {
                                    text: 'Rate Limits',
                                    link: '/concepts/trading/rate-limits'
                                },
                                {
                                    text: 'Testnet',
                                    link: '/concepts/trading/testnet'
                                },
                            ],
                        },
                    ],
                },
                {
                    text: 'Limit Orderbook and Matching',
                    link: '/concepts/limit-orderbook',
                },
            ],
        },
        {
            text: 'Nodes',
            collapsed: true,
            items: [
                {
                    text: 'Running Your Node',
                    items: [
                        {
                            text: 'Hardware Requirements',
                            link: '/nodes/running-node/hardware-requirement'
                        },
                        {
                            text: 'Required Node Configs',
                            link: '/nodes/running-node/required-node-configs'
                        },
                        {
                            text: 'Setup',
                            link: '/nodes/running-node/setup',
                        },
                        {
                            text: 'Optimize',
                            link: '/nodes/running-node/optimize',
                        },
                        {
                            text: 'Running a Validator',
                            link: '/nodes/running-node/running-a-validator'
                        },
                        {
                            text: 'Snapshots',
                            link: '/nodes/running-node/snapshots'
                        },
                        {
                            text: 'Peering with Gateway',
                            link: '/nodes/running-node/peering-with-gateway'
                        },
                        {
                            text: 'Voting',
                            link: '/nodes/running-node/voting'
                        },
                    ],
                },
                {
                    text: 'Node Streaming',
                    link: '/nodes/full-node-streaming',
                    collapsed: true,
                    items: [
                        {
                            text: 'Example',
                            link: '/nodes/full-node-streaming/example'
                        }
                    ]
                },
                {
                    text: 'Upgrades',
                    collapsed: true,
                    items: [
                        {
                            text: 'Types of Upgrades',
                            link: '/nodes/upgrades/types-of-upgrades'
                        },
                        {
                            text: 'Performing Upgrades',
                            link: '/nodes/upgrades/performing-upgrades'
                        },
                        {
                            text: 'Cosmovisor',
                            link: '/nodes/upgrades/cosmovisor'
                        },
                        {
                            text: 'Using Cosmovisor to Stage dYdX Chain binary upgrade',
                            link: '/nodes/upgrades/using-cosmovisor'
                        },
                        {
                            text: 'Upgrading Sidecar',
                            link: '/nodes/upgrades/upgrading-sidecar'
                        }
                    ]
                },
                {
                    text: 'Network Constants',
                    link: '/nodes/network-constants',
                },
                {
                    text: 'Resources',
                    link: '/nodes/resources',
                },
            ],
        },
        {
            text: 'Policies',
            collapsed: true,
            items: [
                {
                    text: 'Security',
                    link: '/policies/security',
                },
                {
                    text: 'Terms of Service & Privacy',
                    link: '/policies/terms',
                },
            ],
        },
    ],
})
