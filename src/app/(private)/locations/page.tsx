import WorldMap from "@/components/WorldMap";
import { mockedLocations } from "./mock";

export default function LocationsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Locations</h1>
      <WorldMap locations={mockedLocations} />
    </div>
  );
}
