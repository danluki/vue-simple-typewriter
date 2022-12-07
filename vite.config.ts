// import { fileURLToPath, URL } from 'node:url'

// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue()],
//   resolve: {
//     alias: {
//       '@': fileURLToPath(new URL('./src', import.meta.url))
//     }
//   }
// })

import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/components/index.ts"),
      name: "vue-simple-typewriter",
      formats: ["es"],
      fileName: (format) => `vue-simple-typewriter.${format}.js`,
    },
    rollupOptions: {
      external: ["vue", /primevue\/.+/],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
    emptyOutDir: false,
  },

  plugins: [vue()],
});
