import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";

// Base path: dev = "/"; Vercel = "/" (use VITE_BASE=/ or rely on VERCEL=1); GH Pages = "/ahmed-alsunbati/"
const explicitBase = process.env.VITE_BASE;
const isProduction = process.env.NODE_ENV === "production";
const isVercel = Boolean(process.env.VERCEL);
const base =
  explicitBase !== undefined && explicitBase !== ""
    ? explicitBase.endsWith("/")
      ? explicitBase
      : `${explicitBase}/`
    : !isProduction
      ? "/"
      : isVercel
        ? "/"
        : "/ahmed-alsunbati/";

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
