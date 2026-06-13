import React, { Suspense, lazy } from "react";
import HeroText from "./HeroText";
import StarField from "../Background/StarField";
import GridOverlay from "../Background/GridOverlay";
import OrbitalRings from "../Background/OrbitalRings";

const EarthCanvas = lazy(() => import("../EarthScene/EarthCanvas"));

const EarthFallback = () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="w-64 h-64 rounded-full bg-gradient-radial from-cyan-900/30 to-transparent animate-pulse" />
  </div>
);

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen w-full overflow-hidden bg-[#020510] flex items-center pt-12 lg:pt-0"
      style={{ isolation: "isolate" }}
    >
      {/* Layered background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#020510] via-[#040d1f] to-[#020814] z-0" />
      <div className="absolute inset-0 z-0">
        <StarField />
      </div>
      <div className="absolute inset-0 z-0 pointer-events-none">
        <GridOverlay />
      </div>

      {/* Glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-cyan-500/[0.04] blur-[120px] z-0 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-blue-700/[0.06] blur-[100px] z-0 pointer-events-none" />

      {/* Main content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-0">
          {/* Left: text content */}
          <div className="w-full lg:w-[48%] flex flex-col gap-8 order-1 min-w-0">
            <HeroText />
          </div>

          {/* Right: Earth */}
          <div
            className="w-full lg:w-[52%] h-[420px] sm:h-[520px] lg:h-[560px] xl:h-[700px] relative order-2 flex items-center justify-center overflow-hidden"
            style={{
              WebkitMaskImage:
                "radial-gradient(ellipse 80% 80% at center, black 60%, transparent 100%)",
              maskImage:
                "radial-gradient(ellipse 80% 80% at center, black 60%, transparent 100%)",
            }}
          >
            {/* Orbital decoration rings */}
            <div className="absolute inset-0 pointer-events-none z-0">
              <OrbitalRings />
            </div>

            {/* Ambient glow behind Earth */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              <div className="w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] lg:w-[560px] lg:h-[560px] rounded-full bg-cyan-400/[0.07] blur-[60px]" />
            </div>

            <Suspense fallback={<EarthFallback />}>
              <EarthCanvas />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#020510] to-transparent z-10 pointer-events-none" />
    </section>
  );
}
