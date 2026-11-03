const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  mdxOptions: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

module.exports = withNextra({
  async redirects() {
    return [
      // Landing page redirect
      { source: '/', destination: 'https://docs.dydx.xyz', permanent: true },
  
      // Original top-level
      { source: '/security', destination: '/other-security', permanent: true },
      { source: '/terms_of_use_and_privacy_policy.md', destination: '/other-terms_of_use_and_privacy_policy.md', permanent: true },
      { source: '/FAQ', destination: '/user-faqs', permanent: true },

      // Architecture
      { source: '/architecture/architectural_overview', destination: '/concepts-architecture/architectural_overview', permanent: true },
      { source: '/architecture/indexer', destination: '/concepts-architecture/indexer', permanent: true },

      // Deposits and Withdrawals
      { source: '/deposits_and_withdrawals/:slug*', destination: '/api_integration-deposits_and_withdrawals/:slug*', permanent: true },

      // Developers
      { source: '/developers/constants', destination: '/api_integration-constants', permanent: true },
      { source: '/developers/open_source_repositories', destination: '/api_integration-repositories.md', permanent: true },

      // Developers - Clients
      { source: '/developers/clients/:slug*', destination: '/api_integration-clients/:slug*', permanent: true },

      // Developers - Indexer
      { source: '/developers/indexer/:slug*', destination: '/api_integration-indexer/:slug*', permanent: true },

      // Getting started
      { source: '/getting_started/depositing_and_user_journeys', destination: 'introduction-getting_started', permanent: true },
      { source: '/getting_started/margin_calculations', destination: 'concepts-trading/margin', permanent: true },
      { source: '/getting_started/onboarding_faqs', destination: 'introduction-onboarding_faqs', permanent: true },
      { source: '/getting_started/rewards_fees_and_parameters', destination: 'concepts-trading/rewards_fees_and_parameters', permanent: true },

      // Governance
      { source: '/governance/:slug*', destination: '/users-governance/:slug*', permanent: true },

      // Guides
      { source: '/guides/:slug*', destination: '/api_integration-guides/:slug*', permanent: true },

      // Network
      { source: '/network/:slug*', destination: '/infrastructure_providers-network/:slug*', permanent: true },

      // Operators
      { source: '/operators/:slug*', destination: '/infrastructure_providers-operators/:slug*', permanent: true },

      // Rewards
      { source: '/rewards/:slug*', destination: '/users-rewards/:slug*', permanent: true },

      // Trading
      { source: '/trading:slug*', destination: '/api_integration-trading/:slug*', permanent: true },

      // Validators
      { source: '/validators/:slug*', destination: '/infrastructure_providers-validators/:slug*', permanent: true },
      { source: '/validators/upgrades/:slug*', destination: '/infrastructure_providers-validators/upgrades/:slug*', permanent: true },

      // to new document pages
      { source: '/api_integration-indexer/indexer_api', destination: 'https://docs.dydx.xyz/indexer-client/http', permanent: true },
      { source: '/users-rewards/overview', destination: 'https://docs.dydx.xyz/concepts/trading/rewards', permanent: true },
      { source: '/introduction-getting_started', destination: 'https://docs.dydx.xyz/interaction/client/quick-start-py', permanent: true },
      { source: '/introduction-trading_fees', destination: 'https://docs.dydx.xyz/concepts/trading/rewards#fees', permanent: true },
      { source: '/api_integration-trading/order_types', destination: 'https://docs.dydx.xyz/concepts/trading/orders', permanent: true },
      { source: '/concepts-architecture/architectural_overview', destination: 'https://docs.dydx.xyz/concepts/architecture/overview', permanent: true },
      { source: '/user-guides/how_to_troubleshoot_withdrawals_and_deposits', destination: 'https://docs.dydx.xyz/interaction/deposits-withdrawals/overview', permanent: true },
      { source: '/api_integration-repositories', destination: 'https://docs.dydx.xyz/repositories#open-source-repositories', permanent: true },
      { source: '/infrastructure_providers-validators/set_up_full_node', destination: 'https://docs.dydx.xyz/nodes/running-node/setup', permanent: true },
      { source: '/concepts-trading/margin', destination: 'https://docs.dydx.xyz/concepts/trading/margin', permanent: true },
      { source: '/users-rewards/staking_rewards', destination: 'https://docs.dydx.xyz/concepts/trading/rewards/staking-rewards', permanent: true },
      { source: '/other-security', destination: 'https://docs.dydx.xyz/policies/security', permanent: true },
      { source: '/api_integration-guides/how_to_interpret_block_data_for_trades', destination: 'https://docs.dydx.xyz/concepts/trading/quantums', permanent: true },
      { source: '/api_integration-guides/how_to_permissioned_keys', destination: 'https://docs.dydx.xyz/concepts/trading/authenticators', permanent: true },
      { source: '/api_integration-indexer/indexer_websocket', destination: 'https://docs.dydx.xyz/indexer-client/websockets', permanent: true },
      { source: '/infrastructure_providers-network/resources', destination: 'https://docs.dydx.xyz/nodes/resources', permanent: true },
      { source: '/concepts-trading/rewards_fees_and_parameters', destination: 'https://docs.dydx.xyz/concepts/trading/rewards/trading-rewards', permanent: true },
      { source: '/infrastructure_providers-validators/running_a_validator', destination: 'https://docs.dydx.xyz/nodes/running-node/running-a-validator', permanent: true },
      { source: '/infrastructure_providers-validators/required_node_configs', destination: 'https://docs.dydx.xyz/nodes/running-node/required-node-configs', permanent: true },
      { source: '/api_integration-guides/how_to_isolated', destination: 'https://docs.dydx.xyz/concepts/trading/isolated-positions', permanent: true },
      { source: '/api_integration-trading/rate_limits', destination: 'https://docs.dydx.xyz/concepts/trading/rate-limits', permanent: true },
      { source: '/infrastructure_providers-validators/full_node_streaming', destination: 'https://docs.dydx.xyz/nodes/full-node-streaming', permanent: true },
      { source: '/users-rewards/trading_rewards', destination: 'https://docs.dydx.xyz/concepts/trading/rewards/trading-rewards', permanent: true },
      { source: '/other-terms_of_use_and_privacy_policy', destination: 'https://docs.dydx.xyz/policies/terms', permanent: true },
      { source: '/api_integration-guides/how_to_transfer_tokens_between_accounts', destination: 'https://docs.dydx.xyz/concepts/trading/accounts#subaccounts', permanent: true },
      { source: '/api_integration-clients/composite_client', destination: 'https://docs.dydx.xyz/interaction/endpoints#composite-client-typescript-only', permanent: true }
    ]
  },
})
