import { defineConfig } from 'tsup'
export default defineConfig({
  entry: ['src/index.ts', 'src/printer.ts'],
  format: ['esm'],
  dts: true,
  clean: true,
  sourcemap: true,
  target: 'es2022',
  external: ['react', 'react-dom', '@vibestartup/sdk-runtime', '@vibestartup/thing'],
})
