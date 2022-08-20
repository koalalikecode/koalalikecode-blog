import Head from "next/head";
import Layout from "../components/layout";
import Post from "../components/post";
import { AiOutlineSearch } from 'react-icons/ai';

export default function Home() {
  return (
    <div>
      <Layout active="home">
        <h2 className="text-3xl font-mon font-bold mt-5 mb-14 sm:mb-10">Tổng hợp bài viết</h2>
        <div className="grid grid-cols-3 gap-x-8 lg:grid-cols-none lg:gap-x-0">

          <div className="col-span-2 lg:order-2">
        
            <Post image = "https://i.postimg.cc/PrXv9R9b/HTML-thumbnail.png"
              title="Giới thiệu các thẻ cơ bản trong HTML"
              description = "Chỉ với một số thẻ HTML thông dụng, bạn đã hoàn toàn có thể tạo riêng cho mình một trang web đơn giản."
              time = "8 ngày trước"
              comment = "3 Bình luận"
              link = "/blogs/thehtml"
              tags = {["HTML", "Web Development"]} />
            <Post image = "https://i.postimg.cc/PrXv9R9b/HTML-thumbnail.png"
              title="Giới thiệu các thẻ cơ bản trong HTML"
              description = "Chỉ với một số thẻ HTML thông dụng, bạn đã hoàn toàn có thể tạo riêng cho mình một trang web đơn giản."
              time = "8 ngày trước"
              comment = "3 Bình luận"
              link = "/blogs/thehtml"
              tags = {["HTML", "Web Development"]} />
            <Post image = "https://i.postimg.cc/PrXv9R9b/HTML-thumbnail.png"
              title="Giới thiệu các thẻ cơ bản trong HTML"
              description = "Chỉ với một số thẻ HTML thông dụng, bạn đã hoàn toàn có thể tạo riêng cho mình một trang web đơn giản."
              time = "8 ngày trước"
              comment = "3 Bình luận"
              link = "/blogs/thehtml"
              tags = {["HTML", "Web Development"]} />
            <Post image = "https://i.postimg.cc/PrXv9R9b/HTML-thumbnail.png"
              title="Giới thiệu các thẻ cơ bản trong HTML"
              description = "Chỉ với một số thẻ HTML thông dụng, bạn đã hoàn toàn có thể tạo riêng cho mình một trang web đơn giản."
              time = "8 ngày trước"
              comment = "3 Bình luận"
              link = "/blogs/thehtml"
              tags = {["HTML", "Web Development"]} />
            <Post image = "https://i.postimg.cc/PrXv9R9b/HTML-thumbnail.png"
              title="Giới thiệu các thẻ cơ bản trong HTML"
              description = "Chỉ với một số thẻ HTML thông dụng, bạn đã hoàn toàn có thể tạo riêng cho mình một trang web đơn giản."
              time = "8 ngày trước"
              comment = "3 Bình luận"
              link = "/blogs/thehtml"
              tags = {["HTML", "Web Development"]} />          
            <Post image = "https://i.postimg.cc/PrXv9R9b/HTML-thumbnail.png"
              title="Giới thiệu các thẻ cơ bản trong HTML"
              description = "Chỉ với một số thẻ HTML thông dụng, bạn đã hoàn toàn có thể tạo riêng cho mình một trang web đơn giản."
              time = "8 ngày trước"
              comment = "3 Bình luận"
              link = "/blogs/thehtml"
              tags = {["HTML", "Web Development"]} />          
            <Post image = "https://i.postimg.cc/PrXv9R9b/HTML-thumbnail.png"
              title="Giới thiệu các thẻ cơ bản trong HTML"
              description = "Chỉ với một số thẻ HTML thông dụng, bạn đã hoàn toàn có thể tạo riêng cho mình một trang web đơn giản."
              time = "8 ngày trước"
              comment = "3 Bình luận"
              link = "/blogs/thehtml"
              tags = {["HTML", "Web Development"]} />          
          </div>

          <div className="">
            <div className="sticky top-20 lg:static">
              <form className="flex items-center mb-6" action="">
                <input type="text" className="p-2 bg-blue-50" placeholder="Search.." name="search" />
                <button className="px-4 py-3 bg-blue-550" type="submit"><AiOutlineSearch className="fill-white"/></button>
              </form>
              <h2 className="text-xl font-mon font-semibold opacity-80 mb-5">Chủ đề</h2>
              <div className="flex flex-wrap mb-8">
                <a href="#" className="border rounded-2xl px-3 py-1 mr-2 mb-2 bg-blue-50 text-blue-550 hover:opacity-70 ease-in duration-300">Học tập</a>
                <a href="#" className="border rounded-2xl px-3 py-1 mr-2 mb-2 bg-blue-50 text-blue-550 hover:opacity-70 ease-in duration-300">Đời thường</a>
                <a href="#" className="border rounded-2xl px-3 py-1 mr-2 mb-2 bg-blue-50 text-blue-550 hover:opacity-70 ease-in duration-300">Lập trình</a>
                <a href="#" className="border rounded-2xl px-3 py-1 mr-2 mb-2 bg-blue-50 text-blue-550 hover:opacity-70 ease-in duration-300">Lập trình viên</a>
                <a href="#" className="border rounded-2xl px-3 py-1 mr-2 mb-2 bg-blue-50 text-blue-550 hover:opacity-70 ease-in duration-300">Reactjs</a>
                <a href="#" className="border rounded-2xl px-3 py-1 mr-2 mb-2 bg-blue-50 text-blue-550 hover:opacity-70 ease-in duration-300">Khoa học Công nghệ</a>
                <a href="#" className="border rounded-2xl px-3 py-1 mr-2 mb-2 bg-blue-50 text-blue-550 hover:opacity-70 ease-in duration-300">Backend Developer</a>
                <a href="#" className="border rounded-2xl px-3 py-1 mr-2 mb-2 bg-blue-50 text-blue-550 hover:opacity-70 ease-in duration-300">Frontend</a>
                <a href="#" className="border rounded-2xl px-3 py-1 mr-2 mb-2 bg-blue-50 text-blue-550 hover:opacity-70 ease-in duration-300">Website</a>
                <a href="#" className="border rounded-2xl px-3 py-1 mr-2 mb-2 bg-blue-50 text-blue-550 hover:opacity-70 ease-in duration-300">App Development</a>
                <a href="#" className="border rounded-2xl px-3 py-1 mr-2 mb-2 bg-blue-50 text-blue-550 hover:opacity-70 ease-in duration-300">UI/UX</a>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
