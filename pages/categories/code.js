import Layout from "../../components/layout";
import Post from "../../components/post";
import SideBar from "../../components/sidebar";
import db from "../../config/db/index" 
import BlogPost from "../../models/Post"

export default function Code({ posts }) {
  function formatDate(date) {
    let res = new Date(date);
    return res.getDate() + '/' + (Number(res.getMonth()) + 1).toString() + '/' + res.getFullYear();
  }
  return (
    <div>
      <Layout active="code">
        <h2 className="text-3xl font-mon font-bold mt-5 mb-14 sm:mb-10">Bài viết lập trình</h2>
        <div className="grid grid-cols-3 gap-x-8 lg:grid-cols-none lg:gap-x-0">

          <div className="col-span-2 lg:order-2">
          {(posts.map( (post) => <Post key={post._id} image = {post.thumbnail}
          title={post.title}
          description = "Chỉ với một số thẻ HTML thông dụng, bạn đã hoàn toàn có thể tạo riêng cho mình một trang web đơn giản."
          time = {formatDate(post.createdAt)}
          comment = "3 Bình luận"
          link = {`/blogs/${post.slug}`}
          tags = {post.tags} />)).reverse()}
          </div>

          <div className="">
            <SideBar />
          </div>
        </div>
      </Layout>
    </div>
  );
}

export async function getStaticProps() {
  await db.connect();
  const posts = await BlogPost.find({categories: 'code'});
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
      
    },
    revalidate: 10,
  };
}
