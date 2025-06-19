import API from "@/lib/api";

export async function uploadImage(file: File): Promise<string | null> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await API<{ location: string }>({
    url: "files/upload",
    method: "POST",
    data: formData,
  });

  if (response.error || !response.data?.location) return null;

  const url = response.data.location;

  await fetch("/api/images/store", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });

  return url;
}
