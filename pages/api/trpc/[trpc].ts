import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import {createContext} from "../../../server/context";
import {appRouter} from "../../../server/trpc-app";

export default trpcNext.createNextApiHandler({
    router: appRouter,
    createContext
});

export type AppRouter = typeof appRouter;

export type TRPCContext = trpc.inferAsyncReturnType<typeof createContext>;
