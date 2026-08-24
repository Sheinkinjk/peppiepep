import { fileURLToPath } from "node:url";
import { configDefaults, defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

// The "@/..." alias is declared explicitly rather than inherited from tsconfig.
// vite-tsconfig-paths only applies paths to files tsconfig INCLUDES, and tests
// are excluded from tsconfig.json so that a drifting test fixture cannot fail a
// production `next build` (Next 16.3 type-checks everything tsconfig includes,
// which 16.0 did not). Without this alias every test import of "@/..." breaks.
export default defineConfig({
  plugins: [tsconfigPaths()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    // Playwright-based E2E tests are executed via separate tooling/scripts, not Vitest.
    exclude: [
      ...configDefaults.exclude,
      "**/*.playwright.spec.ts",
      "**/tests/attribution-e2e.test.ts",
      "**/tests/e2e-dashboard-refactored.test.ts",
      "**/tests/visual-dashboard-regression.test.ts",
    ],
  },
});
