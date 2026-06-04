import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

/**
 * useEarthRotation
 *
 * Encapsulates Earth rotation logic so EarthMesh stays clean.
 * Returns a ref to attach to the rotating mesh.
 *
 * @param {object} options
 * @param {number} options.speed      - Rotation speed in rad/s (default 0.065)
 * @param {boolean} options.enabled   - Toggle rotation (default true)
 *
 * Scalability note: later you can add mouse-based tilt by reading
 * useThree().pointer here and lerping the x-rotation.
 */
export function useEarthRotation({ speed = 0.065, enabled = true } = {}) {
  const meshRef = useRef(null);

  useFrame((_state, delta) => {
    if (!enabled || !meshRef.current) return;
    meshRef.current.rotation.y += delta * speed;
  });

  return meshRef;
}

/**
 * useCloudRotation
 *
 * Clouds drift at a slightly different speed to Earth surface,
 * giving the impression of atmospheric circulation.
 */
export function useCloudRotation({ speed = 0.08, enabled = true } = {}) {
  const meshRef = useRef(null);

  useFrame((_state, delta) => {
    if (!enabled || !meshRef.current) return;
    meshRef.current.rotation.y += delta * speed;
  });

  return meshRef;
}
