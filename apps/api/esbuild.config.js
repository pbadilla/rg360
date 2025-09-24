import { build } from 'esbuild';
import { builtinModules } from 'node:module';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const pkg = require('./package.json');

const externals = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.devDependencies || {}),
  ...builtinModules,
  ...builtinModules.map(m => `node:${m}`),
  'node-fetch' // force keep it external
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
  logLevel: 'info'
});
