"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LocationSearchFormProps {
  handleSearchLocations: (origin: string) => void;
}

export function LocationSearchForm({
  handleSearchLocations,
}: LocationSearchFormProps) {
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [manualOrigin, setManualOrigin] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (useCurrentLocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          handleSearchLocations(`${latitude},${longitude}`);
        },
        () => {
          alert("Erro ao obter a localização atual.");
        }
      );
      return;
    }

    handleSearchLocations(manualOrigin);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="locationMode"
            className="form-radio accent-black dark:accent-yellow-50"
            checked={!useCurrentLocation}
            onChange={() => setUseCurrentLocation(false)}
          />
          <span>Inserir localização</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="locationMode"
            checked={useCurrentLocation}
            className="form-radio accent-black dark:accent-yellow-50"
            onChange={() => setUseCurrentLocation(true)}
          />
          <span>Localização atual</span>
        </label>
      </div>

      <div>
        <Label className="mb-4">Insira uma localização</Label>
        <Input
          placeholder="Latitude,Longitude e.g. 40.7128,-74.0060"
          value={manualOrigin}
          onChange={(e) => setManualOrigin(e.target.value)}
        />
      </div>

      <Button type="submit">Buscar Localizações</Button>
    </form>
  );
}
