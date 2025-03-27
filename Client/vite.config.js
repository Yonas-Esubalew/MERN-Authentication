import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: "classic", // Only add this if you're using React 16 or lower
    }),
  ],
  build: {
    rollupOptions: {
      // Remove any external: ['react/jsx-runtime'] if present
    },
  },
});
