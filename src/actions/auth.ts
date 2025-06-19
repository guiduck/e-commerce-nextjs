"use server";

import { loginUser } from "@/services/auth/login";
import { registerUser } from "@/services/auth/register";
import { cookies } from "next/headers";

export async function registerAndLogin(data: {
  name: string;
  email: string;
  password: string;
  avatar: string;
  role: "admin" | "customer";
}) {
  await registerUser(data);

  const loginRes = await loginUser({
    email: data.email,
    password: data.password,
  });

  if (loginRes.error || !loginRes.data?.access_token) return loginRes;

  const cookie = await cookies();
  cookie.set("access_token", loginRes.data.access_token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return { error: false, data: null };
}
