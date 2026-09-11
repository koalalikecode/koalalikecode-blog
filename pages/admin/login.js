import { useState } from 'react';
import { useRouter } from 'next/router';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (res.ok && data.token) {
      sessionStorage.setItem('admin_token', data.token);
      router.push('/admin/blogs');
    } else {
      setError(data.error || 'Đăng nhập thất bại');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-80">
        <h1 className="text-2xl font-bold mb-4 text-center">Admin Login</h1>
        {error && <div className="mb-2 text-red-500 text-center">{error}</div>}
        <div className="mb-4">
          <label className="block mb-1">Username</label>
          <input
            className="w-full border px-2 py-1"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input
            className="w-full border px-2 py-1"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="w-full bg-blue-500 text-white py-2 rounded" type="submit">Đăng nhập</button>
      </form>
    </div>
  );
} 