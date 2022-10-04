import Layout from "../components/layout";
import Post from "../components/post";
import SideBar from "../components/sidebar";
import db from "../config/db/index";
import BlogPost from "../models/Post";
import readTime from "../utils/read-time";
import { formatDate } from "../utils/lib";

export default function Home({ posts, tags, searchStr }) {
  return (
    <div>
      <Layout active="home">
        <h2 className="text-3xl font-mon font-bold mt-5 mb-14 sm:mb-10">
          🔍 Search Results for: {searchStr}
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

export async function getServerSideProps(context) {
  await db.connect();
  let searchStr = context.query.search;
  let searchPosts = await BlogPost.find({
    title: { $regex: searchStr, $options: "i" },
  });
  let posts = await BlogPost.find();
  let tags = [];
  searchPosts = JSON.parse(JSON.stringify(searchPosts));
  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      if (!tags.includes(tag)) tags.push(tag);
    });
  });
  return {
    props: {
      posts: searchPosts,
      tags,
      searchStr,
    },
  };
}
