import * as trpc from "@trpc/server";
import {z} from "zod";
import {TRPCContext} from "../pages/api/trpc/[trpc]";
import {TRPCAuthenticatedContext} from "./context";
import {getLeaderboardPaginated} from "../utils/leaderboard-utils";
import participantRouter from "./participant-router";
import moderatorRouter from "./moderator-router";

type LeaderboardQueryResult = {
    rank: number;
    firstName: string;
    lastName: string;
    points: number;
    total: number;
}

export const appRouter = trpc
    .router<TRPCContext>()
    .query('leaderboard', {
        input: z.object({
            limit: z.number().default(20),
            cursor: z.number().nullable().default(1),
        }),
        output: z.object({
            cursor: z.number().default(1),
            total: z.number(),
            maxPoints: z.number(),
            limit: z.number(),
            items: z.array(z.object({
                rank: z.number(),
                firstName: z.string(),
                lastName: z.string(),
                points: z.number(),
            }))
        }),
        async resolve({input, ctx}) {
            const page = input.cursor || 1;
            const limit = input.limit;
            const {total, items, maxPoints} = await getLeaderboardPaginated(ctx.prisma, page, limit)
            return {
                maxPoints,
                items,
                total,
                cursor: page,
                limit
            }
        }
    })
    .middleware<TRPCAuthenticatedContext>(async ({ctx, next}) => {
        if (!ctx.session) {
            throw new trpc.TRPCError({
                code: 'UNAUTHORIZED',
                message: 'This request must be authorized.',
            });
        }
        const userFromDb = await ctx.prisma.user.findFirst({
            where: {
                email: ctx.session.user.email,
            }
        });
        if (!userFromDb) {
            throw new trpc.TRPCError({
                code: 'FORBIDDEN',
                message: 'No such user registered',
            });
        }
        return next({
            ctx: {
                ...ctx,
                session: {
                    userId: userFromDb.id,
                    ...ctx.session
                },
            }
        });
    })
    .merge('participant.', participantRouter)
    .merge('moderator.', moderatorRouter)
