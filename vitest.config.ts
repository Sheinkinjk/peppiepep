import { configDefaults, defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environment: "node",
    // Playwright-based E2E tests are executed via separate tooling/scripts, not Vitest.
    exclude: [...configDefaults.exclude, "**/tests/attribution-e2e.test.ts"],
  },
});
