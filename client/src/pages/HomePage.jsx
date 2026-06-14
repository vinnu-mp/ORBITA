import React, { Suspense, lazy } from "react";

const HeroSection = lazy(() => import("../components/home/Hero/HeroSection"));
const PlatformFeatures = lazy(
  () => import("../components/home/PlatformFeatures"),
);
const Footer = lazy(() => import("../components/layouts/Footer"));

// Future sections — import lazily when they're built
// const FeaturesSection = lazy(() => import("../components/home/Features/FeaturesSection"));
// const ExploreSection  = lazy(() => import("../components/home/Explore/ExploreSection"));

const PageFallback = () => (
  <div className="min-h-screen w-full bg-[#020510] flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 rounded-full border-2 border-cyan-500/30 border-t-cyan-400 animate-spin" />
      <span
        className="text-xs text-white/25 tracking-widest uppercase"
        style={{ fontFamily: "'DM Mono', monospace" }}
      >
        Initializing Orbita
      </span>
    </div>
  </div>
);

export default function HomePage() {
  return (
    <main className="bg-[#020510] min-h-screen">
      <Suspense fallback={<PageFallback />}>
        <HeroSection />
        <PlatformFeatures />
        <Footer />
      </Suspense>
    </main>
  );
}
