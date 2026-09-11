import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  // Content Layer API: nạp mọi file .md/.mdx trong src/content/blog
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),

  // image() cho phép Astro tối ưu ảnh hero (resize, webp, chống layout shift)
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),

      // Giữ nguyên slug từ blog cũ để URL /blogs/<slug> không đổi
      slug: z.string(),

      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),

      heroImage: image().optional(),

      tags: z.array(z.string()).default([]),
      categories: z.array(z.string()).default([]),

      // _id cũ trong MongoDB, giữ lại để đối chiếu comment cũ khi cần
      legacyId: z.string().optional(),

      // Bài nháp sẽ không xuất hiện ở production
      draft: z.boolean().default(false),
    }),
});

export const collections = { blog };
