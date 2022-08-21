import * as trpc from "@trpc/server";
import {TRPCAuthenticatedContext} from "./context";
import {ROLES} from "../configs";
import {z} from "zod";
import {EventParticipationStatus, EventType} from "@prisma/client";
import {getLeaderboardInfoByEmail} from "../utils/leaderboard-utils";

const participantRouter = trpc
    .router<TRPCAuthenticatedContext>()
    .middleware(async ({ctx, next}) => {
        const participantFromDb = await ctx.prisma.user.findFirst({
            where: {
                email: ctx.session.user.email,
                roleCodename: {
                    in: [ROLES.PARTICIPANT, ROLES.PARTICIPANT_MODERATOR, ROLES.TESTER]
                }
            }
        });
        if (!participantFromDb) {
            throw new trpc.TRPCError({
                code: 'FORBIDDEN',
                message: 'Not enough privilege to use the endpoint'
            })
        }
        return next();
    })
    .mutation('scan-token', {
        input: z.object({
            hash: z.string(),
        }),
        async resolve({input, ctx}) {
            const eventParticipation = await ctx.prisma.eventParticipation.findFirst({
                where: {
                    hash: input.hash,
                    status: EventParticipationStatus.PENDING
                },
                include: {
                    Event: true
                }
            });
            if (!eventParticipation) {
                throw new trpc.TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'Invalid QR-code or it was already scanned'
                })
            }
            if (eventParticipation.moderatorId === ctx.session.userId) {
                throw new trpc.TRPCError({
                    code: 'FORBIDDEN',
                    message: 'You can not scan QR created by yourself'
                })
            }
            ``
            const event = eventParticipation.Event;

            if (event.type === EventType.ONCE_SCAN) {
                const participationCount = await ctx.prisma.eventParticipation.count({
                    where: {
                        participantId: ctx.session.userId,
                        eventId: event.id,
                        status: EventParticipationStatus.SCAN_ACCEPTED
                    }
                });
                if (participationCount > 0) {
                    throw new trpc.TRPCError({
                        code: 'FORBIDDEN',
                        message: 'You already earned maximum tokens for this event'
                    })
                }
            }
            if (event.type === EventType.MULTIPLE_SCAN) {
                const participationCount = await ctx.prisma.eventParticipation.findMany({
                    where: {
                        participantId: ctx.session.userId,
                        eventId: event.id,
                        status: EventParticipationStatus.SCAN_ACCEPTED
                    }
                });
                const totalPoints = participationCount.reduce((accum, item) => accum + item.pointsAssigned, 0);
                if (totalPoints + eventParticipation.pointsAssigned > event.maxPoints) {
                    throw new trpc.TRPCError({
                        code: 'FORBIDDEN',
                        message: 'You already earned maximum tokens for this event'
                    })
                }
            }
            await ctx.prisma.eventParticipation.updateMany({
                where: {
                    hash: input.hash,
                },
                data: {
                    participantId: ctx.session.userId,
                    status: EventParticipationStatus.SCANNED
                }
            });
        }
    })
    .query('get-token-participant-info', {
        input: z.object({
            hash: z.string()
        }),
        output: z.object({
            status: z.nativeEnum(EventParticipationStatus),
            pointsAssigned: z.number()
        }),
        async resolve({input, ctx}) {
            const participationItem = await ctx.prisma.eventParticipation.findFirst({
                where: {
                    participantId: ctx.session.userId,
                    hash: input.hash,
                },
                select: {
                    pointsAssigned: true,
                    status: true
                }
            });
            if (!participationItem) {
                throw new trpc.TRPCError({
                    message: 'Could not find participation with provided hash',
                    code: 'FORBIDDEN'
                });
            }
            return {
                status: participationItem.status,
                pointsAssigned: participationItem.pointsAssigned
            }
        }
    })
    .query('leaderboard-info', {
        output: z.object({
            points: z.number(),
            maxPoints: z.number(),
            rank: z.number()
        }),
        async resolve({ctx}) {
            return getLeaderboardInfoByEmail(ctx.prisma, ctx.session.user.email || '');
        }
    })

export default participantRouter;