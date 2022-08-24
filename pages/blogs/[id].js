import Layout from "../../components/layout";
import Head from "next/head";
import Image from "next/image";
import { BiTimeFive } from "react-icons/bi";
import { VscSymbolKeyword } from "react-icons/vsc";
import { marked } from "marked";
import postStyles from "../../styles/post_body.module.css";
import Post2 from "../../components/post_2";
import Post from "../../models/Post";
import db from "../../config/db/index";
import readTime from "../../utils/read-time";
import { formatDate } from "../../utils/lib"
import { useState, useEffect } from "react";

export default function BlogPost({ postData, relatedDatas }) {
  const intro = postData.content;
  const [toc, setToc] = useState([]);

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
        list[list.length - 1].items.push({
          title: element.innerHTML,
          id: element.getAttribute("id"),
        });
      }
    });
    return list;
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
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <section className="grid grid-cols-3 gap-x-12 lg:block mt-10">
        <div className="col-span-2">
          <h1 className="text-4xl font-bold md:text-3xl">{postData.title}</h1>
          <div className="flex mb-5 mt-2">
            <span className="flex items-center mr-4 opacity-70">
              <BiTimeFive className="mr-1" />
              {formatDate(postData.createdAt)}
            </span>
            <span className="flex items-center opacity-70">
              <VscSymbolKeyword className="mr-1" />
              {readTime(postData.content)} phút đọc
            </span>
          </div>
          <div className="w-full">
            <Image
              src="https://i.postimg.cc/PrXv9R9b/HTML-thumbnail.png"
              width={144}
              height={80}
              layout="responsive"
              alt="thumbnail"
            ></Image>
          </div>
          <div
            className={`${postStyles.post_body} post-body`}
            dangerouslySetInnerHTML={{ __html: marked.parse(intro) }}
          />
          <div className="mt-5 py-8 sm:py-4">
            {postData.tags.map((tag) => (
            <a
              key=""
              href="#"
              className="rounded-md px-3 py-1 mr-2 bg-gray-100 text-gray-500 hover:bg-blue-50 hover:text-blue-550 ease-in duration-300"
            >
              {tag}
            </a>

            ))}
          </div>
        </div>
        <div className="lg:hidden pb-28 pl-8">
          <ul className="sticky top-20 pl-4 border-l border-gray-200">
            {toc.map((h2Heading) => (
              <li className="" key={h2Heading.id}>
                <a
                  className="block leading-7 after:rounded relative after:absolute after:w-0 after:top-6 after:h-1 hover:after:bg-gradient-to-r from-blue-500 to-purple-500 after:left-0 after:transition-width hover:after:w-full after:duration-300 hover:text-blue-550"
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
                  <ul className="ml-5">
                    {h2Heading.items.map((child) => (
                      <li
                        className="after:rounded relative after:absolute after:w-0 after:bottom-0 after:h-1 hover:after:bg-gradient-to-r from-blue-500 to-purple-500 after:left-0 after:transition-width hover:after:w-full after:duration-300 hover:text-purple-500"
                        key={child.id}
                      >
                        <a
                          className="leading-7"
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
      </section>
      <section className="mt-10 sm:mt-5">
        <h2 className="font-bold text-xl py-5">Bài viết liên quan</h2>
        <div className="related-post overflow-x-auto flex">
          {relatedDatas
            .map((relatedData) => (
              <Post2
                key={relatedData._id}
                image={relatedData.thumbnail}
                title={relatedData.title}
                time={formatDate(relatedData.createdAt)}
                read_duration={`${readTime(relatedData.content)} phút đọc`}
                link={`/blogs/${relatedData.slug}`}
              />
            ))
            .reverse()}
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  await db.connect();
  let postData = await Post.findOne({ slug: params.id });
  postData = JSON.parse(JSON.stringify(postData));
  let relatedDatas = await Post.find({
    tags: { $in: postData.tags },
    slug: { $ne: postData.slug },
  });
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
