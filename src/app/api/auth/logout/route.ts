import { cookies } from "next/headers";

export async function POST() {
  const cookie = await cookies();
  cookie.delete("access_token");
  return new Response("Logged out", { status: 200 });
}
