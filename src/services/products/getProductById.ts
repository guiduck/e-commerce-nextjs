import API from "@/lib/api";
import { createAPIError } from "@/lib/errors/createAPIError";
import { Product } from "@/types/products";
import { mockedProducts } from "./mock";

export async function getProductById(id: number) {
  if (process.env.NODE_ENV === "test") return { data: mockedProducts[0] };

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
