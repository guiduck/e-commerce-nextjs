import { NextResponse } from "next/server";

export async function GET(req: Request) {
  return NextResponse.redirect(new URL("/produtos", req.url));
}
