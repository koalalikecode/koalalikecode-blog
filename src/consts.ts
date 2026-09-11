/**
 * Cấu hình tập trung cho toàn site.
 * Đổi SITE_URL sang domain thật trước khi deploy production.
 */
export const SITE_URL = "https://koalalikecode.pages.dev";

export const SITE_TITLE = "koalalikecode";
export const SITE_DESCRIPTION =
  "Blog cá nhân về lập trình web, system design và những thứ tôi học được trên đường đi.";

export const AUTHOR = {
  name: "Duy Nguyễn",
  handle: "koalalikecode",
  bio: "Tôi viết về phát triển web, lập trình và cuộc sống. Ghi lại những gì mình học và xây dựng.",
};

export const SOCIALS = [
  { label: "GitHub", href: "https://github.com/koalalikecode" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/duy-nguyen-97845a217/" },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=100041242865819" },
  { label: "RSS", href: "/rss.xml" },
];

export const NAV_LINKS = [
  { label: "Bài viết", href: "/" },
  { label: "Thẻ", href: "/tags" },
  { label: "Giới thiệu", href: "/about" },
];

/** Số bài mỗi trang ở danh sách */
export const POSTS_PER_PAGE = 10;
