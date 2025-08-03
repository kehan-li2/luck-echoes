// /app/api/pet/message/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const fortune = await prisma.fortune.findFirst({
    where: {
      userId: user.id,
      date: {
        gte: today,
        lt: new Date(today.getTime() + 86400000),
      },
    },
  });

  if (!fortune || !fortune.content) {
    return NextResponse.json({ message: "No fortune today" }, { status: 404 });
  }

  // Parse the content string
  const content = fortune.content;

const match = content.match(
  /\*\*Lucky Color:\*\*\s*(.*?)\s*\n\*\*Lucky Stone:\*\*\s*(.*?)\s*\n\*\*Guidance:\*\*\s*([\s\S]*?)\s*\n\*\*Love Score:\*\*\s*(\d+)\s*\n\*\*Work Score:\*\*\s*(\d+)\s*\n\*\*Study Score:\*\*\s*(\d+)/
);


  if (!match) {
    return NextResponse.json({ message: "Invalid fortune format" }, { status: 400 });
  }

  const [, luckyColor, luckyStone, guidance, love, work, study] = match;
  const loveScore = parseInt(love);
  const workScore = parseInt(work);
  const studyScore = parseInt(study);

  // Mood logic based on scores
  let mood = "😊 Balanced";
  const lowScores = [loveScore, workScore, studyScore].filter(s => s < 50);
  const highScores = [loveScore, workScore, studyScore].filter(s => s > 85);

  if (lowScores.length >= 2) {
    mood = "😔 Feeling down";
  } else if (highScores.length >= 2) {
    mood = "😄 Great vibes!";
  }

  // Pet message based on fortune
  const message = `Your pet says: "${guidance}"`;

  return NextResponse.json({
    mood,
    message,
    luckyColor,
    scores: { loveScore, workScore, studyScore }
  });
}
