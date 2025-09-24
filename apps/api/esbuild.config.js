import { build } from 'esbuild';
import { dependencies } from './package.json' assert { type: 'json' };

const external = [
  ...Object.keys(dependencies || {}), // all npm deps
  'node:events', // explicitly exclude node core module
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
  external, // <-- critical
}).catch(() => process.exit(1));
