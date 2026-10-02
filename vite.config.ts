import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

const config = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    envPrefix: ["VITE_", "PUBLIC_"],
    resolve: { tsconfigPaths: true },
    plugins: [
      tanstackStart({
        router: { quoteStyle: "single" },
        prerender: { enabled: true, crawlLinks: true, concurrency: 4, retryCount: 3, retryDelay: 1500 },
      }),
      tailwindcss(),
      viteReact(),
    ],
    server: {
      port: 3000,
      proxy: {
        "/ingest/static": {
          target: "https://eu-assets.i.posthog.com",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/ingest/, ""),
        },
        "/ingest/array": {
          target: "https://eu-assets.i.posthog.com",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/ingest/, ""),
        },
        "/ingest": {
          target: env.VITE_PUBLIC_POSTHOG_HOST || "https://eu.i.posthog.com",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/ingest/, ""),
        },
      },
    },
    build: {
      target: "esnext",
      cssCodeSplit: true,
      chunkSizeWarningLimit: 700,
      modulePreload: {
        polyfill: false,
        resolveDependencies(filename, deps) {
          return deps.filter((dep) => !dep.includes("posthog"));
        },
      },
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("posthog-js") || id.includes("@posthog")) return "posthog";
          },
        },
      },
    },
  };
});

export default config;
