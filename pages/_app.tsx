import type { AppProps } from 'next/app'
import * as React from 'react'

import 'nextra-theme-docs/style.css'
import '../styles.css'


function App({ Component, pageProps }: AppProps) {

  return (
    <Component {...pageProps} />
  )
}

export default App