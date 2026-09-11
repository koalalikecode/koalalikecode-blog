// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import expressiveCode from "astro-expressive-code";
import tailwindcss from "@tailwindcss/vite";

import { SITE_URL } from "./src/consts.ts";

export default defineConfig({
  site: SITE_URL,

  // Toàn bộ site build tĩnh - không có server chạy lúc user truy cập
  output: "static",

  integrations: [
    // expressiveCode phải đứng trước mdx để bắt được code block trong file .mdx
    expressiveCode({
      themes: ["github-dark-dimmed", "github-light"],
      themeCssSelector: (theme) =>
        theme.name === "github-light" ? '[data-theme="light"]' : '[data-theme="dark"]',
      styleOverrides: {
        borderRadius: "0.5rem",
        borderWidth: "1px",
        codeFontSize: "0.85rem",
        codeLineHeight: "1.7",
        frames: {
          shadowColor: "transparent",
        },
      },
      defaultProps: {
        wrap: true,
      },
    }),
    mdx(),
    sitemap(),
  ],

  markdown: {
    // Code block đã do expressiveCode xử lý
    syntaxHighlight: false,
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
