import { LocationsType } from "@/types/locations";

export function buildLinesFromLocations(locations: LocationsType[]) {
  const pulls = [];

  for (let i = 0; i < locations.length - 1; i++) {
    const start = locations[i];
    const end = locations[i + 1];

    pulls.push({
      type: "pull",
      order: i + 1,
      from: start.label,
      to: end.label,
      status: true,
      startLat: start.latitude.toString(),
      startLng: start.longitude.toString(),
      endLat: end.latitude.toString(),
      endLng: end.longitude.toString(),
      arcAlt: 0.2 + 0.05 * i,
    });
  }

  return { type: "PullRequest", pulls };
}
