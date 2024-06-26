/// <reference types="vitest"/>

import path from "node:path";
import process from "node:process";
import { defineConfig, loadEnv } from "vite";
import type { ConfigEnv, UserConfig } from "vite";

import { createProxy } from "./build/proxy";
import { convert } from "./build/env";
import { createPlugin } from "./build/plugin";

// load global .scss files
const additionalData: string = [
  `@use "@/styles/_variables.scss" as *;`,
  `@use "@/styles/_mixins.scss" as *;`,
  `@use "@/styles/_global.scss" as *;`,
].join("");

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const env = convert(loadEnv(mode, root));

  return {
    root,
    base: env.VITE_PUBLIC_PATH,
    plugins: createPlugin(env),
    esbuild: {
      pure: env.VITE_DROP_CONSOLE
        ? [
            "console.log",
            "console.info",
            "debugger",
          ]
        : [],
    },
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
      cors: true,
      host: "0.0.0.0",
      port: env.VITE_PORT,
      open: env.VITE_OPEN,
      proxy: createProxy(env.VITE_PROXY),
    },
    build: {
      outDir: "dist",
      minify: env.VITE_DROP_CONSOLE ? "terser" : "esbuild",
      terserOptions: env.VITE_DROP_CONSOLE
        ? {
            compress: {
              drop_console: env.VITE_DROP_CONSOLE,
              drop_debugger: true,
            },
          }
        : undefined,
      sourcemap: false,
      reportCompressedSize: false,
      chunkSizeWarningLimit: 2_000,
      rollupOptions: {
        output: {
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
        },
      },
    },
    test: {},
  };
});
