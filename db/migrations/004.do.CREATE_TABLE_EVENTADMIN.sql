CREATE TABLE IF NOT EXISTS "EventModerator"(
    "id" SERIAL,
    "moderatorId" TEXT NOT NULL,
    "eventId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
    "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL,

    PRIMARY KEY ("id"),

    CONSTRAINT FK_EVENTADMIN_USER FOREIGN KEY ( "moderatorId" ) REFERENCES "User"("id"),
    CONSTRAINT FK_EVENTADMIN_EVENT FOREIGN KEY ("eventId") REFERENCES "Event" ("id")
);
CREATE TRIGGER set_timestamp
    BEFORE UPDATE ON "EventModerator"
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_timestamp();