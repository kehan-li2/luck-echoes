import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "../../../../lib/prisma";

export async function POST(req: Request) {
	try {
		const { email, password, name, bday } = await req.json();

		// Basic validation
		if (
			!email ||
			!password ||
			!name ||
			!bday ||
			typeof email !== "string" ||
			typeof password !== "string" ||
			typeof name !== "string" ||
			typeof bday !== "string"
		) {
			return NextResponse.json({ message: "Invalid input" }, { status: 400 });
		}

		// Check if user exists
		const existingUser = await prisma.user.findUnique({ where: { email } });
		if (existingUser) {
			return NextResponse.json(
				{ message: "User already exists" },
				{ status: 400 }
			);
		}

		// Hash password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create user
		const user = await prisma.user.create({
			data: {
				email,
				password: hashedPassword,
				name,
				// @ts-expect-error bday
				bday: new Date(bday),
			},
		});

		// Return safe user data (omit password)
		const safeUser = {
			id: user.id,
			email: user.email,
			name: user.name,
			// @ts-expect-error bday
			bday: user.bday,
		};

		return NextResponse.json(
			{ message: "User registered successfully", user: safeUser },
			{ status: 201 }
		);
	} catch (error) {
		console.error("Registration error:", error);
		return NextResponse.json({ message: "Server error" }, { status: 500 });
	}
}
