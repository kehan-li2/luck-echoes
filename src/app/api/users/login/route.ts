// app/api/users/login/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../../../lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req: Request) {
	const { email, password } = await req.json();

	try {
		const user = await prisma.user.findUnique({ where: { email } });

		if (!user) {
			return NextResponse.json({ message: "User not found" }, { status: 404 });
		}
		let isValidPassword = await bcrypt.compare(password, user.password);
		if (!isValidPassword)
			return NextResponse.json(
				{ message: "Invalid credentials" },
				{ status: 401 }
			);

		const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
			expiresIn: "7d", // set each login session valid 7 days
		});
		return NextResponse.json({ token });
	} catch (err) {
		console.error("Error:", err);
		return NextResponse.json({ message: "Server error" }, { status: 500 });
	}
}
