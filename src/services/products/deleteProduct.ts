"use server";

import API from "@/lib/api";
import { revalidateTag } from "next/cache";

export async function deleteProduct(id: number) {
  const result = await API({ url: `products/${id}`, method: "DELETE" });

  if (!result.error) {
    revalidateTag("products");
  }

  return result;
}
