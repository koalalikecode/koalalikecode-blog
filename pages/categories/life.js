import Layout from "../../components/layout";
import Post from "../../components/post";
import SideBar from "../../components/sidebar";
import db from "../../config/db/index";
import BlogPost from "../../models/Post";

export default function Life({ posts, tags }) {
  function formatDate(date) {
    let res = new Date(date);
    return (
      res.getDate() +
      "/" +
      (Number(res.getMonth()) + 1).toString() +
      "/" +
      res.getFullYear()
    );
  }
  return (
    <div>
      <Layout active="life">
        <h2 className="text-3xl font-mon font-bold mt-5 mb-14 sm:mb-10">
          Chuyện cuộc sống
        </h2>
        <div className="grid grid-cols-3 gap-x-8 lg:grid-cols-none lg:gap-x-0">
          <div className="col-span-2 lg:order-2">
            {posts
              .map((post) => (
                <Post
                  key={post._id}
                  image={post.thumbnail}
                  title={post.title}
                  description="Chỉ với một số thẻ HTML thông dụng, bạn đã hoàn toàn có thể tạo riêng cho mình một trang web đơn giản."
                  time={formatDate(post.createdAt)}
                  comment="3 Bình luận"
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
