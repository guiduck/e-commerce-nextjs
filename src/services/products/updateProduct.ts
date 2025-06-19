"use server";

import API from "@/lib/api";
import { revalidateTag } from "next/cache";

interface UpdateProductPayload {
  id: number;
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
}

export async function updateProduct({ id, ...data }: UpdateProductPayload) {
  const result = await API({
    url: `products/${id}`,
    method: "PUT",
    data,
  });

  if (!result.error) {
    revalidateTag("products");
  }

  return result;
}
