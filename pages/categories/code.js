import Layout from "../../components/layout";
import Post from "../../components/post";
import SideBar from "../../components/sidebar";
import db from "../../config/db/index";
import BlogPost from "../../models/Post";
import readTime from "../../utils/read-time";
import { formatDate } from "../../utils/lib";
import Head from "next/head";
import Pagination from "../../components/Pagination";
import SearchBar from "../../components/ui/SearchBar";
import EmptyState from "../../components/ui/EmptyState";
import ErrorState from "../../components/ui/ErrorState";

export default function Code({
  posts,
  tags,
  currentPage,
  totalPages,
  hasError = false,
}) {
  return (
    <div>
      <Layout active="code">
        <Head>
          <title>Coding Posts - koalalikecode</title>
          <meta property="og:title" content="Coding Posts - koalalikecode" />
          <meta
            name="keywords"
            content="personal blog, blog, blog cá nhân, koalalikecode, coding post"
          />
          <meta
            name="description"
            content="Coding Post | koalalikecode personal blog"
          />
          <meta
            property="og:description"
            content="Coding Post | koalalikecode personal blog"
          />
          <meta
            property="og:image"
            content="https://i.postimg.cc/Kj3xdQqQ/koalalikecode2.png"
          />
        </Head>

        {/* Page hero card */}
        <div className="ui-card p-6 mt-6 mb-8 bg-gradient-to-r from-blue-500/5 to-violet-500/5 border-blue-500/20">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-1 h-7 rounded-full bg-gradient-to-b from-blue-500 to-violet-500 flex-shrink-0" />
            <h1 className="text-2xl font-bold font-mon">Coding Posts</h1>
          </div>
          <p className="text-muted text-sm ml-4">
            Articles about web development, programming languages, and
            engineering.
          </p>
        </div>

        <SearchBar />
        <div className="grid grid-cols-3 gap-x-8 lg:grid-cols-1 lg:gap-x-0">
          <div className="col-span-2 lg:col-span-1 lg:order-2 mt-6">
            {hasError ? (
              <ErrorState description="We could not load coding posts." />
            ) : posts.length === 0 ? (
              <EmptyState
                title="No coding posts found"
                description="Try another category or come back later."
                actionLabel="Back to home"
              />
            ) : (
              <>
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
              </>
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
    const page = parseInt(context.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;
    const totalPosts = await BlogPost.countDocuments({ categories: "code" });
    const totalPages = Math.ceil(totalPosts / limit);
    let posts = await BlogPost.find({ categories: "code" })
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
  } catch (error) {
    return {
      props: {
        posts: [],
        tags: [],
        currentPage: 1,
        totalPages: 1,
        hasError: true,
      },
    };
  }
}
