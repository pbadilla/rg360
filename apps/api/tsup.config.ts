// tsup.config.ts
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],            // entry point to your API
  outDir: 'build',                    // output folder
  format: ['esm'],                    // use ESM since "type": "module"
  splitting: false,                   // disable code splitting (best for Node APIs)
  sourcemap: true,                    // useful for debugging
  clean: true,                        // clears /build before building
  target: 'node20',                   // or whatever Node version you're targeting
  shims: false,                       // keep polyfills off
  external: ['dotenv', 'fs', 'path'], // external dependencies
});
