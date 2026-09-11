import { getCollection, type CollectionEntry } from "astro:content";

export type Post = CollectionEntry<"blog">;

/**
 * Every published post, newest first.
 * Drafts are excluded from production builds but still show up in dev.
 */
export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection("blog", ({ data }) =>
    import.meta.env.PROD ? data.draft !== true : true
  );
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/** Post URL. Keeps the old blog's /blogs/ prefix so existing links and SEO survive. */
export function postUrl(post: Post): string {
  return `/blogs/${post.data.slug}`;
}

/**
 * Rough reading time.
 * Counts whitespace-separated words and skips fenced code blocks,
 * since readers skim code faster than prose.
 */
export function readingTime(markdown: string): number {
  const withoutCode = markdown.replace(/```[\s\S]*?```/g, "");
  const words = withoutCode.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/** Post count per tag, most used first. */
export async function getTagCounts(): Promise<{ tag: string; count: number }[]> {
  const posts = await getPublishedPosts();
  const counts = new Map<string, number>();

  for (const post of posts) {
    for (const tag of post.data.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

/**
 * Related posts ranked by how many tags they share with the current one.
 * Falls back to the most recent posts when there aren't enough tag matches.
 */
export function getRelatedPosts(current: Post, all: Post[], limit = 3): Post[] {
  const currentTags = new Set(current.data.tags);

  const scored = all
    .filter((p) => p.id !== current.id)
    .map((p) => ({
      post: p,
      score: p.data.tags.filter((t) => currentTags.has(t)).length,
    }))
    .sort(
      (a, b) =>
        b.score - a.score || b.post.data.pubDate.valueOf() - a.post.data.pubDate.valueOf()
    );

  return scored.slice(0, limit).map((s) => s.post);
}
