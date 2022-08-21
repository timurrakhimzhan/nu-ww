import * as trpcNext from "@trpc/server/adapters/next";
import {NodeHTTPCreateContextFnOptions} from "@trpc/server/src/adapters/node-http/types";
import {IncomingMessage} from "http";
import ws from "ws";
import {getSession} from "next-auth/react";
import prisma from "../db/prisma";
import {Session, unstable_getServerSession} from "next-auth";
import {TRPCContext} from "../pages/api/trpc/[trpc]";
import {authOptions} from "../pages/api/auth/[...nextauth]";

export async function createContext(ctx: trpcNext.CreateNextContextOptions) {
    const {req, res} = ctx;
    const session = await unstable_getServerSession(req, res, authOptions);

    return {
        req,
        res,
        prisma,
        session
    };
}

export type TRPCAuthenticatedContext = TRPCContext & { session: Session & {
    userId: string
}  }
