/**
 * Site-wide configuration.
 * Change SITE_URL to the real domain before deploying to production.
 */
export const SITE_URL = "https://koalalikecode.duykhanhchi1993.workers.dev";

export const SITE_TITLE = "koalalikecode";
export const SITE_DESCRIPTION =
  "Notes on web development, system design and things worth writing down.";

export const AUTHOR = {
  name: "Duy Nguyen",
  handle: "koalalikecode",
};

export const SOCIALS = [
  { label: "GitHub", href: "https://github.com/koalalikecode" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/duy-nguyen-97845a217/" },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=100041242865819" },
  { label: "RSS", href: "/rss.xml" },
];

export const NAV_LINKS = [
  { label: "Posts", href: "/" },
  { label: "Tags", href: "/tags/" },
];

/** Posts per page in listings */
export const POSTS_PER_PAGE = 10;
