import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs'
import {connect} from '@/dbConfig/dbConfig'
import Users from "@/models/userModel";
import { Label } from "@radix-ui/react-label";
import { use } from "react";

export const authOptions : NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "text"},
                password: { label: "password", type: "password" }
            },
            async authorize(credentials: any): Promise<any>{
                await connect();
                try {
                    const user = await Users.findOne({
                        $or: [
                            {email: credentials.identifier},
                            {userName: credentials.identifier}
                        ]
                    })
                    if(!user){
                        throw new Error('no user found with this email')
                    }
                    if(!user.isVerified){
                        throw new Error('please verify your account before login')
                    }
                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)
                    if(isPasswordCorrect){
                        return user
                    }else{
                        throw new Error('incorrect password')
                    }
                } catch (error) {
                    if (error instanceof Error) {
                        throw new Error(error.message);
                    } else {
                        throw new Error(String(error));
                    }
                }
            } 
        })
    ], 
    callbacks: {
        async jwt({token, user}){
            if(user){
                token._id = user._id?.toString();
                token.isVerified = user.isVerified;
                token.userName = user.userName
            }
            return token;
        },
        async session({session, token}){
            if(token){
                session.user._id = token._id
                session.user.isVerified = token.isVerified
                session.user.userName = token.userName
            }
            return session
        }

    },
    pages: {
        signIn: '/signin'
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
}