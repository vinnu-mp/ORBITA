import React from "react";

/**
 * SceneLighting
 *
 * Three-point lighting rig:
 *  1. Key light  — warm directional from upper-right, simulates the Sun
 *  2. Fill light — soft cool from upper-left, prevents total darkness
 *  3. Rim light  — cyan directional from behind-bottom, hologram accent
 *
 * ambientLight is kept very low so the dark side of Earth stays dark,
 * giving the planet depth and realism.
 *
 * No shadows are computed for the Earth mesh because the geometry is a
 * smooth sphere — shadow computation would be wasted. castShadow/receiveShadow
 * are only enabled if you add surface features later.
 */

export default function SceneLighting() {
  return (
    <>
      {/* Very dim ambient — preserves dark side */}
      <ambientLight intensity={0.08} />

      {/* Sun — key light, warm white, upper right */}
      <directionalLight position={[4, 2, 2]} intensity={2.2} color="#fffaf0" />

      {/* Fill — cool blue, left side */}
      <directionalLight
        position={[-3, 1, 1]}
        intensity={0.35}
        color="#93c5fd"
      />

      {/* Rim — cyan, behind-bottom, hologram accent */}
      <directionalLight
        position={[-1, -2, -3]}
        intensity={0.5}
        color="#22d3ee"
      />

      {/* Subtle point light for emissive boost near Earth */}
      <pointLight
        position={[0, 0, 2.5]}
        intensity={0.15}
        color="#67e8f9"
        distance={8}
        decay={2}
      />
    </>
  );
}
