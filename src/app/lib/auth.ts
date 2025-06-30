import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "./prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "";

export const generateToken = (user: { id: string; email: string }) => {
	return jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
		expiresIn: "7d",
	});
};

export const verifyToken = (token: string) => {
	return jwt.verify(token, JWT_SECRET);
};

// Auth configuration
export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	session: {
		strategy: "jwt",
	},
	providers: [
		CredentialsProvider({
			name: "credentials",
			credentials: {
				email: { label: "Email", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) return null;

				const user = await prisma.user.findUnique({
					where: { email: credentials.email },
				});

				if (!user) return null;

				const isValid = await bcrypt.compare(
					credentials.password,
					user.password
				);
				if (!isValid) return null;

				return {
					id: user.id,
					email: user.email,
					name: user.name ?? "",
				};
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				token.name = user.name;
				token.email = user.email;
			}
			return token;
		},
		async session({ session, token }) {
			if (token) {
				session.user = {
					// @ts-expect-error idc
					id: token.id as string,
					name: token.name as string,
					email: token.email as string,
				};
			}
			return session;
		},
	},
	pages: {
		signIn: "/login",
	},
	secret: process.env.NEXTAUTH_SECRET,
};
