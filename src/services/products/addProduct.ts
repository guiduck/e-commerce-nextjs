"use server";

import API from "@/lib/api";
import { createAPIError } from "@/lib/errors/createAPIError";
import { revalidateTag } from "next/cache";

interface ProductPayload {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
}

export async function addProduct(data: ProductPayload) {
  const result = await API({ url: "products", method: "POST", data });

  if (result.error) {
    return createAPIError(
      result.errorUserMessage || "Falha ao adicionar produto",
      result.status,
      result.debug
    );
  }

  revalidateTag("products");
  return result;
}
