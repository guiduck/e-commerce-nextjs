import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const cookie = req.cookies.get("uploadedImages")?.value;
  const images = cookie ? JSON.parse(cookie) : [];

  return NextResponse.json({ images });
}
