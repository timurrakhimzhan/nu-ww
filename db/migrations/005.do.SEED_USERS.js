import fs from 'fs/promises';
import path from "path";

export const generateSql = async () => {
    const filePath = path.resolve(
        process.cwd(),
        'db',
        'migrations',
        'NU-students.json'
    );
    const file = await fs.readFile(filePath);
    const users = JSON.parse(file.toString());
    const set = new Set()
    const queries = users.filter((user) => {
        if(set.has(user.universityId)) {
            return false;
        }
        set.add(user.universityId);
        return true;
    }).map((user) => `INSERT INTO "User" ("id", "email", "firstName", "lastName", "roleCodename")
 VALUES ('${user.universityId}', ${user.email.length > 0 ? `'${user.email}'` : 'NULL'}, '${user.firstName.replace("'", "")}', '${user.lastName.replace("'", "")}', 'PARTICIPANT');`);

    return queries.join('\n');
}