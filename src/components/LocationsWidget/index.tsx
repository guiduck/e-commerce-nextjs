"use client";

import { useLocationsStore } from "@/stores/useLocationsStore";
import WorldMap from "@/components/WorldMap";
import { LocationSearchForm } from "@/components/LocationSearchForm";
import { getLocations } from "@/services/locations/getLocations";
import { useTransition } from "react";
import { toast } from "sonner";
import Skeleton from "../ui/skeleton";
import LocationsTable from "../LocationsTable";
import LocationsTableSkeleton from "../LocationsTable/skeleton";

export default function LocationsWidget() {
  const [isPending, starttransition] = useTransition();
  const { locations, setLocations } = useLocationsStore();

  const handleSearchLocations = (origin: string) => {
    starttransition(async () => {
      const result = await getLocations({ origin });
      console.log("result:", result);

      if ("error" in result) {
        toast.error(result.errorUserMessage);
        return;
      }

      setLocations(result);
    });
  };

  const renderLocationUi = () => {
    if (isPending) {
      return (
        <>
          <LocationsTableSkeleton />
          <Skeleton className="h-[600px] w-full" />
        </>
      );
    }

    if (!locations || !locations.length) {
      return (
        <p className="text-muted-foreground">Sem localizações carregadas.</p>
      );
    }

    return (
      <>
        <LocationsTable locations={locations} />
        <WorldMap />
      </>
    );
  };

  return (
    <div className="space-y-6">
      <LocationSearchForm handleSearchLocations={handleSearchLocations} />
      {renderLocationUi()}
    </div>
  );
}
