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
    ]
  },
})
