import React, { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";

export default function App() {
  const [activeProduct, setActiveProduct] = useState<"questly" | "nexora">("questly");

  return (
    <div
      className={`h-screen flex flex-col overflow-hidden antialiased transition-all duration-700 select-none ${
        activeProduct === "questly"
          ? "bg-[#faf9f6] text-gray-900"
          : "bg-white text-slate-900"
      }`}
      style={{
        height: "100vh",
        maxHeight: "100svh",
      }}
    >
      <Navbar activeProduct={activeProduct} setActiveProduct={setActiveProduct} />
      <Hero activeProduct={activeProduct} />
    </div>
  );
}
