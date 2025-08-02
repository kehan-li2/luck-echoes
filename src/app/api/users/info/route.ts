//get bday
/*
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
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
*/
// app/api/profile/route.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET: Retrieve user profile
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      name: true,
      bday: true,
      avatar: true,
    },
  });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
  console.log("Fetched user:", user);
  return NextResponse.json(user);
}

// PUT: Update profile
export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { name, bday, avatar } = body;

  const updatedUser = await prisma.user.update({
    where: { email: session.user.email },
    data: {
      name,
      bday: bday ? new Date(bday) : undefined,
      avatar,
    },
  });
  

  return NextResponse.json(updatedUser);
}
