declare interface ViteEnv {
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
