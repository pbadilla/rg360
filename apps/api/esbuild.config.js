import esbuild from "esbuild";
import pkg from "./package.json" assert { type: "json" };
import { builtinModules } from "module";

const externals = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.devDependencies || {}),
  ...builtinModules,
  ...builtinModules.map(m => `node:${m}`),
  "form-data",
  "combined-stream"
];

esbuild.build({
  entryPoints: ["src/index.ts"],
  bundle: true,
  platform: "node",
  target: "node22",
  format: "esm",
  outfile: "build/index.js",
  sourcemap: true,
  external: externals,
});
