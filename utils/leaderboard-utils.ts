import {PrismaClient} from "@prisma/client";

type LeaderboardQueryResult = {
    rank: number;
    firstName: string;
    lastName: string;
    points: number;
    total: number;
}

type LeaderboardPaginatedValues = {
    total: number;
    maxPoints: number;
    items: Array<{
        rank: number;
        firstName: string;
        lastName: string;
        points: number
    }>
}

export const getLeaderboardPaginated = async (prisma: PrismaClient, page: number = 1, limit: number = 20): Promise<LeaderboardPaginatedValues> => {
    const participants: Array<LeaderboardQueryResult> = await prisma.$queryRaw<Array<LeaderboardQueryResult>>`
                SELECT count(*) OVER() :: INTEGER AS total, 
                       row_number() OVER (ORDER BY "subquery"."sum" DESC NULLS LAST, "User"."eventsScanned" DESC, "User"."lastScannedQrTime" ASC NULLS LAST)::INTEGER as "rank",
                       "User"."firstName",
                       "User"."lastName",
                       (CASE WHEN "subquery"."sum" IS NULL THEN 0 ELSE "subquery"."sum" END) :: INTEGER as "points"
                FROM (
                         SELECT "participantId", SUM("pointsAssigned") as "sum"
                         FROM "EventParticipation"
                         WHERE "participantId" IS NOT NULL
                           AND "status" = 'SCAN_ACCEPTED'
                         GROUP BY "participantId"
                     ) as "subquery"
                         RIGHT JOIN "User" ON "User"."id" = "subquery"."participantId"
                WHERE "User"."roleCodename" = 'PARTICIPANT' OR "User"."roleCodename" = 'PARTICIPANT_MODERATOR'
                ORDER BY "subquery"."sum" DESC NULLS LAST, "User"."eventsScanned" DESC,
                         "User"."lastScannedQrTime" ASC NULLS LAST
                OFFSET ${(page - 1) * limit} LIMIT ${limit}`;
    const maxPoints = await prisma.event.aggregate({
        _sum: {
            maxPoints: true
        },
        where: {
            OR: [
                {isActive: true},
                {isOver: true}
            ]
        }
    });
    return {
        maxPoints: maxPoints._sum.maxPoints || 0,
        total: participants[0].total,
        items: participants
    }
}

type LeaderboardInfoQuery = {
    points: number;
    rank: number;
    email: string;
}

type LeaderboardInfo = {
    maxPoints: number;
    points: number;
    rank: number;
}


export const getLeaderboardInfoByEmail = async (prisma: PrismaClient, email: string): Promise<LeaderboardInfo> => {
    const participants: Array<LeaderboardInfoQuery> = await prisma.$queryRaw<Array<LeaderboardInfoQuery>>`
        SELECT "rank", "email", "points"
        FROM (SELECT row_number()
                     OVER (ORDER BY "subquery"."sum" DESC NULLS LAST, "User"."eventsScanned" DESC, "User"."lastScannedQrTime" ASC NULLS LAST) :: INTEGER as "rank",
                     "User"."email",
                     (CASE WHEN "subquery"."sum" IS NULL THEN 0 ELSE "subquery"."sum" END) :: INTEGER as "points"
              FROM (
                       SELECT "participantId", SUM("pointsAssigned") as "sum"
                       FROM "EventParticipation"
                       WHERE "participantId" IS NOT NULL
                         AND "status" = 'SCAN_ACCEPTED'
                       GROUP BY "participantId"
                   ) as "subquery"
                       RIGHT JOIN "User" ON "User"."id" = "subquery"."participantId"
              WHERE ("User"."roleCodename" = 'PARTICIPANT' OR
                     "User"."roleCodename" = 'PARTICIPANT_MODERATOR')) as "leaderboard"
        WHERE "email" = ${email}
        ;`;
    const maxPoints = await prisma.event.aggregate({
        _sum: {
            maxPoints: true
        },
        where: {
            OR: [
                {isActive: true},
                {isOver: true}
            ]
        }
    });
    if(!participants[0]) {
        throw new Error('Error while getting leaderboard info')
    }
    return {
        maxPoints: maxPoints._sum.maxPoints || 0,
        rank: participants[0].rank,
        points: participants[0].points
    }
}