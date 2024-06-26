import react from "@vitejs/plugin-react-swc";
import { createHtmlPlugin } from "vite-plugin-html";
import type { PluginOption } from "vite";

export function createPlugin(env: ViteEnv): Array<PluginOption | PluginOption[]> {
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
