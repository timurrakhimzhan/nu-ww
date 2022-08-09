CREATE TABLE IF NOT EXISTS "Event"(
    "id" SERIAL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
    "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL,
    "isActive" BOOLEAN DEFAULT FALSE NOT NULL,
    "pointsPerParticipation" INTEGER NOT NULL,
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
    "userId" TEXT UNIQUE NOT NULL,
    "hash" text NOT NULL,
    "status" "EventParticipationStatus" NOT NULL,
    "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
    "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL,

    PRIMARY KEY ("id"),
    CONSTRAINT FK_EVENT_PARTICIPATION__EVENT FOREIGN KEY ( "eventId" ) REFERENCES "Event"("id"),
    CONSTRAINT FK_EVENT_PARTICIPATION__USER FOREIGN KEY ( "userId" ) REFERENCES "User"("id")
);
CREATE TRIGGER set_timestamp
    BEFORE UPDATE ON "EventParticipation"
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_timestamp();