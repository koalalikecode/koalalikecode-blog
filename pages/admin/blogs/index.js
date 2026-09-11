import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';
import Tag from '../../../components/tag';
import { formatDate } from '../../../utils/lib';

export default function AdminBlogs() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = typeof window !== 'undefined' ? sessionStorage.getItem('admin_token') : null;
    if (!token) {
      router.replace('/admin/login');
      return;
    }
    fetch('/api/posts', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (res.status === 401) {
          sessionStorage.removeItem('admin_token');
          router.replace('/admin/login');
          return;
        }
        const data = await res.json();
        setPosts(data.posts || []);
        setLoading(false);
      });
  }, [router]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-blue-600">Quản lý bài viết</h1>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow transition font-semibold"
          onClick={() => router.push('/admin/blogs/new')}
        >
          <FiPlus /> Thêm mới
        </button>
      </div>
      <div className="overflow-x-auto rounded-xl shadow border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
        <table className="min-w-full text-left">
          <thead className="bg-slate-100 dark:bg-slate-800">
            <tr>
              <th className="px-4 py-3 font-semibold">STT</th>
              <th className="px-4 py-3 font-semibold">Tên bài viết</th>
              <th className="px-4 py-3 font-semibold">Thời gian tạo</th>
              <th className="px-4 py-3 font-semibold">Tags</th>
              <th className="px-4 py-3 font-semibold">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, idx) => (
              <tr key={post._id} className="border-t border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                <td className="px-4 py-3">{idx + 1}</td>
                <td className="px-4 py-3 font-medium">{post.title}</td>
                <td className="px-4 py-3 whitespace-nowrap">{formatDate(post.createdAt)}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {(post.tags || []).map((tag) => (
                      <Tag tag={tag} link={`/tags/${tag}`} key={tag} />
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3 flex gap-2">
                  <button
                    className="flex items-center gap-1 px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded shadow transition"
                    title="Sửa"
                    onClick={() => router.push(`/admin/blogs/${post._id}`)}
                  >
                    <FiEdit /> Sửa
                  </button>
                  <button
                    className="flex items-center gap-1 px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded shadow transition"
                    title="Xóa"
                    onClick={async () => {
                      const token = sessionStorage.getItem('admin_token');
                      if (window.confirm('Bạn có chắc muốn xóa bài viết này?')) {
                        const res = await fetch(`/api/posts/${post._id}`, {
                          method: 'DELETE',
                          headers: { Authorization: `Bearer ${token}` },
                        });
                        if (res.status === 401) {
                          sessionStorage.removeItem('admin_token');
                          router.replace('/admin/login');
                          return;
                        }
                        setPosts(posts.filter((p) => p._id !== post._id));
                      }
                    }}
                  >
                    <FiTrash2 /> Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 