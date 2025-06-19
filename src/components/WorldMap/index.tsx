"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Skeleton from "../ui/skeleton";
import { useLocationsStore } from "@/stores/useLocationsStore";

const GlobeScene = dynamic(() => import("@/scenes/Globe/globeScene"), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-[576px]" />,
});

interface WorldMapProps {
  heading?: string;
  body?: string;
  footer?: string;
}

export default function WorldMap({ heading, body, footer }: WorldMapProps) {
  const { locations } = useLocationsStore();

  if (!locations?.length) return null;

  return (
    <div className="grid gap-4 grid-cols-1 h-[600px]">
      <Card className="col-span-6 relative">
        <CardHeader>
          <CardTitle className="absolute top-0 pt-4 text-5xl font-orbitron font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-muted-foreground to-primary drop-shadow-sm">
            {heading}
          </CardTitle>
        </CardHeader>
        <CardContent className="pl-2 h-[600px]">
          <div className="absolute top-[150px] w-full right-0 z-10 px-10 pointer-events-none">
            <p className="text-lg font-medium max-w-2/3 text-right ml-auto leading-relaxed text-muted-foreground/80">
              {body}
            </p>
            <p className="text-2xl mt-6 ml-auto max-w-1/3 font-semibold font-orbitron text-right text-primary">
              {footer}
            </p>
          </div>
          <Suspense fallback={<Skeleton className="w-full h-[576px]" />}>
            <div className="w-full h-full md:max-w-[70%] z-[1]">
              <GlobeScene mapData={locations} />
            </div>
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
