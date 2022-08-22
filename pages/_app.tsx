import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import {ChakraProvider} from "@chakra-ui/provider";
import {extendTheme, Theme, theme} from "@chakra-ui/react";
import {withTRPC} from '@trpc/next';
import { SessionProvider } from 'next-auth/react';
import {AppRouter} from "./api/trpc/[trpc]";
import {appConfigs, ROLES} from "../configs";
import getConfig from "next/config";

export async function getInitialProps() {
    return {
        props: {},
    }
}

function MyApp({ Component, pageProps: {session, ...pageProps} }: AppProps) {
    return <SessionProvider session={session}>
         <ChakraProvider theme={extendTheme({} as Theme)}>
            <Component {...pageProps} />
        </ChakraProvider>
    </SessionProvider>
}

function getBaseUrl() {
    const {publicRuntimeConfig} = getConfig();
    return publicRuntimeConfig.TRPC_URL;
}



export default withTRPC<AppRouter>({
    config({ctx}) {
        return {
            url: getBaseUrl() + '/api/trpc'
        };
    },
    ssr: true,
})(MyApp);
