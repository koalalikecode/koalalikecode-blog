import { getCollection, type CollectionEntry } from "astro:content";

export type Post = CollectionEntry<"blog">;

/**
 * Lấy toàn bộ bài viết đã xuất bản, mới nhất trước.
 * Bài draft bị loại ở production nhưng vẫn hiện khi chạy dev.
 */
export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection("blog", ({ data }) =>
    import.meta.env.PROD ? data.draft !== true : true
  );
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/** URL của bài viết. Giữ nguyên tiền tố /blogs/ của blog cũ để không mất SEO. */
export function postUrl(post: Post): string {
  return `/blogs/${post.data.slug}`;
}

/**
 * Ước lượng thời gian đọc.
 * Đếm cả từ tiếng Việt (tách theo khoảng trắng) lẫn ký tự CJK,
 * bỏ qua code block vì người đọc lướt code nhanh hơn văn xuôi.
 */
export function readingTime(markdown: string): number {
  const withoutCode = markdown.replace(/```[\s\S]*?```/g, "");
  const words = withoutCode.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/** Đếm số bài theo từng thẻ, sắp xếp nhiều nhất trước. */
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
 * Tìm bài liên quan dựa trên số thẻ trùng nhau.
 * Nếu không đủ bài cùng thẻ thì bù thêm bài mới nhất.
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
