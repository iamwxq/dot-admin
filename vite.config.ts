/// <reference types="vitest"/>

import path from "node:path";
import process from "node:process";
import { Agent } from "node:http";
import react from "@vitejs/plugin-react-swc";
import { defineConfig, loadEnv } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import { VitePWA } from "vite-plugin-pwa";
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
}

// load global .scss files
const additionalData: string = [
  `@use "@/styles/_fonts.scss" as *;`,
  `@use "@/styles/_variables.scss" as *;`,
  `@use "@/styles/_mixins.scss" as *;`,
  `@use "@/styles/_antd.override.scss" as *;`,
  `@use "@/styles/_global.scss" as *;`,
].join("");

function createEnvs(env: Record<keyof ViteEnv, string>): ViteEnv {
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
      default:
        result[key] = env[key] as never;
    }
  }

  return result as ViteEnv;
}

function createPlugin(env: ViteEnv): Array<PluginOption | PluginOption[]> {
  const { VITE_GLOB_APP_TITLE, VITE_PWA } = env;

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
    ...(VITE_PWA
      ? [VitePWA({
          registerType: "autoUpdate",
          manifest: {
            name: VITE_GLOB_APP_TITLE,
            short_name: VITE_GLOB_APP_TITLE,
            theme_color: "#ffffff",
            icons: [
              {
                src: "/logo.png",
                sizes: "192x192",
                type: "image/png",
              },
              {
                src: "/logo.png",
                sizes: "512x512",
                type: "image/png",
              },
              {
                src: "/logo.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "any maskable",
              },
            ],
          },
        })]
      : []),
  ];
}

function createProxies() {
  const proxies: Record<string, ProxyOptions> = {};

  /** @description 此处配置需要代理的url */
  const urls: Array<[string, string]> = [
    ["/api", "http://localhost:5250"],
  ];

  for (const [prefix, target] of urls) {
    proxies[prefix] = {
      target,
      ws: true,
      changeOrigin: true,
      rewrite: path => path.replace(new RegExp(`^${prefix}`), ""),
      agent: new Agent({ keepAlive: true, keepAliveInitialDelay: 20_000 }),
      ...(/^https:\/\//.test(target) ? { secure: false } : {}),
    };
  }

  return proxies;
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const env = createEnvs(loadEnv(mode, root));

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
        "#": path.resolve(__dirname, "types"),
      },
    },
    css: {
      devSourcemap: true,
      preprocessorOptions: {
        scss: { additionalData },
      },
    },
    server: {
      cors: true,
      host: "0.0.0.0",
      strictPort: true,
      port: env.VITE_PORT,
      open: env.VITE_OPEN,
      proxy: env.VITE_APP_MOCK ? undefined : createProxies(),
    },
    build: {
      outDir: "dist",
      target: "esnext",
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
