import API from "@/lib/api";
import { Category } from "@/types/categories";

export async function getAllCategories() {
  const result = await API<Category[]>({
    url: "categories",
    method: "GET",
    next: { tags: ["categories"] },
  });

  return result.data ?? [];
}
