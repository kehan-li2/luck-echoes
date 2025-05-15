import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import nodemailer from "nodemailer";
import crypto from "crypto";

export async function POST(req: Request) {
	const { email } = await req.json();

	try {
		const user = await prisma.user.findUnique({ where: { email } });
		if (!user) {
			return NextResponse.json({ message: "User not found" }, { status: 404 });
		}

		const resetToken = crypto.randomBytes(32).toString("hex");

		const expires = new Date(Date.now() + 1 * 60 * 1000); // 1 min expiry
		await prisma.user.update({
			where: { email },
			data: { resetToken, resetTokenExpiry: expires },
		});

		// Setup Nodemailer transporter
		const transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: Number(process.env.SMTP_PORT),
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASS,
			},
		});

		// Compose reset URL
		const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/password?token=${resetToken}`;

		// Send email
		await transporter.sendMail({
			from: '"Luck Echoes" <no-reply@yourapp.com>',
			to: email,
			subject: "Password Reset Request",
			html: `
        <p>You requested a password reset.</p>
        <p>Click the link below to reset your password:</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>This link will expire in 1 minute.</p>
      `,
		});

		return NextResponse.json({ message: "Reset link sent" });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: "Server error" }, { status: 500 });
	}
}
