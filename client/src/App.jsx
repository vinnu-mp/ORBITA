import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "./api/axios.js";
import { login, logout } from "./store/auth/authSlice.js";
import { Navbar } from "./components/index.js";
import { Outlet } from "react-router-dom";
import SpaceBackground from "./components/layouts/SpaceBackground.jsx";
import Cursor from "./components/Cursor";
import useCursor from "./hooks/useCursor";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useCursor();

  useEffect(() => {
    axios
      .get("/users/me")
      .then((res) => {
        if (res.data.isVarified === true) {
          dispatch(login({ userData: res.data.data }));
        }
      })
      .catch(() => {
        dispatch(logout());
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  if (loading) {
    return (
      <>
        <Cursor />
        <div
          style={{ background: "#020510" }}
          className="h-screen flex items-center justify-center"
        >
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-cyan-500/30 border-t-cyan-400 animate-spin" />
            <span
              className="text-xs text-white/25 tracking-widest uppercase"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              Initializing Orbita
            </span>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Cursor />
      <div style={{ position: "relative", minHeight: "100vh" }}>
        {/* Global space background — sits behind everything */}
        <SpaceBackground />

        {/* All page content sits above the background */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <Navbar />
          <main className="pt-16">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
