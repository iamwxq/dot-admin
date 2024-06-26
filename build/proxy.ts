import type { ProxyOptions } from "vite";

export function createProxy(env: ViteEnv["VITE_PROXY"] = []) {
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
