import Layout from "../../components/layout";
import Head from "next/head";
import Image from "next/image";
import { BiTimeFive } from "react-icons/bi";
import { VscSymbolKeyword } from "react-icons/vsc";
import { AiOutlineArrowUp } from "react-icons/ai";
import postStyles from "../../styles/post_body.module.css";
import { marked } from "marked";
import Post2 from "../../components/post_2";
import Post from "../../models/Post";
import db from "../../config/db/index";
import readTime from "../../utils/read-time";
import { formatDate } from "../../utils/lib";
import { useState, useEffect } from "react";
import Tag from "../../components/tag";
import parse from "html-react-parser";
import CommentSection from "../../components/CommentSection";
import Button from "../../components/ui/Button";

export default function BlogPost({ postData, relatedDatas }) {
  const content = postData.content;
  const contentHtml = parse(marked(content));
  const [toc, setToc] = useState([]);
  const [windowOffSetY, setWindowOffSetY] = useState(0);
  const [readProgress, setReadProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  function getHeadingList(elements) {
    const list = [];
    elements.forEach((element) => {
      if (element.tagName == "H2") {
        list.push({
          title: element.innerHTML,
          id: element.getAttribute("id"),
          items: [],
        });
      } else if (element.tagName == "H3") {
        if (!list.length) {
          list.push({
            title: "Overview",
            id: element.getAttribute("id"),
            items: [],
          });
        } else {
          list[list.length - 1].items.push({
            title: element.innerHTML,
            id: element.getAttribute("id"),
          });
        }
      }
    });
    return list;
  }

  function checkFirstPositionHeading(heading, index, array) {
    const currentPosition = windowOffSetY + 200;
    const curElementPosition = document.getElementById(heading.id).offsetTop;
    const nextElementPositionCheck = array[index + 1]
      ? currentPosition < document.getElementById(array[index + 1].id).offsetTop
      : true;

    return currentPosition >= curElementPosition && nextElementPositionCheck;
  }

  function checkChildPositionHeading(heading, index, parent, parentIndex) {
    const currentPosition = windowOffSetY + 200;
    const curElementPosition = document.getElementById(heading.id).offsetTop;

    const nextElementPositionCheck = parent[index + 1]
      ? currentPosition <
        document.getElementById(parent[index + 1].id).offsetTop
      : true;
    const nextParentElementPositionCheck = toc[parentIndex + 1]
      ? currentPosition <
        document.getElementById(toc[parentIndex + 1].id).offsetTop
      : true;

    return (
      currentPosition >= curElementPosition &&
      nextElementPositionCheck &&
      nextParentElementPositionCheck
    );
  }

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll(".post-body h2, .post-body h3")
    );
    let heading2Count = 0,
      heading3Count = 0;
    elements.forEach((element) => {
      if (element.tagName == "H2") {
        heading2Count++;
        element.setAttribute("id", `heading2-${heading2Count}`);
      } else if (element.tagName == "H3") {
        heading3Count++;
        element.setAttribute("id", `heading3-${heading3Count}`);
      }
    });
    setToc(getHeadingList(elements));
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const currentOffsetY = window.scrollY;
      setWindowOffSetY(currentOffsetY);
      const article = document.querySelector(".post-body");
      if (!article) return;
      const start = article.offsetTop;
      const articleHeight = article.offsetHeight;
      const viewport = window.innerHeight;
      const distance = Math.max(articleHeight - viewport, 1);
      const percentage = Math.min(
        100,
        Math.max(0, ((currentOffsetY - start) / distance) * 100)
      );
      setReadProgress(percentage);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const copyPostLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      setCopied(false);
    }
  };

  const categoryLabel =
    postData.categories === "code"
      ? "Coding"
      : postData.categories === "life"
      ? "Life Stories"
      : postData.categories;

  return (
    <Layout>
      {/* Read progress bar */}
      <div
        className="fixed top-[52px] left-0 z-20 h-[3px] bg-gradient-to-r from-blue-500 to-violet-500 transition-all duration-200"
        style={{ width: `${readProgress}%` }}
        aria-hidden="true"
      />
      <Head>
        <title>{postData.title}</title>
        <meta property="og:title" content={postData.title} />
        <meta name="keywords" content={postData.title} />
        <meta name="description" content={postData.description} />
        <meta property="og:description" content={postData.description} />
        <meta property="og:image" content={postData.thumbnail} />
      </Head>
      <section className="grid grid-cols-3 gap-x-12 lg:block mt-10">
        <div className="col-span-2">
          {/* Category badge */}
          {categoryLabel && (
            <span className="inline-block mb-3 text-xs font-semibold uppercase tracking-wider text-blue-550 bg-blue-500/10 px-3 py-1 rounded-full">
              {categoryLabel}
            </span>
          )}

          <h1 className="text-4xl font-bold md:text-3xl">{postData.title}</h1>
          <div className="flex mb-5 mt-2 gap-3 flex-wrap">
            <span className="flex items-center gap-1 bg-surface rounded-full px-3 py-1 text-xs text-muted border border-border">
              <BiTimeFive />
              {formatDate(postData.createdAt)}
            </span>
            <span className="flex items-center gap-1 bg-surface rounded-full px-3 py-1 text-xs text-muted border border-border">
              <VscSymbolKeyword />
              {readTime(postData.content)} min read
            </span>
          </div>
          <div className="mb-5 flex gap-2">
            <Button
              onClick={copyPostLink}
              variant="outline"
              className="px-3 py-1 text-xs rounded-full"
            >
              {copied ? "Copied!" : "Copy link"}
            </Button>
            <Button
              onClick={() => window.print()}
              variant="outline"
              className="px-3 py-1 text-xs rounded-full"
            >
              Print
            </Button>
          </div>

          {/* Thumbnail */}
          <div className="w-full rounded-2xl overflow-hidden shadow-md">
            <Image
              src={postData.thumbnail}
              width={800}
              height={600}
              style={{
                width: "100%",
                height: "auto",
              }}
              quality={100}
              unoptimized={true}
              priority
              alt={postData.title}
            />
          </div>

          <div
            className={`${postStyles.post_body} post-body`}
          >
            {contentHtml}
          </div>

          {/* Mobile TOC */}
          <details className="hidden lg:block mt-6 border border-border rounded-xl p-4 dark:border-slate-700">
            <summary className="cursor-pointer font-semibold text-slate-700 dark:text-slate-100 text-sm">
              Table of contents
            </summary>
            <ul className="mt-3">
              {toc.map((h2Heading) => (
                <li className="mb-2" key={h2Heading.id}>
                  <a
                    className="text-blue-550 hover:underline text-sm"
                    href={`#${h2Heading.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(`#${h2Heading.id}`).scrollIntoView({
                        behavior: "smooth",
                      });
                    }}
                  >
                    {h2Heading.title}
                  </a>
                </li>
              ))}
            </ul>
          </details>

          {/* Tags at bottom */}
          <div className="mt-6 py-6 border-t border-border flex items-center gap-3 flex-wrap">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted">
              Tagged:
            </span>
            {postData.tags.map((tag) => (
              <Tag tag={tag} link={`/tags/${tag}`} key={tag} />
            ))}
          </div>
        </div>

        {/* Desktop TOC */}
        <div className="lg:hidden pb-28 pl-8">
          <div className="sticky top-20">
            <div className="flex items-center gap-2 mb-4 pl-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted">
                On this page
              </p>
            </div>
            <ul className="pl-4 border-l border-border">
              {toc.map((h2Heading, index) => (
                <li className="" key={h2Heading.id}>
                  <a
                    className={`block leading-7 after:rounded relative after:absolute after:w-0 after:top-6 after:h-0.5 hover:after:bg-gradient-to-r from-blue-500 to-purple-500 after:left-0 after:transition-width hover:after:w-full after:duration-300 hover:text-blue-550 text-sm ${
                      checkFirstPositionHeading(h2Heading, index, toc)
                        ? "text-blue-550 font-medium"
                        : ""
                    }`}
                    href={`#${h2Heading.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(`#${h2Heading.id}`).scrollIntoView({
                        behavior: "smooth",
                      });
                    }}
                  >
                    {h2Heading.title}
                  </a>
                  {h2Heading.items.length > 0 && (
                    <ul className="ml-4">
                      {h2Heading.items.map((child, childIndex) => (
                        <li
                          className={`after:rounded relative after:absolute after:w-0 after:bottom-0 after:h-0.5 hover:after:bg-gradient-to-r from-blue-500 to-purple-500 after:left-0 after:transition-width hover:after:w-full after:duration-300 hover:text-purple-500 ${
                            checkChildPositionHeading(
                              child,
                              childIndex,
                              h2Heading.items,
                              index
                            )
                              ? "text-purple-500"
                              : ""
                          }`}
                          key={child.id}
                        >
                          <a
                            className="leading-7 text-sm"
                            href={`#${child.id}`}
                            onClick={(e) => {
                              e.preventDefault();
                              document
                                .querySelector(`#${child.id}`)
                                .scrollIntoView({
                                  behavior: "smooth",
                                });
                            }}
                          >
                            {child.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Related posts */}
      {relatedDatas.length > 0 && (
        <section className="mt-10 sm:mt-5">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-1 h-6 rounded-full bg-gradient-to-b from-blue-500 to-violet-500 flex-shrink-0" />
            <h2 className="font-bold text-xl font-mon">Related Posts</h2>
          </div>
          <div className="related-post overflow-x-auto flex">
            {relatedDatas.map((relatedData) => (
              <Post2
                key={relatedData._id}
                image={relatedData.thumbnail}
                title={relatedData.title}
                time={formatDate(relatedData.createdAt)}
                read_duration={`${readTime(relatedData.content)} min read`}
                link={`/blogs/${relatedData.slug}`}
              />
            ))}
          </div>
        </section>
      )}
      {!relatedDatas.length && (
        <p className="mt-8 text-sm text-muted">
          No related posts found yet. Explore the latest posts on the homepage.
        </p>
      )}

      <CommentSection postId={postData._id} />

      {/* Back to top button */}
      {windowOffSetY > 300 && (
        <button
          type="button"
          className="fixed bottom-6 right-6 z-20 w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 text-white shadow-lg flex items-center justify-center hover:brightness-110 transition"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
        >
          <AiOutlineArrowUp className="text-lg" />
        </button>
      )}
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  await db.connect();
  let postData = await Post.findOne({ slug: params.id });
  if (!postData) {
    return {
      notFound: true,
      revalidate: 10,
    };
  }
  postData = JSON.parse(JSON.stringify(postData));
  let relatedDatas = await Post.find({
    tags: { $in: postData.tags },
    slug: { $ne: postData.slug },
  }).sort({ createdAt: -1 });
  relatedDatas = JSON.parse(JSON.stringify(relatedDatas));
  return {
    props: {
      postData,
      relatedDatas,
    },
  };
}

export async function getStaticPaths() {
  await db.connect();
  let posts = await Post.find();
  posts = JSON.parse(JSON.stringify(posts));
  const paths = posts.map((post) => {
    return {
      params: {
        id: post.slug,
      },
    };
  });
  return {
    paths,
    fallback: "blocking",
  };
}
