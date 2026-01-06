import { configDefaults, defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
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
