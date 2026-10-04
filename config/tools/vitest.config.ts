// =================================================================================================
// Vitest Configuration for Diorthosis
//
// Tests target the layers independent of Obsidian (domain, application, infrastructure), and these
// layers run in plain Node. The `obsidian` module cannot be resolved outside the host application,
// so an adapter test, if introduced, requires a dedicated mock registered through `resolve.alias`.
//
// The option `passWithNoTests` lets the continuous-integration run pass while the source tree holds
// no behaviour. The option must be removed with the first test, so that a test folder emptied by
// mistake fails the run.
// =================================================================================================
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  root: fileURLToPath(new URL("../..", import.meta.url)),
  test: {
    include: ["tests/**/*.test.ts"],
    environment: "node",
    passWithNoTests: true,
    coverage: {
      provider: "v8",
      include: ["src/**/*.ts"],
      exclude: ["src/adapters/**", "src/main.ts"],
    },
  },
});
