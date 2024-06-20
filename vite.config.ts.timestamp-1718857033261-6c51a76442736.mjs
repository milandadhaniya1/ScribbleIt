// vite.config.ts
import { defineConfig } from "file:///C:/xampp/htdocs/learn/ScribbleIt/node_modules/.pnpm/vite@5.2.0_@types+node@20.14.0/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/xampp/htdocs/learn/ScribbleIt/node_modules/.pnpm/@vitejs+plugin-vue@5.0.4_vite@5.2.0_vue@3.4.21/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import Pages from "file:///C:/xampp/htdocs/learn/ScribbleIt/node_modules/.pnpm/vite-plugin-pages@0.32.2_vite@5.2.0_vue-router@4.3.2/node_modules/vite-plugin-pages/dist/index.js";
import path from "path";
var __vite_injected_original_dirname = "C:\\xampp\\htdocs\\learn\\ScribbleIt";
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./"),
      "@public": path.resolve(__vite_injected_original_dirname, "./public"),
      "@src": path.resolve(__vite_injected_original_dirname, "./src"),
      "@store": path.resolve(__vite_injected_original_dirname, "./store"),
      "@server": path.resolve(__vite_injected_original_dirname, "./server"),
      "@utils": path.resolve(__vite_injected_original_dirname, "./utils")
    }
  },
  plugins: [
    vue(),
    Pages({
      dirs: "src/pages",
      extensions: ["vue", "ts"]
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFx4YW1wcFxcXFxodGRvY3NcXFxcbGVhcm5cXFxcU2NyaWJibGVJdFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxceGFtcHBcXFxcaHRkb2NzXFxcXGxlYXJuXFxcXFNjcmliYmxlSXRcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L3hhbXBwL2h0ZG9jcy9sZWFybi9TY3JpYmJsZUl0L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJztcclxuaW1wb3J0IFBhZ2VzIGZyb20gJ3ZpdGUtcGx1Z2luLXBhZ2VzJztcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgICdAJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vJyksXHJcbiAgICAgICdAcHVibGljJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vcHVibGljJyksXHJcbiAgICAgICdAc3JjJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjJyksXHJcbiAgICAgICdAc3RvcmUnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zdG9yZScpLFxyXG4gICAgICAnQHNlcnZlcic6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NlcnZlcicpLFxyXG4gICAgICAnQHV0aWxzJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vdXRpbHMnKVxyXG4gICAgfSxcclxuICB9LFxyXG4gIHBsdWdpbnM6IFtcclxuICAgIHZ1ZSgpLFxyXG4gICAgUGFnZXMoe1xyXG4gICAgICBkaXJzOiAnc3JjL3BhZ2VzJyxcclxuICAgICAgZXh0ZW5zaW9uczogWyd2dWUnLCAndHMnXVxyXG4gICAgfSlcclxuICBdXHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTRSLFNBQVMsb0JBQW9CO0FBQ3pULE9BQU8sU0FBUztBQUNoQixPQUFPLFdBQVc7QUFDbEIsT0FBTyxVQUFVO0FBSGpCLElBQU0sbUNBQW1DO0FBS3pDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLElBQUk7QUFBQSxNQUNqQyxXQUFXLEtBQUssUUFBUSxrQ0FBVyxVQUFVO0FBQUEsTUFDN0MsUUFBUSxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLE1BQ3ZDLFVBQVUsS0FBSyxRQUFRLGtDQUFXLFNBQVM7QUFBQSxNQUMzQyxXQUFXLEtBQUssUUFBUSxrQ0FBVyxVQUFVO0FBQUEsTUFDN0MsVUFBVSxLQUFLLFFBQVEsa0NBQVcsU0FBUztBQUFBLElBQzdDO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLElBQ0osTUFBTTtBQUFBLE1BQ0osTUFBTTtBQUFBLE1BQ04sWUFBWSxDQUFDLE9BQU8sSUFBSTtBQUFBLElBQzFCLENBQUM7QUFBQSxFQUNIO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
