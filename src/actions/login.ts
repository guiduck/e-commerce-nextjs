"use server";

import { cookies } from "next/headers";
import { loginUser } from "@/services/auth/login";
import { APIResponse } from "@/lib/api";

export async function loginAndSetSession(
  email: string,
  password: string
): Promise<APIResponse<{ access_token: string; refresh_token: string }>> {
  const loginRes = await loginUser({ email, password });

  if (loginRes.error || !loginRes.data?.access_token) return loginRes;

  const cookie = await cookies();

  cookie.set("access_token", loginRes.data.access_token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return {
    ...loginRes,
    error: false,
    errorUserMessage: "",
  };
}
