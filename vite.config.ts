import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Pages from 'vite-plugin-pages';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, './src'),
      '@store': path.resolve(__dirname, './store'),
      '@server': path.resolve(__dirname, './server')
    },
  },
  plugins: [
    vue(),
    Pages({
      dirs: 'src/pages',
      extensions: ['vue', 'ts']
    })
  ]
});
