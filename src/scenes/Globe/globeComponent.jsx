"use client";

import { useRef, useEffect, useMemo } from "react";
import * as THREE from "three";
import ThreeGlobe from "three-globe";
import countries from "../../../public/files/custom.geo.json";
import linesJSON from "../../../public/files/lines.json";
import map from "../../../public/files/map.json";
import { useFrame } from "@react-three/fiber";
import { buildLinesFromLocations } from "@/utils/buildLinesFromLocations";

function parseMapData(inputData) {
  const parsedData = inputData?.map((item) => ({
    size: 2.0,
    lat: item.latitude.toFixed(6),
    lng: item.longitude.toFixed(6),
    city: item.label,
  }));

  return { type: "Map", maps: parsedData || map.maps };
}

export default function GlobeComponent({ mapData }) {
  const groupRef = useRef(null);
  const globeRef = useRef(null);

  const dragging = useRef(false);
  const lastX = useRef(0);
  const lastY = useRef(0);
  const velocityX = useRef(0);
  const velocityY = useRef(0);
  const damping = 0.93;

  const parsedMapData = useMemo(() => parseMapData(mapData), [mapData]);
  const lines = useMemo(() => buildLinesFromLocations(mapData), [mapData]);

  useEffect(() => {
    const globe = new ThreeGlobe({
      waitForGlobeReady: true,
      animateIn: true,
    });

    globe
      .hexPolygonsData(countries.features)
      .hexPolygonResolution(3)
      .hexPolygonAltitude(0.02)
      .hexPolygonMargin(0.5)
      .hexPolygonColor(() => "#fff2a8")
      .showAtmosphere(true)
      .atmosphereColor("#ffae00")
      .atmosphereAltitude(0.1);

    globe
      .arcsData(lines.pulls ?? linesJSON.pulls)
      .arcColor((e) => (e.status ? "#9cff00" : "#ff4000"))
      .arcAltitude((e) => e.arcAlt)
      .arcStroke((e) => (e.status ? 0.5 : 0.3))
      .arcDashLength(1.1)
      .arcDashGap(5)
      .arcDashAnimateTime(1000)
      .arcsTransitionDuration(1000)
      .arcDashInitialGap((e) => e.order * 1);

    globe
      .labelsData(parsedMapData.maps)
      .labelColor(() => "#ff7300")
      .labelDotRadius(0.9)
      .labelSize((e) => e.size)
      .labelText("city")
      .labelResolution(8)
      .labelAltitude(0.07)
      .pointsData(parsedMapData.maps)
      .pointColor(() => "#ff7300")
      .pointsMerge(true)
      .pointAltitude(0.07)
      .pointRadius(0.08);

    const mat = globe.globeMaterial();
    mat.color = new THREE.Color("#070707");
    mat.emissive = new THREE.Color("#352434");
    mat.emissiveIntensity = 0.2;
    mat.shininess = 8;
    mat.specular = new THREE.Color("#2b281b");

    mat.onBeforeCompile = (shader) => {
      shader.fragmentShader = shader.fragmentShader.replace(
        `#include <emissivemap_fragment>`,
        `
            vec3 viewDir = normalize(vViewPosition);
            float fresnel = pow(0.8 - dot(viewDir, normal), 2.0);
            vec3 baseEmissive = vec3(0.01, 0.01, 0.01);
            vec3 edgeGlow = vec3(1.0, 0.45, 0.4) * pow(1.0 - dot(viewDir, normal), 4.0);
            totalEmissiveRadiance += baseEmissive + edgeGlow * 0.3;
          `
      );
    };

    // mat.onBeforeCompile = (shader) => {
    //   shader.fragmentShader = shader.fragmentShader.replace(
    //     `#include <emissivemap_fragment>`,
    //     `
    //         // Compute edge glow based on view direction and normal (Fresnel)
    //         vec3 viewDir = normalize(vViewPosition);
    //         float fresnel = pow(0.8 - dot(viewDir, normal), 2.0);
    //         vec3 edgeGlow = vec3(1.0, 0.4, 0.4) * fresnel * 0.3;

    //         totalEmissiveRadiance += edgeGlow;
    //       `
    //   );
    // };

    globe.position.set(0, 0, 0);
    globeRef.current = globe;

    if (groupRef.current) {
      groupRef.current.add(globe);
      groupRef.current.rotation.order = "YXZ";
    }
  }, []);

  const onPointerDown = (e) => {
    dragging.current = true;
    lastX.current = e.clientX;
    lastY.current = e.clientY;
  };

  const onPointerUp = (e) => {
    dragging.current = false;
  };

  const onPointerMove = (e) => {
    if (!dragging.current || !groupRef.current) return;

    const dx = e.clientX - lastX.current;
    const dy = e.clientY - lastY.current;
    lastX.current = e.clientX;
    lastY.current = e.clientY;

    const speed = 0.003;

    const quaternion = new THREE.Quaternion();
    const axis = new THREE.Vector3();

    // Rotate Y axis
    axis.set(0, 1, 0);
    quaternion.setFromAxisAngle(axis, dx * speed);
    groupRef.current.quaternion.premultiply(quaternion);

    // Rotate X axis
    axis.set(1, 0, 0);
    quaternion.setFromAxisAngle(axis, dy * speed);
    groupRef.current.quaternion.premultiply(quaternion);

    velocityX.current = dx * speed * 0.8;
    velocityY.current = dy * speed * 0.8;
  };

  useFrame(() => {
    if (!dragging.current && groupRef.current) {
      const quaternion = new THREE.Quaternion();
      const axis = new THREE.Vector3();

      // Y inertia
      axis.set(0, 1, 0);
      quaternion.setFromAxisAngle(axis, velocityY.current);
      groupRef.current.quaternion.premultiply(quaternion);

      // X inertia
      axis.set(1, 0, 0);
      quaternion.setFromAxisAngle(axis, velocityX.current);
      groupRef.current.quaternion.premultiply(quaternion);

      velocityX.current *= damping;
      velocityY.current *= damping;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerUp}
      >
        <sphereGeometry args={[100, 32, 32]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    </group>
  );
}
