import Layout from "../components/layout";
import Post from "../components/post";
import SideBar from "../components/sidebar";
import db from "../config/db/index";
import BlogPost from "../models/Post";
import readTime from "../utils/read-time";
import { formatDate } from "../utils/lib";
import Head from "next/head";

export default function Home({ posts, tags }) {
  return (
    <div>
      <Layout active="home">
        <Head>
          <meta name="description" content="koalalikecode personal blog" />
          <meta
            name="keywords"
            content="personal blog, blog, blog cá nhân, koalalikecode"
          />
          <meta property="og:title" content="Blog | koalalikecode" />
          <meta
            property="og:description"
            content="koalalikecode personal blog"
          />
          <meta
            property="og:image"
            content="https://i.postimg.cc/Kj3xdQqQ/koalalikecode2.png"
          />
          <title>Blog | koalalikecode</title>
        </Head>
        <h2 className="text-3xl font-mon font-bold mt-5 mb-14 sm:mb-10">
          📖 Latest Articles
        </h2>
        <div className="grid grid-cols-3 gap-x-8 lg:grid-cols-1 lg:gap-x-0">
          <div className="col-span-2 lg:col-span-1 lg:order-2">
            {posts
              .map((post) => (
                <Post
                  key={post._id}
                  image={post.thumbnail}
                  title={post.title}
                  description={post.description}
                  time={formatDate(post.createdAt)}
                  read_duration={`${readTime(post.content)} min read`}
                  link={`/blogs/${post.slug}`}
                  tags={post.tags}
                />
              ))
              .reverse()}
          </div>

          <div className="">
            <SideBar tags={tags} />
          </div>
        </div>
      </Layout>
    </div>
  );
}

export async function getStaticProps() {
  await db.connect();
  let posts = await BlogPost.find();
  let tags = [];
  posts = JSON.parse(JSON.stringify(posts));
  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      if (!tags.includes(tag)) tags.push(tag);
    });
  });
  return {
    props: {
      posts,
      tags,
    },
    revalidate: 10,
  };
}
