import { build } from 'esbuild';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { dependencies } = require('./package.json');

import { builtinModules } from 'node:module';

const external = [
  ...Object.keys(dependencies || {}), // all npm deps
  ...builtinModules,                  // Node built-ins like fs, path, events
  ...builtinModules.map(m => `node:${m}`), // Node’s "node:" prefix variants
];

build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  platform: 'node',
  format: 'esm',
  target: 'node22',
  outfile: 'build/index.js',
  sourcemap: true,
  tsconfig: 'tsconfig.json',
  external, // mark deps and core modules external
}).catch(() => process.exit(1));
