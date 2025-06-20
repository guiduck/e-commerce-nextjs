import API from "@/lib/api";
import { createAPIError } from "@/lib/errors/createAPIError";

interface LocationAPIData {
  latitude: number;
  longitude: number;
  name: string;
  description: string;
}

export async function getLocations({
  origin,
  radius = 16000,
  size = 10,
}: {
  origin: string;
  radius?: number;
  size?: number;
}) {
  if (!origin) return [];

  const response = await API<LocationAPIData[]>({
    url: `locations?origin=${origin}&radius=${radius}&size=${size}`,
    method: "GET",
  });

  if (response.error || !response.data)
    return createAPIError("Failed to fetch locations.");

  return response.data.map((item) => ({
    latitude: item.latitude,
    longitude: item.longitude,
    label: item.name,
    activity: item.description,
  }));
}
