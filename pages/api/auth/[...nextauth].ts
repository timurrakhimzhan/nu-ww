import NextAuth, {NextAuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import {GOOGLE_AUTH_CREDENTIALS, JWT_SECRET, ROLES} from "../../../configs";
import prisma from "../../../db/prisma";

export const authOptions: NextAuthOptions = {
    secret: JWT_SECRET,
    providers: [
        GoogleProvider({
            ...GOOGLE_AUTH_CREDENTIALS,
        }),
    ],
    callbacks: {
        async jwt({token}) {
            token.role = ROLES.PARTICIPANT;
            const userFromDb = await prisma.user.findFirst({
                where: {
                    email: token.email
                }
            });
            if (!userFromDb) {
                throw new Error("User is not presented in a database")
            }
            token.role = userFromDb.roleCodename;
            token.firstName = userFromDb.firstName;
            token.lastName = userFromDb.lastName;
            return token;
        },
        session({session, token}) {
            session.user.role = token.role;
            session.user.firstName = token.firstName;
            session.user.lastName = token.lastName;
            return session;
        },
        async signIn({user}) {
            const userFromDbCount = await prisma.user.count({
                where: {
                    email: user.email
                }
            })
            if (userFromDbCount) {
                await prisma.user.updateMany({
                    where: {
                        email: user.email
                    },
                    data: {
                        lastLoginTime: new Date()
                    }
                })
                return true;
            }
            return "/?mode=login&error=Could not find such user in a database of users";
        }
    }
}

export default NextAuth(authOptions)
