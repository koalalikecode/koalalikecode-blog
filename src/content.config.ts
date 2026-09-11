import { defineCollection } from "astro:content";
import { z } from "zod";
import { glob } from "astro/loaders";

const blog = defineCollection({
  // Content Layer API: load every .md/.mdx file under src/content/blog
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),

  // image() lets Astro optimise the hero image (resize, webp, no layout shift)
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),

      // Carried over from the old blog so /blogs/<slug> URLs stay identical
      slug: z.string(),

      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),

      heroImage: image().optional(),

      tags: z.array(z.string()).default([]),
      categories: z.array(z.string()).default([]),

      // Old MongoDB _id, kept for cross-referencing the archived comments
      legacyId: z.string().optional(),

      // Drafts are hidden from production builds
      draft: z.boolean().default(false),
    }),
});

export const collections = { blog };
