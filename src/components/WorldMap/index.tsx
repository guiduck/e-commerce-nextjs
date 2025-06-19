"use client";

import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { LocationsType } from "@/types/locations";
import Skeleton from "../ui/skeleton";

const GlobeScene = dynamic(() => import("@/scenes/Globe/globeScene"), {
  loading: () => <Skeleton className="w-full h-[576px]" />,
  ssr: false,
});

export default function WorldMap({
  locations,
}: {
  locations: LocationsType[];
}) {
  if (!locations.length) {
    return null;
  }

  return (
    <div className="grid gap-4 grid-cols-1 h-[600px]">
      <Card className="col-span-6">
        <CardHeader>
          <CardTitle>Your Locations</CardTitle>
        </CardHeader>
        <CardContent className="pl-2 h-[600px]">
          <GlobeScene mapData={locations} />
        </CardContent>
      </Card>
    </div>
  );
}
