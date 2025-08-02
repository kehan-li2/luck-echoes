// /app/api/users/dailyFortune/route.ts
import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyDsMf87ZAzDFUZHBnc1HQXmidOGDu8anhk",
});

function parseFortune(content: string) {
  const match = content.match(
    /Lucky Color:\s*([^L]+)Lucky Stone:\s*([^G]+)Guidance:\s*([^L]+)Love Score:\s*(\d+)Work Score:\s*(\d+)Study Score:\s*(\d+)/
  );

  if (!match) return null;

  const [, luckyColor, luckyStone, guidance, love, work, study] = match;
  const loveScore = parseInt(love);
  const workScore = parseInt(work);
  const studyScore = parseInt(study);

  let mood = "😊 Balanced";
  const low = [loveScore, workScore, studyScore].filter((s) => s < 50);
  const high = [loveScore, workScore, studyScore].filter((s) => s > 85);
  if (low.length >= 2) mood = "😔 Feeling down";
  else if (high.length >= 2) mood = "😄 Great vibes!";

  return {
    mood,
    message: `Your pet says: "${guidance.trim()}"`,
    luckyColor,
    scores: {
      love: loveScore,
      work: workScore,
      study: studyScore,
    },
  };
}


export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user || !user.bday) {
      return NextResponse.json(
        { message: "User not found or birthday missing" },
        { status: 400 }
      );
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
      const parsed = parseFortune(existing.content);
      return NextResponse.json({
        fortune: existing.content,
        ...parsed,
      });
    }

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Give a daily fortune for someone born on ${user.bday
        .toISOString()
        .split("T")[0]}. Include lucky color, lucky stone, a short word of guidance (under 50 words), and ratings (0-100) for Love, Work, and Study.`,
      config: {
        systemInstruction:
          "Format as: Lucky Color, Lucky Stone, Guidance, Love Score, Work Score, Study Score.",
      },
    });

    const content = result.text;
    const parsed = parseFortune(content);

    await prisma.fortune.create({
      data: {
        userId: user.id,
        content,
        date: new Date(),
      },
    });

    return NextResponse.json({
      fortune: content,
      ...parsed,
    });
  } catch (error) {
    console.error("Fortune generation error:", error);
    return NextResponse.json(
      { message: "Failed to generate fortune" },
      { status: 500 }
    );
  }
}
