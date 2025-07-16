import Layout from "../../components/layout";
import Post from "../../components/post";
import SideBar from "../../components/sidebar";
import db from "../../config/db/index";
import BlogPost from "../../models/Post";
import readTime from "../../utils/read-time";
import { formatDate } from "../../utils/lib";
import Head from "next/head";
import Pagination from "../../components/Pagination";

export default function Life({ posts, tags, currentPage, totalPages }) {
  return (
    <div>
      <Layout active="life">
        <Head>
          <title>Life Stories - koalalikecode</title>
          <meta property="og:title" content="Life Stories - koalalikecode" />
          <meta
            name="description"
            content="Life Stories | koalalikecode personal blog"
          />
          <meta
            name="keywords"
            content="personal blog, blog, blog cá nhân, koalalikecode, life"
          />
          <meta
            property="og:description"
            content="Life Stories | koalalikecode personal blog"
          />
          <meta
            property="og:image"
            content="https://i.postimg.cc/Kj3xdQqQ/koalalikecode2.png"
          />
        </Head>
        <h2 className="text-3xl font-mon font-bold mt-5 mb-14 sm:mb-10">
          🎹 Life Stories
        </h2>
        <div className="grid grid-cols-3 gap-x-8 lg:grid-cols-1 lg:gap-x-0">
          <div className="col-span-2 lg:col-span-1 lg:order-2">
            {posts.map((post) => (
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
            ))}
            <Pagination currentPage={currentPage} totalPages={totalPages} />
          </div>

          <div className="">
            <SideBar tags={tags} />
          </div>
        </div>
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context) {
  await db.connect();
  const page = parseInt(context.query.page) || 1;
  const limit = 5;
  const skip = (page - 1) * limit;
  const totalPosts = await BlogPost.countDocuments({ categories: "life" });
  const totalPages = Math.ceil(totalPosts / limit);
  let posts = await BlogPost.find({ categories: "life" })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
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
      currentPage: page,
      totalPages,
    },
  };
}
