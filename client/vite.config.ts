import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // your source code
      '@shared': path.resolve(__dirname, '../shared'), // shared folder
      '@assets': path.resolve(__dirname, '../attached_assets') // points to attached_assets folder
    }
  },
  base: '/'
});
