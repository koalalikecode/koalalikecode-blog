import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { FiSave, FiPlus, FiArrowLeft } from 'react-icons/fi';
import { marked } from 'marked';
import parse from 'html-react-parser';
import postStyles from "../../../styles/post_body.module.css";
import Prism from "prismjs";
import "prismjs/components/prism-jsx.min";
import "prismjs/components/prism-scss.min";
import "prismjs/components/prism-sass";
import "prismjs/components/prism-bash";
import "prismjs/plugins/unescaped-markup/prism-unescaped-markup.min.js";

export default function EditBlog() {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState({
    title: '',
    description: '',
    thumbnail: '',
    tags: '',
    categories: '',
    content: '',
  });
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    Prism.highlightAll();
  }, [post.content]);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? sessionStorage.getItem('admin_token') : null;
    if (!token) {
      router.replace('/admin/login');
      return;
    }
    if (id && id !== 'new') {
      setLoading(true);
      fetch(`/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(async (res) => {
          if (res.status === 401) {
            sessionStorage.removeItem('admin_token');
            router.replace('/admin/login');
            return;
          }
          const data = await res.json();
          setPost({
            title: data.post.title || '',
            description: data.post.description || '',
            thumbnail: data.post.thumbnail || '',
            tags: (data.post.tags || []).join(', '),
            categories: (data.post.categories || []).join(', '),
            content: data.post.content || '',
          });
          setLoading(false);
        });
    } else if (id === 'new') {
      setLoading(false);
    }
  }, [router, id]);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('admin_token');
    const payload = {
      ...post,
      tags: post.tags.split(',').map((t) => t.trim()).filter(Boolean),
      categories: post.categories.split(',').map((c) => c.trim()).filter(Boolean),
    };
    if (id === 'new') {
      const res = await fetch('/api/posts/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      if (res.status === 401) {
        sessionStorage.removeItem('admin_token');
        router.replace('/admin/login');
        return;
      }
    } else {
      const res = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      if (res.status === 401) {
        sessionStorage.removeItem('admin_token');
        router.replace('/admin/login');
        return;
      }
    }
    router.push('/admin/blogs');
  };

  if (loading) return null;

  const contentHtml = parse(marked(post.content || ''));

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="mb-4">
        <button
          className="flex items-center gap-2 px-4 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg shadow transition font-semibold"
          onClick={() => router.push('/admin/blogs')}
        >
          <FiArrowLeft /> Quay lại danh sách
        </button>
      </div>
      <div className="rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6">
        <h1 className="text-2xl font-bold mb-6 text-blue-600">
          {id === 'new' ? 'Thêm mới' : 'Sửa'} bài viết
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-semibold">Tiêu đề</label>
            <input
              className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-400 outline-none bg-slate-50 dark:bg-slate-800"
              name="title"
              value={post.title}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Mô tả ngắn (description)</label>
            <input
              className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-400 outline-none bg-slate-50 dark:bg-slate-800"
              name="description"
              value={post.description}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Ảnh đại diện (thumbnail URL)</label>
            <input
              className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-400 outline-none bg-slate-50 dark:bg-slate-800"
              name="thumbnail"
              value={post.thumbnail}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Tags (phân tách bằng dấu phẩy)</label>
            <input
              className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-400 outline-none bg-slate-50 dark:bg-slate-800"
              name="tags"
              value={post.tags}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Categories (phân tách bằng dấu phẩy)</label>
            <input
              className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-400 outline-none bg-slate-50 dark:bg-slate-800"
              name="categories"
              value={post.categories}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Nội dung (Markdown)</label>
            <textarea
              className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-400 outline-none bg-slate-50 dark:bg-slate-800 h-40"
              name="content"
              value={post.content}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow font-semibold transition"
          >
            {id === 'new' ? <FiPlus /> : <FiSave />}
            {id === 'new' ? 'Tạo mới' : 'Lưu thay đổi'}
          </button>
        </form>
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Preview</h2>
          <div className={`border rounded-lg p-4 min-h-[100px] bg-slate-50 dark:bg-slate-800 ${postStyles.post_body} post-body`}>
            {contentHtml}
          </div>
        </div>
      </div>
    </div>
  );
} 