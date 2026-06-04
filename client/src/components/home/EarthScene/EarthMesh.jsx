import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

/**
 * EarthMesh
 *
 * Uses a MeshStandardMaterial with:
 *  - map         : day-side color texture
 *  - normalMap   : surface relief
 *  - roughnessMap: ocean vs land reflection
 *  - emissiveMap : night-side city lights (subtle)
 *  - emissive    : base emissive color for hologram tint
 *
 * A second transparent mesh layered on top creates the hologram
 * "wireframe ring" effect without expensive custom shaders.
 *
 * Textures: free high-quality sources listed in README.
 * The paths below expect textures in /public/textures/.
 */
export default function EarthMesh() {
  const meshRef = useRef(null);
  const cloudRef = useRef(null);

  // useTexture batches all loads into a single Suspense boundary
  const [colorMap, normalMap, roughnessMap, cloudsMap, nightMap] = useTexture([
    "/textures/earth_daymap.jpg",
    "/textures/earth_normal.jpg",
    "/textures/earth_roughness.jpg",
    "/textures/earth_clouds.jpg",
    "/textures/earth_nightmap.jpg",
  ]);

  // Hologram overlay material — subtle scanline effect via transparent mesh
  const hologramMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: new THREE.Color(0x00e5ff),
      wireframe: true,
      transparent: true,
      opacity: 0.025,
    });
  }, []);

  const earthGeometry = useMemo(() => new THREE.SphereGeometry(1, 64, 64), []);
  const cloudGeometry = useMemo(
    () => new THREE.SphereGeometry(1.012, 48, 48),
    [],
  );
  const holoGeometry = useMemo(
    () => new THREE.SphereGeometry(1.008, 28, 28),
    [],
  );

  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.065; // ~3.7 deg/s — slow, cinematic
    }
    if (cloudRef.current) {
      cloudRef.current.rotation.y += delta * 0.08; // clouds drift slightly faster
    }
  });

  return (
    <group>
      {/* Earth surface */}
      <mesh ref={meshRef} geometry={earthGeometry} castShadow>
        <meshStandardMaterial
          map={colorMap}
          normalMap={normalMap}
          normalScale={new THREE.Vector2(0.6, 0.6)}
          roughnessMap={roughnessMap}
          roughness={0.75}
          metalness={0.08}
          emissiveMap={nightMap} // ← add this
          emissive={new THREE.Color(0xffd060)} // ← warm city-light orange/yellow
          emissiveIntensity={0.6} // ← was 0.12, now 0.6
        />
      </mesh>

      {/* Cloud layer — separate, slightly larger sphere */}
      <mesh ref={cloudRef} geometry={cloudGeometry}>
        <meshStandardMaterial
          map={cloudsMap}
          transparent
          opacity={0.28}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Hologram wireframe overlay */}
      <mesh geometry={holoGeometry} material={hologramMaterial} />
    </group>
  );
}
