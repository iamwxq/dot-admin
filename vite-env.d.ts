/// <reference types="vite/client" />

type BooleanEnv = "true" | "false" | "";

interface ImportMetaEnv {
  readonly VITE_PORT: number;

  readonly VITE_ROUTER_MODE: "hash" | "history";
  readonly VITE_APP_ENV: "development" | "production";
  readonly VITE_BUILD_COMPRESS: "gzip" | "brotli" | "gzip,brotli" | "none";

  readonly VITE_PWA: BooleanEnv;
  readonly VITE_OPEN: BooleanEnv;
  readonly VITE_REPORT: BooleanEnv;
  readonly VITE_APP_MOCK: BooleanEnv;
  readonly VITE_DROP_CONSOLE: BooleanEnv;
  readonly VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: BooleanEnv;

  readonly VITE_API_URL: string;
  readonly VITE_PUBLIC_PATH: string;
  readonly VITE_APP_HOMEPAGE: string;
  readonly VITE_GLOB_APP_TITLE: string;
  readonly VITE_PROXY: [string, string][];
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
