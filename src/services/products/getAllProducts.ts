import API from "@/lib/api";
import { Product } from "@/types/products";

export async function getAllProducts(limit = 10, offset = 0) {
  const response = await API<Product[]>({
    url: `products?limit=${limit}&offset=${offset}`,
    method: "GET",
    next: { tags: ["products"] },
  });

  if (response.error || !response.data) return [];

  return response.data ?? [];
}
