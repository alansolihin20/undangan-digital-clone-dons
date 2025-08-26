// vite.config.js
import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import SVGLoader from "vite-svg-loader";

export default defineConfig({
  plugins: [vue(), SVGLoader()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  server: {
    port: 3000,
  },
});
