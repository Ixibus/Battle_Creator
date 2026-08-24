import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "happy-dom",
    css: false,
    fileParallelism: false,
    exclude: ['**/node_modules/**', '**/tests/**'],
  },
});
