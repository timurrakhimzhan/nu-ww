import * as trpc from "@trpc/server";
import {TRPCAuthenticatedContext} from "./context";
import {ROLES} from "../configs";
import {z} from "zod";
import {randomUUID} from "crypto";
import {scannedUserSchema} from "../types/schemas";
import {EventParticipationStatus} from "@prisma/client";

const moderatorRouter = trpc
    .router<TRPCAuthenticatedContext>()
    .middleware(async ({ctx, next}) => {
        const moderatorFromDb = await ctx.prisma.user.findFirst({
            where: {
                email: ctx.session.user.email,
                roleCodename: {
                    in: [ROLES.MODERATOR, ROLES.PARTICIPANT_MODERATOR, ROLES.TESTER]
                }
            }
        });
        if (!moderatorFromDb) {
            throw new trpc.TRPCError({
                code: 'FORBIDDEN',
                message: 'Not enough privilege to use the endpoint'
            })
        }
        return next();
    })
    .mutation('generate-token', {
        input: z.object({
            eventId: z.number().int(),
            points: z.number().int(),
        }),
        output: z.object({
            hash: z.string(),
            status: z.nativeEnum(EventParticipationStatus),
            pointsAssigned: z.number().int()
        }),
        async resolve({input, ctx}) {
            await ctx.prisma.eventParticipation.updateMany({
                where: {
                    moderatorId: ctx.session.userId,
                    eventId: input.eventId,
                    status: EventParticipationStatus.PENDING
                },
                data: {
                    status: EventParticipationStatus.CANCELLED
                }
            })
            const {hash, status, pointsAssigned} = await ctx.prisma.eventParticipation.create({
                data: {
                    moderatorId: ctx.session.userId,
                    status: EventParticipationStatus.PENDING,
                    pointsAssigned: input.points,
                    eventId: input.eventId,
                    hash: randomUUID()
                },
                select: {
                    hash: true,
                    status: true,
                    pointsAssigned: true
                }
            })
            return {
                hash,
                status,
                pointsAssigned
            }
        }
    })
    .mutation('cancel-token', {
        input: z.object({
            hash: z.string()
        }),
        async resolve({input, ctx}) {
            await ctx.prisma.eventParticipation.updateMany({
                where: {
                    hash: input.hash,
                    moderatorId: ctx.session.userId,
                    status: {
                        not: EventParticipationStatus.SCAN_ACCEPTED
                    }
                },
                data: {
                    status: EventParticipationStatus.CANCELLED
                }
            });
        }
    })
    .mutation('accept-token', {
        input: z.object({
            hash: z.string()
        }),
        async resolve({input, ctx}) {
            const eventParticipation = await ctx.prisma.eventParticipation.findFirst({
                where: {
                    hash: input.hash,
                    moderatorId: ctx.session.userId,
                    status: EventParticipationStatus.SCANNED,
                    participantId: {
                        not: null
                    },
                },
                include: {
                    Participant: true
                }
            });
            if (!eventParticipation || !eventParticipation.participantId || !eventParticipation.Participant) {
                throw new trpc.TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'Something went wrong on server: could not accept the token'
                });
            }
            const oldParticipationCount = await ctx.prisma.eventParticipation.count({
                where: {
                    participantId: eventParticipation.participantId,
                    eventId: eventParticipation.eventId,
                    status: EventParticipationStatus.SCAN_ACCEPTED
                }
            });
            await ctx.prisma.$transaction([
                ctx.prisma.user.update({
                    where: {
                        id: eventParticipation.participantId
                    },
                    data: {
                        lastScannedQrTime: new Date(),
                        eventsScanned: oldParticipationCount === 0 ? eventParticipation.Participant.eventsScanned + 1 : eventParticipation.Participant.eventsScanned
                    }
                }),
                ctx.prisma.eventParticipation.updateMany({
                    where: {
                        id: eventParticipation.id
                    },
                    data: {
                        status: EventParticipationStatus.SCAN_ACCEPTED
                    }
                })
            ])
        }
    })
    .query('get-token-moderator-info', {
        input: z.object({
            hash: z.string()
        }),
        output: z.object({
            status: z.nativeEnum(EventParticipationStatus),
            scannedUser: scannedUserSchema
        }),
        async resolve({input, ctx}) {
            const participationItem = await ctx.prisma.eventParticipation.findFirst({
                where: {
                    hash: input.hash,
                    moderatorId: ctx.session.userId
                },
                include: {
                    Participant: true
                }
            });
            if (!participationItem) {
                throw new trpc.TRPCError({
                    code: 'FORBIDDEN',
                    message: 'Cannot access this participation item'
                })
            }
            const {Participant} = participationItem;
            return {
                status: participationItem.status,
                scannedUser: Participant ? {
                    id: Participant.id,
                    lastName: Participant.lastName,
                    firstName: Participant.firstName,
                    email: Participant.email
                } : undefined
            }
        }
    })

export default moderatorRouter;