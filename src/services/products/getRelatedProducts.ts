import API from "@/lib/api";

export async function getRelatedProducts(id: number) {
  const response = await API({
    url: `products/${id}/related`,
    method: "GET",
    next: { tags: ["related"], revalidate: 60 * 15 },
  });

  return response.data ?? [];
}
