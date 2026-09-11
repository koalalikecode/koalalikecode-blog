import Layout from "../components/layout";
import Post from "../components/post";
import SideBar from "../components/sidebar";
import db from "../config/db/index";
import BlogPost from "../models/Post";
import readTime from "../utils/read-time";
import { formatDate } from "../utils/lib";
import SearchBar from "../components/ui/SearchBar";
import EmptyState from "../components/ui/EmptyState";
import ErrorState from "../components/ui/ErrorState";

export default function Home({ posts, tags, searchStr, hasError = false }) {
  return (
    <div>
      <Layout active="search">
        <div className="ui-card p-6 mt-6 mb-8 bg-gradient-to-r from-blue-500/5 to-violet-500/5 border-blue-500/20">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-1 h-7 rounded-full bg-gradient-to-b from-blue-500 to-violet-500 flex-shrink-0" />
            <h1 className="text-2xl font-bold font-mon">
              {searchStr ? `Results for "${searchStr}"` : "Search"}
            </h1>
          </div>
          {searchStr && (
            <p className="text-muted text-sm ml-4">
              Showing articles matching your query.
            </p>
          )}
        </div>
        <SearchBar initialValue={searchStr || ""} />
        <div className="grid grid-cols-3 gap-x-8 lg:grid-cols-1 lg:gap-x-0">
          <div className="col-span-2 lg:col-span-1 lg:order-2 mt-6">
            {hasError ? (
              <ErrorState description="Search is temporarily unavailable." />
            ) : posts.length === 0 ? (
              <EmptyState
                title="No results found"
                description="Try a different keyword or browse categories."
                actionLabel="Browse coding posts"
                actionHref="/categories/code"
              />
            ) : (
              posts
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
                .reverse()
            )}
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
  try {
    await db.connect();
    let searchStr = context.query.search || "";
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
  } catch (error) {
    return {
      props: {
        posts: [],
        tags: [],
        searchStr: context.query.search || "",
        hasError: true,
      },
    };
  }
}
