import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/package/index.ts',
      name: 'johnny', 
      fileName: (format) => `johnny.${format}.js`,
      formats: ['es', 'cjs'], // ESM и CommonJS
    },
    rollupOptions: {
      external: [], //
    },
  },
  plugins: [dts()],
});
