import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import {ChakraProvider} from "@chakra-ui/provider";
import {extendTheme, Theme, theme} from "@chakra-ui/react";
import {withTRPC} from '@trpc/next';
import { SessionProvider } from 'next-auth/react';
import {AppRouter} from "./api/trpc/[trpc]";

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
            url: `http://localhost:3000/api/trpc`,
        };
    },
    ssr: true,
})(MyApp);
