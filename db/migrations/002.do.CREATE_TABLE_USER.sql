CREATE TABLE IF NOT EXISTS "Role"(
     "codename" TEXT UNIQUE NOT NULL,
     "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
    "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL,
    PRIMARY KEY ("codename")
);

CREATE TRIGGER set_timestamp
    BEFORE UPDATE ON "Role"
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TABLE IF NOT EXISTS "User"(
    "id" text NOT NULL,
    "email" text DEFAULT NULL,
    "firstName" text NOT NULL,
    "lastName" text NOT NULL,
    "roleCodename" TEXT NOT NULL,
    "lastLoginTime" TIMESTAMP DEFAULT NULL,
    "lastScannedQrTime" TIMESTAMP DEFAULT NULL,
    "eventsScanned" INT DEFAULT 0 NOT NULL,
    "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
    "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL,

    PRIMARY KEY ("id"),
    CONSTRAINT FK_USER_ROLE FOREIGN KEY ( "roleCodename" ) REFERENCES "Role"("codename")
);
CREATE TRIGGER set_timestamp
    BEFORE UPDATE ON "User"
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_timestamp();