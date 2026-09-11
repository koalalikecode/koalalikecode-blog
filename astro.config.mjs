// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import expressiveCode from "astro-expressive-code";
import tailwindcss from "@tailwindcss/vite";

import { SITE_URL } from "./src/consts.ts";

export default defineConfig({
  site: SITE_URL,

  // Fully static build - nothing runs on the server when a visitor loads a page
  output: "static",

  integrations: [
    // expressiveCode must come before mdx so it picks up code blocks in .mdx files
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
    // Code blocks are handled by expressiveCode
    syntaxHighlight: false,
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
