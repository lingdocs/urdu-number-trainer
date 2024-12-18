import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*"],
      },
      // add this to cache all the
      // static assets in the public folder
      includeAssets: ["**/*"],
      manifest: {
        name: "Urdu Number Trainer",
        short_name: "Number Trainer",
        icons: [
          {
            src: "/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        screenshots: [
          {
            src: "screenshots/phone-screenshot.png",
            sizes: "720x1482",
            type: "image/png",
            label: "Screen shot showing a number for review",
          },
          {
            src: "screenshots/desktop-screenshot.png",
            sizes: "1280x720",
            type: "image/png",
            form_factor: "wide",
            label: "Screen shot showing a number for review",
          },
        ],
        theme_color: "#fcfcfc",
        background_color: "#fcfcfc",
        display: "standalone",
      },
    }),
  ],
});
