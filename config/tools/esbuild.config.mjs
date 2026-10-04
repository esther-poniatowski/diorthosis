// =================================================================================================
// esbuild Configuration for Diorthosis
//
// Bundles a build target into the `main.js` file loaded by Obsidian from a plugin folder.
//
// Usage
// -----
//   node config/tools/esbuild.config.mjs [production] [--target=<name>]
//
//   production       single minified build; without it, watch mode with inline sourcemaps
//   --target=plugin  the diorthosis plugin, written to `main.js` at the repository root (default)
//
// Notes
// -----
// Modules provided by the Obsidian runtime are marked as external and must never be bundled. A
// bundled copy of a CodeMirror core package breaks the identity checks of its extensions, and the
// markers and highlights drawn in the editor depend on these checks.
// =================================================================================================
import { builtinModules } from "node:module";
import esbuild from "esbuild";

/** Packages supplied by Obsidian at run time. */
const RUNTIME_PACKAGES = [
  "obsidian",
  "electron",
  "@codemirror/autocomplete",
  "@codemirror/collab",
  "@codemirror/commands",
  "@codemirror/language",
  "@codemirror/lint",
  "@codemirror/search",
  "@codemirror/state",
  "@codemirror/view",
  "@lezer/common",
  "@lezer/highlight",
  "@lezer/lr",
];

/** Build targets: each target is a plugin folder holding its own `manifest.json`. */
const TARGETS = {
  plugin: { entryPoints: ["src/main.ts"], outfile: "main.js" },
};

const args = process.argv.slice(2);
const production = args.includes("production");
const targetName = args.find((arg) => arg.startsWith("--target="))?.slice("--target=".length);
const target = TARGETS[targetName ?? "plugin"];
if (!target) {
  throw new Error(`Unknown build target "${targetName}"; known: ${Object.keys(TARGETS).join(", ")}.`);
}

const context = await esbuild.context({
  ...target,
  bundle: true,
  external: [...RUNTIME_PACKAGES, ...builtinModules],
  format: "cjs",
  target: "es2020",
  logLevel: "info",
  sourcemap: production ? false : "inline",
  minify: production,
  treeShaking: true,
});

if (production) {
  await context.rebuild();
  await context.dispose();
} else {
  await context.watch();
}
