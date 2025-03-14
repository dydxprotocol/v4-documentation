import Head from 'next/head';
import type { AppProps } from 'next/app'
import * as React from 'react'
import Script from 'next/script'


import 'nextra-theme-docs/style.css'
import '../styles.css'
import '../fonts.css'

const GA_ID = 'G-BM5F5DVTBF'  // Your GA ID here


function App({ Component, pageProps }: AppProps) {

  return (
    <>
      <Script
        strategy="afterInteractive"
          src="https://widget.kapa.ai/kapa-widget.bundle.js"
          data-website-id="c82800f5-e43e-4afe-86c5-dc5ba554a339"
          data-project-name="kapa.ai"
          data-project-color="#FF0000"
          data-project-logo="https://dydx.exchange/icon.svg"
          data-user-analytics-fingerprint-enabled="true"
          />

              {/* Google Analytics */}
        <Script
          strategy="lazyOnload"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        />
        <Script strategy="lazyOnload" id="ga-script">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
      <Component {...pageProps} />
    </>
  )
}

export default App
