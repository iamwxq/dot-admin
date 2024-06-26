export function isDevelopment(mode: string): boolean {
  return mode === "development";
}

export function isProduction(mode: string): boolean {
  return mode === "production";
}

export function isTest(mode: string): boolean {
  return mode === "test";
}

export function convert(env: Record<keyof ViteEnv, string>): ViteEnv {
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
        result[key] = env[key] as any;
    }
  }

  return result as ViteEnv;
}
