import API from "@/lib/api";
import { Product } from "@/types/products";
import { mockedProducts } from "./mock";

export async function getAllProducts(limit = 10, offset = 0) {
  if (process.env.NODE_ENV === "test") return mockedProducts;

  const response = await API<Product[]>({
    url: `products?limit=${limit}&offset=${offset}`,
    method: "GET",
    next: { tags: ["products"] },
  });

  if (response.error || !response.data) return [];

  return response.data ?? [];
}
