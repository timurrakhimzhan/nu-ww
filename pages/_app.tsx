import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import {ChakraProvider} from "@chakra-ui/provider";
import {extendTheme, Theme, theme} from "@chakra-ui/react";
import {withTRPC} from '@trpc/next';
import { SessionProvider } from 'next-auth/react';
import {AppRouter} from "./api/trpc/[trpc]";
import {NODE_ENV} from "../configs";

function MyApp({ Component, pageProps: {session, ...pageProps} }: AppProps) {

  return <SessionProvider session={session}>
      <ChakraProvider theme={extendTheme({} as Theme)}>
        <Component {...pageProps} />
    </ChakraProvider>
  </SessionProvider>
}

export default withTRPC<AppRouter>({
    config({ctx}) {
        return {
            url: NODE_ENV === 'development' ? 'http://localhost:3000/api/trpc' : `${window.origin}/api/trpc`
        };
    },
    ssr: true,
})(MyApp);
