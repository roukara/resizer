import { defineConfig } from "vite";
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/Resizer.ts'),
      name: 'Resizer',
      fileName: 'resizer'
    }
  }
});