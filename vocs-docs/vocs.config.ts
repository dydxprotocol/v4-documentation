import { defineConfig } from 'vocs'
import React from 'react'

export default defineConfig({
    title: 'dYdX Documentation',
    iconUrl: 'https://dydx.exchange/icon.svg',
    logoUrl: 'https://dydx.exchange/icon.svg',
    basePath: '/',
    sidebar: [
        {
            text: 'Guide',
            collapsed: true,
            items: [
                {
                    text: 'Getting Started',
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
                    text: 'Deposits & Withdrawals',
                    collapsed: true,
                    items: [
                        {
                            text: 'Overview',
                            link: '/interaction/deposits-withdrawals/overview',
                        },
                        {
                            text: 'Skip Go Fast',
                            link: '/interaction/deposits-withdrawals/skipgofast',
                        },
                        {
                            text: 'Skip Go regular',
                            link: '/interaction/deposits-withdrawals/skipgo',
                        },
                        {
                            text: 'Other Deposits',
                            link: '/interaction/deposits-withdrawals/other',
                        },                
                        {
                            text: 'Withdrawals',
                            link: '/interaction/deposits-withdrawals/withdrawal',
                        },
                        {
                            text: 'Troubleshooting',
                            link: '/interaction/deposits-withdrawals/troubleshooting',
                        },
                    ]
                },
                {
                    text: 'Application Integration',
                    collapsed: true,
                    items: [
                        {
                            text: 'Overview',
                            link: '/interaction/integration/integration',
                        },
                        {
                            text: 'Data Sources',
                            link: '/interaction/integration/integration-data',
                        },
                        {
                            text: 'Compliance',
                            link: '/interaction/integration/integration-compliance',
                        },
                                                {
                            text: 'Onboarding',
                            link: '/interaction/integration/integration-onboarding',
                        },
                        {
                            text: 'Markets',
                            link: '/interaction/integration/integration-markets',
                        },
                                                {
                            text: 'User portfolio',
                            link: '/interaction/integration/integration-portfolio',
                        },
                                                {
                            text: 'Placing a trade',
                            link: '/interaction/integration/integration-trade',
                        },
                                                {
                            text: 'Builder codes',
                            link: '/interaction/integration/integration-builder-codes',
                        },
                        
                    ]
                },
            ],
        },
        {
            text: 'API',
            collapsed: true,
            items: [
                {
                    text: 'Indexer API',
                    link: '/indexer-client',
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
                },
                {
                    text: 'Repositories',
                    link: '/repositories',
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
                                    text: 'Oracle Prices',
                                    link: '/concepts/trading/oracle'
                                },
                                {
                                    text: 'Quantums and Subticks',
                                    link: '/concepts/trading/quantums'
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
                                    text: 'Isolated Positions',
                                    link: '/concepts/trading/isolated-positions',
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
                            ],
                        },
                        {
                            text: 'Limit Orderbook and Matching',
                            link: '/concepts/trading/limit-orderbook',
                        },
                    ],
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
    head: () => (
        React.createElement(React.Fragment, null, 
        // Favicon links
        React.createElement('link', {
            key: 'favicon',
            rel: 'icon',
            type: 'image/svg+xml',
            href: 'https://dydx.exchange/icon.svg'
        }),
        React.createElement('link', {
            key: 'apple-touch-icon',
            rel: 'apple-touch-icon',
            href: 'https://dydx.exchange/icon.svg'
        }),
      // Kapa AI Widget
        React.createElement('script', {
            key: 'kapa-widget',
            src: 'https://widget.kapa.ai/kapa-widget.bundle.js',
            'data-website-id': '7353f8eb-1333-44ce-8ea3-d5767430e3fc',
            'data-project-name': 'dYdX',
            'data-project-color': '#212131',
            'data-project-logo': 'https://dydx.exchange/icon.svg',
            'data-user-analytics-fingerprint-enabled': 'true',
            defer: true
        }),
        
        // Google Analytics
        React.createElement('script', {
            key: 'gtag-script',
            src: 'https://www.googletagmanager.com/gtag/js?id=GT-WR4LPXW6',
            async: true
        }),
        
        React.createElement('script', {
            key: 'gtag-config',
            dangerouslySetInnerHTML: {
            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'GT-WR4LPXW6');
            `
            }
        }),

        React.createElement('script', {
            key: 'structured-data',
            type: 'application/ld+json',
            dangerouslySetInnerHTML: {
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "WebSite",
                    "name": "dYdX Documentation",
                    "url": "https://docs.dydx.xyz",
                    "description": "Official dYdX v4 documentation for developers and validators",
                    "publisher": {
                        "@type": "Organization",
                        "name": "dYdX",
                        "logo": {
                            "@type": "ImageObject",
                            "url": "https://dydx.exchange/icon.png"
                        }
                    }
                })
            }
        }),

        // OG meta tags
        React.createElement('meta', {
            key: 'og-title',
            property: 'og:title',
            content: 'dYdX Documentation'
            }),
        React.createElement('meta', {
            key: 'og-description',
            property: 'og:description',
            content: 'Explore the official dYdX documentation for developers and traders.'
            }),
        React.createElement('meta', {
            key: 'og-image',
            property: 'og:image',
            content: 'https://dydx.exchange/icon.svg'
            }),
        React.createElement('meta', {
            key: 'og-image-width',
            property: 'og:image:width',
            content: '181'
            }),
        React.createElement('meta', {
            key: 'og-image-height', 
            property: 'og:image:height',
            content: '181'
            }),
        React.createElement('meta', {
            key: 'og-url',
            property: 'og:url',
            content: 'https://docs.dydx.xyz'
            }),
        React.createElement('meta', {
            key: 'og-type',
            property: 'og:type',
            content: 'website'
            }),

        // Twitter Card Meta Tags
        React.createElement('meta', {
            key: 'twitter-card',
            name: 'twitter:card',
            content: 'summary_large_image'
            }),
        React.createElement('meta', {
            key: 'twitter-title',
            name: 'twitter:title',
            content: 'dYdX Documentation'
            }),
        React.createElement('meta', {
            key: 'twitter-description',
            name: 'twitter:description',
            content: 'Explore the dYdX documentation for traders'
            }),
        React.createElement('meta', {
            key: 'twitter-image',
            name: 'twitter:image',
            content: 'https://dydx.exchange/icon.svg' 
            }),

        )
    )
})
