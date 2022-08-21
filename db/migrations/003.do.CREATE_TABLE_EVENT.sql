CREATE TYPE "EventType" AS ENUM (
    'ONCE_SCAN',
    'MULTIPLE_SCAN'
);


CREATE TABLE IF NOT EXISTS "Event"(
    "id" SERIAL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
    "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL,
    "isActive" BOOLEAN DEFAULT FALSE NOT NULL,
    "isOver" BOOLEAN DEFAULT FALSE NOT NULL,
    "minPoints" INTEGER DEFAULT 1 NOT NULL,
    "maxPoints" INTEGER DEFAULT 1 NOT NULL,
    "type" "EventType" DEFAULT 'ONCE_SCAN' NOT NULL,
    PRIMARY KEY ("id")
);

CREATE TRIGGER set_timestamp
    BEFORE UPDATE ON "Event"
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TYPE "EventParticipationStatus" AS ENUM (
	'PENDING',
	'CANCELLED',
    'SCANNED',
    'SCAN_ACCEPTED'
);


CREATE TABLE IF NOT EXISTS "EventParticipation"(
    "id" SERIAL,
    "eventId" INTEGER NOT NULL,
    "participantId" TEXT,
    "moderatorId" TEXT NOT NULL,
    "pointsAssigned" INTEGER NOT NULL,
    "hash" TEXT UNIQUE NOT NULL,
    "status" "EventParticipationStatus" NOT NULL,
    "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
    "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL,

    PRIMARY KEY ("id"),
    CONSTRAINT FK_EVENT_PARTICIPATION__EVENT FOREIGN KEY ( "eventId" ) REFERENCES "Event"("id"),
    CONSTRAINT FK_EVENT_PARTICIPATION__PARTICIPANT FOREIGN KEY ( "participantId" ) REFERENCES "User"("id"),
    CONSTRAINT FK_EVENT_PARTICIPATION__MODERATOR FOREIGN KEY ("moderatorId") REFERENCES "User" ("id")
);
CREATE TRIGGER set_timestamp
    BEFORE UPDATE ON "EventParticipation"
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_timestamp();