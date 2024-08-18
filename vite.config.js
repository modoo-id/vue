import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/components/index.js"),
      name: "ModooVueComponents",
      fileName: "modoo-vue-components",
    },
  },
});
