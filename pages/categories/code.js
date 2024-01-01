import Layout from "../../components/layout";
import Post from "../../components/post";
import SideBar from "../../components/sidebar";
import db from "../../config/db/index";
import BlogPost from "../../models/Post";
import readTime from "../../utils/read-time";
import { formatDate } from "../../utils/lib";
import Head from "next/head";

export default function Code({ posts, tags }) {
  return (
    <div>
      <Layout active="code">
        <Head>
          <title>Coding Posts - koalalikecode</title>
        </Head>
        <h2 className="text-3xl font-mon font-bold mt-5 mb-14 sm:mb-10">
          👨‍💻 Coding Posts
        </h2>
        <div className="grid grid-cols-3 gap-x-8 lg:grid-cols-none lg:gap-x-0">
          <div className="col-span-2 lg:order-2">
            {posts
              .map((post) => (
                <Post
                  key={post._id}
                  image={post.thumbnail}
                  title={post.title}
                  description={post.description}
                  time={formatDate(post.createdAt)}
                  read_duration={`${readTime(post.content)} phút đọc`}
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
  let posts = await BlogPost.find({ categories: "code" });
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
