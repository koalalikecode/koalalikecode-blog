# koalalikecode blog

Blog cá nhân, xây bằng [Astro](https://astro.build). Nội dung là file Markdown nằm trong repo, build ra HTML tĩnh hoàn toàn.

## Công nghệ

| Lớp | Công nghệ |
| --- | --- |
| Framework | Astro 7 (static, 0 KB JS mặc định) |
| Ngôn ngữ | TypeScript strict |
| Nội dung | Content Collections + Markdown/MDX, schema kiểm bằng Zod |
| CSS | Tailwind CSS v4 (cấu hình bằng CSS, không cần file JS) |
| Code block | Expressive Code (Shiki) — tô màu lúc build |
| Tìm kiếm | Pagefind — chỉ mục tĩnh, không cần backend |
| Bình luận | Giscus (GitHub Discussions) |
| SEO | sitemap, RSS, JSON-LD, canonical, OG |

## Chạy local

```bash
npm install
npm run dev          # http://localhost:4321
```

| Lệnh | Việc |
| --- | --- |
| `npm run dev` | Chạy dev server |
| `npm run build` | Build ra `dist/` rồi tạo chỉ mục tìm kiếm |
| `npm run preview` | Xem thử bản build (cần bước này để test tìm kiếm) |
| `npm run check` | Kiểm tra TypeScript và template Astro |

> Tìm kiếm chỉ hoạt động sau `npm run build`, vì chỉ mục Pagefind được tạo lúc build. Ở `npm run dev` trang tìm kiếm sẽ báo chưa có chỉ mục.

## Viết bài mới

Tạo file trong `src/content/blog/`:

```markdown
---
title: "Tiêu đề bài viết"
description: "Mô tả ngắn, hiển thị ở danh sách và thẻ OG."
slug: "duong-dan-bai-viet"
pubDate: 2026-09-11
tags: ["javascript", "frontend"]
categories: ["code"]
heroImage: "./ten-anh.png"   # đặt ảnh cùng thư mục src/assets/blog/
draft: false
---

Nội dung viết bằng Markdown.
```

Bài có `draft: true` hiện khi chạy dev nhưng bị loại khỏi bản production.

Ảnh để trong `src/assets/blog/` và tham chiếu bằng đường dẫn tương đối — Astro sẽ tự resize, chuyển định dạng và chống layout shift.

### Vì sao dùng `.md` chứ không phải `.mdx`

Nội dung migrate từ blog cũ có thẻ `<br>` không tự đóng nằm ngoài code block. MDX coi HTML là JSX nên sẽ lỗi build. File `.mdx` vẫn dùng được cho bài mới nếu cần nhúng component.

## Cấu trúc

```
src/
  assets/blog/       ảnh bài viết (Astro tối ưu lúc build)
  components/        component dùng chung
  content/blog/      bài viết (.md)
  layouts/           khung trang
  lib/posts.ts       truy vấn bài viết, reading time, bài liên quan
  pages/             route
  styles/global.css  design token và kiểu chữ bài viết
  consts.ts          cấu hình site — đổi SITE_URL trước khi deploy
migration/           lưu trữ dữ liệu từ blog cũ (MongoDB)
```

## Việc cần làm trước khi deploy

1. Đổi `SITE_URL` trong `src/consts.ts` sang domain thật
2. Cập nhật `Sitemap:` trong `public/robots.txt` cho khớp
3. Bật Discussions trên GitHub, cài [Giscus app](https://github.com/apps/giscus), điền `repoId` và `categoryId` vào `src/components/Comments.astro`
4. Thêm ảnh OG mặc định tại `public/og-default.png`

## Lịch sử

Bản Next.js 14 + MongoDB cũ được lưu ở tag `v1-nextjs`. Nội dung đã migrate sang Markdown; xem `migration/` để đối chiếu dữ liệu gốc.
