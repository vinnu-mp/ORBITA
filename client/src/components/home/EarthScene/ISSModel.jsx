import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const ISS_ORBIT_RADIUS = 1.38; // slightly closer than before
const ISS_ORBIT_TILT = 51.6 * (Math.PI / 180);
const ISS_ORBIT_SPEED = 0.18;

export default function ISSModel() {
  const orbitRef = useRef(null);
  const issRef = useRef(null);

  // Silver/aluminium structure
  const metalMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0xddeeff),
        metalness: 0.9,
        roughness: 0.2,
        emissive: new THREE.Color(0x335566),
        emissiveIntensity: 0.2,
      }),
    [],
  );

  // Darker module sections
  const moduleMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0xaabbcc),
        metalness: 0.75,
        roughness: 0.35,
        emissive: new THREE.Color(0x112233),
        emissiveIntensity: 0.15,
      }),
    [],
  );

  // Solar panels — dark blue, slightly emissive
  const solarMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x1a3060),
        metalness: 0.5,
        roughness: 0.4,
        emissive: new THREE.Color(0x0d2040),
        emissiveIntensity: 0.5,
        side: THREE.DoubleSide, // visible from both faces
      }),
    [],
  );

  // Solar panel frame
  const frameMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0xccddee),
        metalness: 0.9,
        roughness: 0.2,
      }),
    [],
  );

  // Glow beacon
  const beaconMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(0x66eeff),
        transparent: true,
        opacity: 1,
      }),
    [],
  );

  // Radiator panels — white/cream
  const radiatorMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0xeef4ff),
        metalness: 0.3,
        roughness: 0.6,
        emissive: new THREE.Color(0x223344),
        emissiveIntensity: 0.08,
        side: THREE.DoubleSide,
      }),
    [],
  );

  useFrame((_state, delta) => {
    if (orbitRef.current) {
      orbitRef.current.rotation.y += delta * ISS_ORBIT_SPEED;
    }
    // No self-rotation — keep ISS facing a consistent direction
    // so panels are always readable
  });

  return (
    <group rotation={[0.48, 0, ISS_ORBIT_TILT]}>
      <group ref={orbitRef}>
        {/* ISS at orbit radius, tilted so panels face "up" not sideways */}
        <group
          ref={issRef}
          position={[ISS_ORBIT_RADIUS, 0, 0]}
          rotation={[0, 0, Math.PI * 0.08]} // slight pitch for realism
          scale={[0.01, 0.01, 0.01]}
        >
          {/* ══ INTEGRATED TRUSS STRUCTURE (ITS) — horizontal backbone ══ */}
          <mesh material={metalMat} position={[0, 0, 0]}>
            <boxGeometry args={[14, 0.22, 0.22]} />
          </mesh>

          {/* ══ HABITAT MODULES — stacked cylinders along Z axis ══ */}

          {/* Harmony / Node 2 — center */}
          <mesh
            material={moduleMat}
            position={[0, 0, 0]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <cylinderGeometry args={[0.55, 0.55, 2.2, 12]} />
          </mesh>

          {/* Unity / Node 1 */}
          <mesh
            material={moduleMat}
            position={[0, 0, 2.4]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <cylinderGeometry args={[0.5, 0.5, 1.8, 12]} />
          </mesh>

          {/* Destiny lab */}
          <mesh
            material={moduleMat}
            position={[0, 0, 4.2]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <cylinderGeometry args={[0.52, 0.52, 2.6, 12]} />
          </mesh>

          {/* Zvezda service module */}
          <mesh
            material={moduleMat}
            position={[0, 0, -2.6]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <cylinderGeometry args={[0.5, 0.48, 2.8, 10]} />
          </mesh>

          {/* Zarya (FGB) */}
          <mesh
            material={moduleMat}
            position={[0, 0, -5.2]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <cylinderGeometry args={[0.48, 0.48, 2.4, 10]} />
          </mesh>

          {/* Columbus / Kibo labs — offset from center */}
          <mesh
            material={moduleMat}
            position={[0, -0.6, 1.2]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <cylinderGeometry args={[0.42, 0.42, 2.0, 10]} />
          </mesh>

          {/* ══ RADIATOR PANELS — vertical, between truss sections ══ */}
          {/* Left radiators */}
          <mesh
            material={radiatorMat}
            position={[-4, 0.55, 0]}
            rotation={[0, 0, 0]}
          >
            <boxGeometry args={[2.2, 0.06, 1.1]} />
          </mesh>
          <mesh
            material={radiatorMat}
            position={[-4, -0.55, 0]}
            rotation={[0, 0, 0]}
          >
            <boxGeometry args={[2.2, 0.06, 1.1]} />
          </mesh>
          {/* Right radiators */}
          <mesh
            material={radiatorMat}
            position={[4, 0.55, 0]}
            rotation={[0, 0, 0]}
          >
            <boxGeometry args={[2.2, 0.06, 1.1]} />
          </mesh>
          <mesh
            material={radiatorMat}
            position={[4, -0.55, 0]}
            rotation={[0, 0, 0]}
          >
            <boxGeometry args={[2.2, 0.06, 1.1]} />
          </mesh>

          {/* ══ SOLAR ARRAYS — 4 pairs, the most visible feature ══
               Key fix: panels are in the XZ plane (not XY) so they
               face the camera most of the orbit, not edge-on ══ */}

          {/* Pair 1 — far left */}
          <SolarArray
            position={[-6.5, 0, 1.2]}
            solarMat={solarMat}
            frameMat={frameMat}
          />
          <SolarArray
            position={[-6.5, 0, -1.2]}
            solarMat={solarMat}
            frameMat={frameMat}
          />

          {/* Pair 2 — mid left */}
          <SolarArray
            position={[-3.5, 0, 1.2]}
            solarMat={solarMat}
            frameMat={frameMat}
          />
          <SolarArray
            position={[-3.5, 0, -1.2]}
            solarMat={solarMat}
            frameMat={frameMat}
          />

          {/* Pair 3 — mid right */}
          <SolarArray
            position={[3.5, 0, 1.2]}
            solarMat={solarMat}
            frameMat={frameMat}
          />
          <SolarArray
            position={[3.5, 0, -1.2]}
            solarMat={solarMat}
            frameMat={frameMat}
          />

          {/* Pair 4 — far right */}
          <SolarArray
            position={[6.5, 0, 1.2]}
            solarMat={solarMat}
            frameMat={frameMat}
          />
          <SolarArray
            position={[6.5, 0, -1.2]}
            solarMat={solarMat}
            frameMat={frameMat}
          />

          {/* ══ DOCKING PORTS — small cylinders on top/bottom ══ */}
          <mesh
            material={metalMat}
            position={[0, 0.75, 0]}
            rotation={[0, 0, 0]}
          >
            <cylinderGeometry args={[0.18, 0.18, 0.5, 8]} />
          </mesh>
          <mesh
            material={metalMat}
            position={[0, -0.75, 0]}
            rotation={[0, 0, 0]}
          >
            <cylinderGeometry args={[0.18, 0.18, 0.5, 8]} />
          </mesh>

          {/* ══ BEACON GLOW — keeps ISS visible at any angle ══ */}
          <mesh material={beaconMat} position={[0, 0, 0]}>
            <sphereGeometry args={[0.32, 8, 8]} />
          </mesh>

          {/* Smaller secondary beacons on wingtips */}
          <mesh material={beaconMat} position={[-6.5, 0, 0]}>
            <sphereGeometry args={[0.14, 6, 6]} />
          </mesh>
          <mesh material={beaconMat} position={[6.5, 0, 0]}>
            <sphereGeometry args={[0.14, 6, 6]} />
          </mesh>
        </group>

        {/* ══ ORBIT PATH RING ══ */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[ISS_ORBIT_RADIUS, 0.0015, 6, 140]} />
          <meshBasicMaterial
            color={new THREE.Color(0x38bdf8)}
            transparent
            opacity={0.1}
          />
        </mesh>
      </group>
    </group>
  );
}

/**
 * SolarArray — reusable solar panel component.
 * Panel faces XZ plane so it's always visible, not edge-on.
 * Includes a thin aluminium frame around each panel.
 */
function SolarArray({ position, solarMat, frameMat }) {
  return (
    <group position={position}>
      {/* Panel surface — in XZ plane, tall height for visibility */}
      <mesh material={solarMat} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[2.8, 1.6, 0.04]} />
      </mesh>

      {/* Frame top */}
      <mesh
        material={frameMat}
        position={[0, 0.82, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <boxGeometry args={[2.9, 0.12, 0.06]} />
      </mesh>
      {/* Frame bottom */}
      <mesh
        material={frameMat}
        position={[0, -0.82, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <boxGeometry args={[2.9, 0.12, 0.06]} />
      </mesh>
      {/* Frame left */}
      <mesh
        material={frameMat}
        position={[-1.45, 0, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <boxGeometry args={[0.12, 1.6, 0.06]} />
      </mesh>
      {/* Frame right */}
      <mesh
        material={frameMat}
        position={[1.45, 0, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <boxGeometry args={[0.12, 1.6, 0.06]} />
      </mesh>

      {/* Centre mast connecting panel to truss */}
      <mesh material={frameMat} position={[0, 0, 0]}>
        <boxGeometry args={[0.1, 0.1, 1.3]} />
      </mesh>
    </group>
  );
}
