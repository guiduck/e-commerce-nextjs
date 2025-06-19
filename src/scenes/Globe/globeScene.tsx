/* eslint-disable @typescript-eslint/no-explicit-any*/

"use client";

import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom, Noise } from "@react-three/postprocessing";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import dynamic from "next/dynamic";
import { LocationsType } from "@/types/locations";

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
    <Canvas className="w-full h-[600px]" shadows dpr={[1, 2]}>
      {ready && (
        <>
          <OrthographicCamera
            position={[0, 0, 5700]}
            zoom={10}
            top={200}
            bottom={-200}
            left={200}
            right={-200}
          />
          <EffectComposer>
            <Bloom luminanceThreshold={0.8} luminanceSmoothing={0.9} />
            <Noise opacity={0.02} />
          </EffectComposer>
          <ambientLight color={0xbbbbbb} intensity={0.5} />
          <directionalLight color="0xffffff" position={[0, 0, 5]} />
          <directionalLight
            color={0xffffff}
            position={[-800, 2000, 400]}
            intensity={0.8}
          />
          <directionalLight
            color="#fabfff"
            position={[-200, 500, 200]}
            intensity={1}
          />
          <directionalLight
            color={0x8566cc}
            position={[-200, 500, 200]}
            intensity={0.5}
          />
          <GlobeComponent mapData={mapData} />
          <fog attach="fog" args={["#5f002c", 300, 2000]} />
          <OrbitControls
            ref={controlsRef}
            enableZoom
            enableDamping
            enablePan
            minDistance={100}
            maxDistance={200}
            rotateSpeed={0.5}
            zoomSpeed={1}
            autoRotate={false}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={(3 * Math.PI) / 60}
          />
        </>
      )}
    </Canvas>
  );
}
