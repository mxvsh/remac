/* --- styles --- */

import '../styles/globals.css'
import '@fontsource/ubuntu/400.css'
import '@fontsource/open-sans/400.css'

/* --- end styles --- */

import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../theme'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>remac</title>
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
