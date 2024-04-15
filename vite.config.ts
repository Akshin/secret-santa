import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import { svgSpritemap } from "vite-plugin-svg-spritemap";

const DEFAULT_OPTIONS = {
  test: /\.(jpe?g|png|gif|tiff|webp|svg|avif)$/i,
  includePublic: false,
  png: {
    // https://sharp.pixelplumbing.com/api-output#png
    quality: 100
  }
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ViteImageOptimizer(DEFAULT_OPTIONS),
    svgSpritemap({
      pattern: "src/assets/icons/*.svg",
      filename: "sprite.svg",
      svgo: false
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@/styles/mixins" as *;'
      }
    }
  }
});
