import API from "@/lib/api";
import { createAPIError } from "@/lib/errors/createAPIError";
import { Product } from "@/types/products";

export async function getProductById(id: number) {
  const res = await API<Product>({ url: `products/${id}`, method: "GET" });

  if (res.error || !res.data) {
    return createAPIError<Product>(
      res.errorUserMessage || "Produto não encontrado",
      res.status,
      res.debug
    );
  }

  return res;
}
