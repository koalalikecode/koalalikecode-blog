import Layout from "../../components/layout";
import Post from "../../components/post";
import SideBar from "../../components/sidebar";
import db from "../../config/db/index";
import BlogPost from "../../models/Post";
import readTime from "../../utils/read-time";
import { formatDate } from "../../utils/lib";
import Head from "next/head";
import { hashToBgColor, hashToTextColor } from "../../utils/tag-color";
import SearchBar from "../../components/ui/SearchBar";
import EmptyState from "../../components/ui/EmptyState";
import ErrorState from "../../components/ui/ErrorState";

export default function TagPage({ posts, tags, tagName, hasError = false }) {
  return (
    <div>
      <Layout>
        <Head>
          <meta name="description" content="koalalikecode personal blog" />
          <meta
            name="keywords"
            content="personal blog, blog, blog cá nhân, koalalikecode"
          />
          <meta property="og:title" content={`${tagName} | koalalikecode`} />
          <meta
            property="og:description"
            content="koalalikecode personal blog"
          />
          <meta
            property="og:image"
            content="https://i.postimg.cc/Kj3xdQqQ/koalalikecode2.png"
          />
          <title>{tagName} | koalalikecode</title>
        </Head>

        {/* Page hero card */}
        <div className="ui-card p-6 mt-6 mb-8 bg-gradient-to-r from-blue-500/5 to-violet-500/5 border-blue-500/20">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-1 h-7 rounded-full bg-gradient-to-b from-blue-500 to-violet-500 flex-shrink-0" />
            <h1 className="text-2xl font-bold font-mon flex items-center gap-2">
              Posts tagged{" "}
              <span
                className={`rounded-md px-2 py-[2px] text-xl ${hashToTextColor(
                  tagName
                )} ${hashToBgColor(tagName)}`}
              >
                #{tagName}
              </span>
            </h1>
          </div>
          <p className="text-muted text-sm ml-4">
            All articles tagged with &ldquo;{tagName}&rdquo;.
          </p>
        </div>

        <SearchBar />
        <div className="grid grid-cols-3 gap-x-8 lg:grid-cols-1 lg:gap-x-0">
          <div className="col-span-2 lg:col-span-1 lg:order-2 mt-6">
            {hasError ? (
              <ErrorState description="Could not load posts for this tag." />
            ) : posts.length === 0 ? (
              <EmptyState
                title={`No posts tagged #${tagName}`}
                description="Try another tag or use search."
                actionLabel="Back to home"
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

export async function getStaticProps({ params }) {
  try {
    await db.connect();
    let posts = await BlogPost.find({
      tags: params.id,
    });
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
        tagName: params.id,
      },
      revalidate: 10,
    };
  } catch (error) {
    return {
      props: {
        posts: [],
        tags: [],
        tagName: params.id,
        hasError: true,
      },
      revalidate: 10,
    };
  }
}

export async function getStaticPaths() {
  await db.connect();
  let posts = await BlogPost.find();
  let tags = [];
  posts = JSON.parse(JSON.stringify(posts));
  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      if (!tags.includes(tag)) tags.push(tag);
    });
  });
  const paths = tags.map((tag) => {
    return {
      params: {
        id: tag,
      },
    };
  });
  return {
    paths,
    fallback: "blocking",
  };
}
