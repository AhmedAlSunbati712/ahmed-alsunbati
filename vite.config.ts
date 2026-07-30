import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";

// The primary deployment is served from the domain root. GitHub Pages passes
// VITE_BASE explicitly from the predeploy script.
const explicitBase = process.env.VITE_BASE;
const base =
  explicitBase !== undefined && explicitBase !== ""
    ? explicitBase.endsWith("/")
      ? explicitBase
      : `${explicitBase}/`
    : "/";

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
