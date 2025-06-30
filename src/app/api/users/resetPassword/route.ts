// app/api/users/resetPassword/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "../../../../lib/prisma";

export async function POST(req: Request) {
	const { token, password } = await req.json();

	try {
		const user = await prisma.user.findFirst({ where: { resetToken: token } });

		if (!user) {
			return NextResponse.json(
				{ message: "Invalid or expired token" },
				{ status: 400 }
			);
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		await prisma.user.update({
			where: { email: user.email },
			data: {
				password: hashedPassword,
				resetToken: null, // clear all the token after successful reset
			},
		});

		return NextResponse.json(
			{ message: "Password reset successful" },
			{ status: 200 }
		);
	} catch (err) {
		console.error("Registration error:", err);
		return NextResponse.json({ message: "Server error" }, { status: 500 });
	}
}
