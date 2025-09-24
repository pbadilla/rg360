import { build } from 'esbuild';

build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  platform: 'node',
  format: 'esm',
  outfile: 'build/index.js',
  sourcemap: true,
  tsconfig: 'tsconfig.json',
}).catch(() => process.exit(1));
