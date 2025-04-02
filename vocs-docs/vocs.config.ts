import { defineConfig } from 'vocs'

export default defineConfig({
  title: 'dYdX Documentation',
  sidebar: [
    {
      text: 'Use a client library',
      link: '/client',
      items: [
        {
          text: 'Quick start with Rust',
          link: '/client/quick-start-rs',
        },
        {
          text: 'Quick start with TypeScript',
          link: '/client/quick-start-ts',
        },
        {
          text: 'Quick start with Python',
          link: '/client/quick-start-py',
        },
      ],
    },
    {
      text: 'Getting Started',
      link: '/getting-started',
    },
    {
      text: 'Example',
      link: '/example',
    },
  ],
})
