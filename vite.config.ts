import * as path from "node:path";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// load global .scss files
const additionalData = [
  `@use "@/styles/_variables.scss" as *;`,
  `@use "@/styles/_mixins.scss" as *;`,
  `@use "@/styles/_global.scss" as *;`,
].join("");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: { additionalData },
    },
  },
  server: {
    host: "0.0.0.0",
    port: 23012,
    open: true,
    cors: true,
  },
});
