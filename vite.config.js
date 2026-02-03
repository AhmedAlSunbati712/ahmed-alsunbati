import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vitejs.dev/config/
// Use "/" in dev so localhost:5173/ works; use repo path for production (GitHub Pages)
export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "/ahmed-alsunbati/" : "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
