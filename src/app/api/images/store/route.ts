import { NextRequest, NextResponse } from "next/server";

const MAX_IMAGES_ALLOWED = 10;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const newImage: string = body.url;

  const cookie = req.cookies.get("uploadedImages")?.value;
  const currentImages = cookie ? JSON.parse(cookie) : [];

  const updatedImages = [...currentImages, newImage].slice(-MAX_IMAGES_ALLOWED);

  const response = NextResponse.json({ success: true, images: updatedImages });
  response.cookies.set("uploadedImages", JSON.stringify(updatedImages), {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 1 dia
  });

  return response;
}
