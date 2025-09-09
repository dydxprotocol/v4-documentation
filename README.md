<p align="center"><img src="https://dydx.exchange/icon.svg?" width="256" /></p>

<h1 align="center">dYdX Chain Documentation</h1>

<div align="center">
  <a href='https://github.com/dydxprotocol/v4-documentation/blob/024e1b35537ba619b79576d07464a8cb4eb2de66/LICENSE'>
    <img src='https://img.shields.io/badge/License-AGPL_v3-blue.svg' alt='License' />
  </a>
</div>

## Local Development

Install `pnpm` and project dependencies:

```bash
nvm install 22 && nvm use 22
npm install -g pnpm
pnpm i
```

Start development server on localhost:3000:

```bash
pnpm dev
```

## Formatting

To format .mdx files, you can use the [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extension in VSCode.

## Github Actions

Upon push of a commit, the following checks are made:

- [markdown-link-check](https://github.com/gaurav-nelson/github-action-markdown-link-check) checks that all links work.
  - If you are configuring a link that is erroring out, considering adding something to the [mlc_config.json](./mlc_config.json) using [these options](https://github.com/tcort/markdown-link-check#config-file-format).
