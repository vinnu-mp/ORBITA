import React, { useMemo, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import EarthMesh from "./EarthMesh";
import SceneLighting from "./SceneLighting";
import AtmosphereGlow from "./AtmosphereGlow";
import ISSModel from "./ISSModel";

function ResponsiveCamera() {
  const { camera } = useThree();

  useEffect(() => {
    const updateCamera = () => {
      const w = window.innerWidth;
      if (w < 768) {
        camera.position.z = 5.5;
      } else if (w < 1024) {
        camera.position.z = 4.8;
      } else if (w < 1280) {
        camera.position.z = 4.2;
      } else {
        camera.position.z = 3.4;
      }
      camera.updateProjectionMatrix();
    };

    updateCamera(); // run on mount
    window.addEventListener("resize", updateCamera);
    return () => window.removeEventListener("resize", updateCamera);
  }, [camera]);

  return null;
}

/**
 * EarthCanvas
 *
 * Isolated R3F Canvas. Kept in its own component so it can be
 * code-split via React.lazy() — the heavy Three.js runtime is
 * only loaded when this component mounts.
 *
 * DPR is capped at 2 to avoid GPU overload on high-density screens.
 * frameloop="demand" pauses rendering when nothing changes — here we
 * switch to "always" because Earth rotates every frame, but we still
 * keep gl.antialias true and powerPreference "high-performance".
 */
export default function EarthCanvas() {
  const dpr = useMemo(() => Math.min(window.devicePixelRatio, 2), []);

  return (
    <div
      className="w-full h-full"
      style={{
        maxWidth: "100%",
        maxHeight: "100%",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 3.4], fov: 45, near: 0.1, far: 100 }}
        dpr={dpr}
        frameloop="always"
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        style={{ background: "transparent" }}
      >
        <ResponsiveCamera />
        <SceneLighting />
        <EarthMesh />
        <AtmosphereGlow />
        <ISSModel />
        <Preload all />
      </Canvas>
    </div>
  );
}
