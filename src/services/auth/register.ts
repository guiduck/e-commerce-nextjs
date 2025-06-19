import API from "@/lib/api";

export async function registerUser(payload: {
  name: string;
  email: string;
  password: string;
  avatar: string;
  role: "admin" | "customer";
}) {
  return await API({ url: "users", method: "POST", data: payload });
}
