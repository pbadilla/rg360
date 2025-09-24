import { build } from 'esbuild';
import { builtinModules } from 'node:module';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { dependencies, devDependencies } = require('./package.json');

const externals = [
  ...Object.keys(dependencies || {}),
  ...Object.keys(devDependencies || {}),
  ...builtinModules,                  // e.g. fs, path
  ...builtinModules.map(m => `node:${m}`), // e.g. node:fs
];

await build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  platform: 'node',
  format: 'esm',
  target: 'node22',
  outfile: 'build/index.js',
  sourcemap: true,
  tsconfig: 'tsconfig.json',
  external: externals,
});
