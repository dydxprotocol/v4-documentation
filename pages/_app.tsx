import Head from 'next/head';
import type { AppProps } from 'next/app'
import * as React from 'react'

import 'nextra-theme-docs/style.css'
import '../styles.css'
import '../fonts.css'


function App({ Component, pageProps }: AppProps) {

  return (
    <>
      <Head>
        <script
          async
          src="https://widget.kapa.ai/kapa-widget.bundle.js"
          data-website-id="c82800f5-e43e-4afe-86c5-dc5ba554a339"
          data-project-name="kapa.ai"
          data-project-color="#FF0000"
          data-project-logo="https://dydx.exchange/icon.svg"
        ></script>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default App
