const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  mdxOptions: {
    remarkPlugins: [],
    rehypePlugins: [],
  },

  async redirects() {
    return [
      {
        source: '/rewards',
        destination: '/concepts-trading',
        permanent: true, // Set to false for temporary redirects
      },
      // Add more redirects here
    ]
  },
})

module.exports = withNextra()
