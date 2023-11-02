import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import UnoCSS from "unocss/vite";
import legacy from "@vitejs/plugin-legacy";
// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
    vue(),
    vueJsx(),
    UnoCSS(),
    legacy({
      targets: ["defaults", "not IE 11"]
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  },
  server: {
    port: 8086,
    host: "0.0.0.0",
    proxy: {
      "/api": {
        target: "http://192.168.22.104:9000/",
        ws: true, // 是否启用websockets,
        // changeOrigin: true
        rewrite: path => path.replace(/^\/api/, "")
      }
    }
  }
});
