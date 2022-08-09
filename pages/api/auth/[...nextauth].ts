import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import {JWT_SECRET} from "../../../configs";

export default NextAuth({
    secret: JWT_SECRET,
    providers: [
        // OAuth authentication providers
        // GoogleProvider({
        //     clientId: process.env.GOOGLE_ID,
        //     clientSecret: process.env.GOOGLE_SECRET,
        // })
    ],
})
