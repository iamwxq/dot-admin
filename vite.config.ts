/// <reference types="vitest"/>

import path from "node:path";
import process from "node:process";
import react from "@vitejs/plugin-react-swc";
import { defineConfig, loadEnv } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import type { ConfigEnv, PluginOption, ProxyOptions, UserConfig } from "vite";

interface ViteEnv {
  VITE_PORT: number;

  VITE_ROUTER_MODE: "hash" | "history";
  VITE_BUILD_COMPRESS: "gzip" | "brotli" | "gzip,brotli" | "none";

  VITE_PWA: boolean;
  VITE_OPEN: boolean;
  VITE_REPORT: boolean;
  VITE_APP_MOCK: boolean;
  VITE_DROP_CONSOLE: boolean;
  VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean;

  VITE_API_URL: string;
  VITE_PUBLIC_PATH: string;
  VITE_GLOB_APP_TITLE: string;
  VITE_PROXY: [string, string][];
}

// load global .scss files
const additionalData: string = [
  `@use "@/styles/_variables.scss" as *;`,
  `@use "@/styles/_mixins.scss" as *;`,
  `@use "@/styles/_global.scss" as *;`,
].join("");

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const env = createEnv(loadEnv(mode, root));

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
    // vitest
    test: {},
  };
});

function _isDevelopment(mode: string): boolean {
  return mode === "development";
}

function _isProduction(mode: string): boolean {
  return mode === "production";
}

function _isTest(mode: string): boolean {
  return mode === "test";
}

function createEnv(env: Record<keyof ViteEnv, string>): ViteEnv {
  const result: Partial<ViteEnv> = {};

  for (const key of Object.keys(env) as Array<keyof ViteEnv>) {
    switch (key) {
      case "VITE_PORT":
        result[key] = Number(env[key]);
        break;
      case "VITE_PWA":
        result[key] = env[key] === "true";
        break;
      case "VITE_OPEN":
        result[key] = env[key] === "true";
        break;
      case "VITE_REPORT":
        result[key] = env[key] === "true";
        break;
      case "VITE_APP_MOCK":
        result[key] = env[key] === "true";
        break;
      case "VITE_DROP_CONSOLE":
        result[key] = env[key] === "true";
        break;
      case "VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE":
        result[key] = env[key] === "true";
        break;
      case "VITE_PROXY":
        try {
          result[key] = JSON.parse(env[key]);
        }
        catch (err) {
          console.error(err);
        }
        break;
      default:
        result[key] = env[key] as never;
    }
  }

  return result as ViteEnv;
}

function createProxy(env: ViteEnv["VITE_PROXY"] = []) {
  const proxys: Record<string, ProxyOptions> = {};

  for (const [prefix, target] of env) {
    proxys[prefix] = {
      target,
      ws: true,
      changeOrigin: true,
      rewrite: path => path.replace(new RegExp(`^${prefix}`), ""),
      ...(/^https:\/\//.test(target) ? { secure: false } : {}),
    };
  }

  return proxys;
}

function createPlugin(env: ViteEnv): Array<PluginOption | PluginOption[]> {
  const { VITE_GLOB_APP_TITLE } = env;

  return [
    react(),
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          title: VITE_GLOB_APP_TITLE,
        },
      },
    }),
  ];
}
