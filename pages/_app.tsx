import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import {ChakraProvider} from "@chakra-ui/provider";
import {extendTheme, Theme, theme} from "@chakra-ui/react";

function MyApp({ Component, pageProps }: AppProps) {

  return <ChakraProvider theme={extendTheme({
    components: {

    }
  } as Theme)}>
    <Component {...pageProps} />
  </ChakraProvider>
}

export default MyApp
