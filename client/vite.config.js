import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  // server: {
  //   proxy: {
  //     "/api": "http://localhost:4000",
  //   },
  // },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Manual chunk splitting keeps the Three.js runtime
    // in its own vendor chunk, so users don't re-download
    // it when app code changes.
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-three": ["three"],
          "vendor-r3f": ["@react-three/fiber", "@react-three/drei"],
          "vendor-react": ["react", "react-dom", "react-router-dom"],
        },
      },
    },
  },
});
