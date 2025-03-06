import React from "react";
import { DocsThemeConfig, useConfig } from "nextra-theme-docs";
import { useRouter } from "next/router";

import { Logo } from "./components/Logo";

const config: DocsThemeConfig = {
  // Global
  docsRepositoryBase: "https://github.com/dydxprotocol/v4-documentation/tree/main",
  feedback: { content: null }, // disable until we have a feedback channel
  useNextSeoProps: () => {
    const { asPath } = useRouter();
    if (asPath !== "/") {
      return {
        titleTemplate: "%s · dYdX · v4",
      };
    }
  },
  head: () => {
    const { title } = useConfig();
    return (
      <>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="og:title"
          content={title ? title + " · dYdX · v4" : "dYdX · v4"}
        />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.png" type="image/png" />
      </>
    );
  },

  // Theming
  primaryHue: 241.18,
  darkMode: false,
  nextThemes: {
    forcedTheme: "dark",
  },
  // Navbar
  logo: <Logo />,
  project: {},
  chat: {},

  // Footer
  footer: {
    text: (
      <span>
        <strong>Disclaimer:</strong> Note that as of the date hereof, the testnet and dYdX Chain deployment by DYDX token holders are the only known deployments of the dYdX v4 software, and other deployment options may be added. For more information, please see{" "}
        <a href="https://dydx.exchange/dydx-chain-front-end-options" target="_blank">
          https://dydx.exchange/dydx-chain-front-end-options
        </a>
      </span>
    )
  },

  // sidebar
  sidebar: {
    defaultMenuCollapseLevel: 1
  }
};

export default config;
