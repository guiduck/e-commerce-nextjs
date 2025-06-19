/* eslint-disable @typescript-eslint/no-explicit-any*/

"use client";

import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import dynamic from "next/dynamic";
import { LocationsType } from "@/types/locations";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

const GlobeComponent = dynamic(() => import("./globeComponent"), {
  ssr: false,
});

export default function GlobeScene({ mapData }: { mapData: LocationsType[] }) {
  const [ready, setReady] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);
  const controlsRef = useRef<any>(null);

  useEffect(() => {
    // check if WebGL is available
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) throw new Error("WebGL not supported");
      setWebglSupported(true);
    } catch {
      setWebglSupported(false);
    }

    const controls = controlsRef.current;
    if (controls) {
      controls.target.set(-10, -35, -50);
      controls.object.position.set(0, 0, 200);
      controls.update();
    }

    setReady(true);
  }, []);

  if (!webglSupported) {
    return (
      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
        Your browser doesn&apos;t support WebGL.
      </div>
    );
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 200], fov: 75 }}
      className="w-full h-[600px] touch-none"
      shadows
      dpr={[1, 2]}
    >
      {ready && (
        <>
          {/* <OrthographicCamera
            position={[0, 0, 5700]}
            zoom={8}
            top={200}
            bottom={-200}
            left={200}
            right={-200}
          /> */}
          <ambientLight color={"#ffffff"} intensity={0.5} />
          <directionalLight
            position={[-100, 100, 100]}
            intensity={2}
            color="#ffbb55"
          />
          <pointLight position={[0, 0, -200]} intensity={1.8} color="#ffd700" />
          <GlobeComponent mapData={mapData} />
          <pointLight
            position={[-100, -80, -200]}
            intensity={1.2}
            color="#fff2a8"
          />
        </>
      )}
    </Canvas>
  );
}
