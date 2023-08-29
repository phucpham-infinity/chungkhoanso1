import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.includes("student-manager-wc"),
        },
      },
    }),
  ],
  build: {
    lib: {
      entry: "./src/pages/student-manager/index.ts",
      name: "student-manager-wc",
      fileName: "student-manager-wc",
    },
  },
  define: {
    "process.env": process.env,
  },
});
