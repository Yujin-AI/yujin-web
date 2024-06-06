import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { api } from "../api";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                try {
                    const res = await api("/auth/login", {
                        method: "post",
                        body: JSON.stringify(credentials),
                    });
                    if (!res.ok) return null;
                    const response = await res.json();
                    if (!response.success) return null;
                    return response.data;
                } catch (error) {
                    console.error(error);
                    return null;
                }
            },
        }),
    ],
    pages: {
        signIn: "/login",
    },
    secret: process.env.API_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    callbacks: {
        async session({ session, token }) {
            return { ...session, user: token };
        },
        async jwt({ token, user }) {
            return { ...token, ...user };
        },
    },
};
