import Postgrator from 'postgrator';
import pg from 'pg';
import path from 'path';
import 'dotenv/config';
import * as fs from "fs";

const DATABASE_CONFIG = {
    HOST: process.env['DB_HOST'],
    PORT: Number(process.env['DB_PORT']) || 5432,
    NAME: process.env['DB_NAME'],
    USER: process.env['DB_USER'],
    PASSWORD: process.env['DB_PASSWORD'],
};

const migrationPattern = path.resolve(
    process.cwd(),
    'db',
    'migrations/*',
);


const client = new pg.Client({
    host: DATABASE_CONFIG.HOST,
    port: DATABASE_CONFIG.PORT,
    user: DATABASE_CONFIG.USER,
    database: DATABASE_CONFIG.NAME,
    password: DATABASE_CONFIG.PASSWORD,
    ssl: {
        ca: fs.readFileSync(path.resolve(process.cwd(), 'certs', 'ca-certificate.pem'))
    }
});


const postgrator = new Postgrator({
    migrationPattern,
    driver: 'pg',
    database: DATABASE_CONFIG.NAME,
    schemaTable: 'SchemaVersion',
    execQuery: (query: string) => client.query(query),
});

async function migrate() {
    await client.connect();
    console.log('migrations started');
    try {
        await postgrator.migrate();
        console.log('migrations applied');
    } catch (error) {
        console.error(error);
    } finally {
        await client.end();
    }
}

migrate();
