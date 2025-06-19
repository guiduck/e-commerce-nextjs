import API from "@/lib/api";

export async function loginUser(payload: { email: string; password: string }) {
  const result = await API<{ access_token: string; refresh_token: string }>({
    url: "auth/login",
    method: "POST",
    data: payload,
  });

  return result;
}
