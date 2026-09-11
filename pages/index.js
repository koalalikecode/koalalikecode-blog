import Layout from "../components/layout";
import Post from "../components/post";
import SideBar from "../components/sidebar";
import db from "../config/db/index";
import BlogPost from "../models/Post";
import readTime from "../utils/read-time";
import { formatDate } from "../utils/lib";
import Head from "next/head";
import Pagination from "../components/Pagination";
import SearchBar from "../components/ui/SearchBar";
import EmptyState from "../components/ui/EmptyState";
import ErrorState from "../components/ui/ErrorState";

export default function Home({
  posts,
  tags,
  currentPage,
  totalPages,
  hasError = false,
}) {
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

        {/* Hero / intro section */}
        <section className="flex items-center gap-8 mt-8 mb-12 pb-10 border-b border-border sm:flex-col sm:items-start">
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-2">
              Personal Blog
            </p>
            <h1 className="text-3xl font-bold font-mon mb-3">
              Hi, I&apos;m{" "}
              <span className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
                koalalikecode
              </span>
            </h1>
            <p className="text-muted leading-relaxed max-w-lg text-sm">
              I write about web development, programming, and life. Join me as I
              document what I learn and build.
            </p>
          </div>
        </section>

        {/* Section heading */}
        <div className="flex items-center gap-3 mb-6 mt-2">
          <span className="w-1 h-7 rounded-full bg-gradient-to-b from-blue-500 to-violet-500 flex-shrink-0" />
          <h2 className="text-2xl font-bold font-mon">Latest Articles</h2>
        </div>

        <SearchBar />
        <div className="grid grid-cols-3 gap-x-8 lg:grid-cols-1 lg:gap-x-0">
          <div className="col-span-2 lg:col-span-1 lg:order-2 mt-6">
            {hasError ? (
              <ErrorState description="We could not load posts right now." />
            ) : posts.length === 0 ? (
              <EmptyState
                title="No posts yet"
                description="New articles will appear here soon."
                actionLabel="Browse categories"
                actionHref="/categories/code"
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

          <div>
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
    const totalPosts = await BlogPost.countDocuments();
    const totalPages = Math.ceil(totalPosts / limit);
    let posts = await BlogPost.find()
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
