import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/Genino/", // 👈 مسیر دقیق برای GitHub Pages
});
