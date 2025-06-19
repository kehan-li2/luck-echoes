// /app/api/fortune/route.ts
import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import prisma from "../../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

const ai = new GoogleGenAI({ apiKey: "apikey" });

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user || !user.bday) {
      return NextResponse.json({ message: "User not found or birthday missing" }, { status: 400 });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existing = await prisma.fortune.findFirst({
      where: {
        userId: user.id,
        date: {
          gte: today,
          lt: new Date(today.getTime() + 86400000), 
        },
      },
    });

    if (existing) {
      return NextResponse.json({ fortune: existing.content });
    }

    // If not, generate new one
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Give a daily fortune for someone born on ${user.bday.toISOString().split("T")[0]}. Include lucky color, lucky stone, a short word of guidance (under 50 words), and ratings (0-100) for Love, Work, and Study.`,
      config: {
        systemInstruction: "Format as: Lucky Color, Lucky Stone, Guidance, Love Score, Work Score, Study Score.",
      },
    });

    const content = result.text;

    // Save it
    await prisma.fortune.create({
      data: {
        userId: user.id,
        content,
        date: new Date(),
      },
    });

    return NextResponse.json({ fortune: content });
  } catch (error) {
    console.error("Fortune generation error:", error);
    return NextResponse.json(
      { message: "Failed to generate fortune" },
      { status: 500 }
    );
  }
}