import React, { useMemo } from "react";
import * as THREE from "three";

/**
 * AtmosphereGlow
 *
 * A slightly oversized transparent sphere with a custom ShaderMaterial
 * that fades to zero opacity at the center (facing the camera) and
 * glows at the limb — the classic atmospheric Fresnel effect.
 *
 * No post-processing (EffectComposer) needed. This is a pure geometry
 * trick that performs well on all devices and avoids the cost of bloom passes.
 */

const vertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vPosition;

  uniform vec3 uGlowColor;
  uniform float uIntensity;
  uniform float uPower;

  void main() {
    vec3 viewDir = normalize(-vPosition);
    float fresnel = pow(1.0 - abs(dot(viewDir, vNormal)), uPower);
    float alpha = fresnel * uIntensity;
    gl_FragColor = vec4(uGlowColor, alpha);
  }
`;

export default function AtmosphereGlow() {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uGlowColor: { value: new THREE.Color(0x38bdf8) }, // sky-400
          uIntensity: { value: 0.7 },
          uPower: { value: 3.2 },
        },
        transparent: true,
        depthWrite: false,
        side: THREE.FrontSide,
        blending: THREE.AdditiveBlending,
      }),
    [],
  );

  const geometry = useMemo(() => new THREE.SphereGeometry(1.18, 48, 48), []);

  return <mesh geometry={geometry} material={material} />;
}
