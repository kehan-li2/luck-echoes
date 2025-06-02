import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "../../../lib/prisma";

export async function POST(req: Request) {
	const { email, password, name } = await req.json();

	try {
		// Check if user already exists
		const userExist = await prisma.user.findUnique({
			where: { email },
		});

		if (userExist) {
			return NextResponse.json(
				{ message: "User already exists" },
				{ status: 400 }
			);
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create new user
		const user = await prisma.user.create({
			data: {
				email,
				password: hashedPassword,
				name,
			},
		});

		return NextResponse.json(
			{ message: "User registered successfully", user },
			{ status: 201 }
		);
	} catch (err) {
		console.error("Registration error:", err);
		return NextResponse.json({ message: "Server error" }, { status: 500 });
	}
}
