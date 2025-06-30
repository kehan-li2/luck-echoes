//get bday
import { getServerSession } from "next-auth";
// @ts-expect-error authOptions
import { authOptions } from "../../auth/[...nextauth]/route";
import prisma from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
	const session = await getServerSession(authOptions);

	if (!session?.user?.email) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}

	const user = await prisma.user.findUnique({
		where: { email: session.user.email },
		// @ts-expect-error bday
		select: { name: true, bday: true },
	});

	if (!user) {
		return NextResponse.json({ message: "User not found" }, { status: 404 });
	}

	return NextResponse.json(user);
}
