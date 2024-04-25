import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPathsPlugin from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteTsconfigPathsPlugin(), sentryVitePlugin({
    org: "sunaab",
    project: "apple-website"
  })],

  build: {
    sourcemap: true
  }
});