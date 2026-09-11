import Post from '../../../models/Post';
import db from '../../../config/db/index';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  await db.connect();
  // Check JWT
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' });
  const token = auth.split(' ')[1];
  try {
    jwt.verify(token, process.env.ADMIN_JWT_SECRET);
  } catch {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const { id } = req.query;

  if (req.method === 'GET') {
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ error: 'Not found' });
    return res.json({ post });
  }

  if (req.method === 'PUT') {
    const formData = req.body;
    const post = await Post.findByIdAndUpdate(id, formData, { new: true });
    if (!post) return res.status(404).json({ error: 'Not found' });
    return res.json({ post });
  }

  if (req.method === 'DELETE') {
    const post = await Post.findByIdAndDelete(id);
    if (!post) return res.status(404).json({ error: 'Not found' });
    return res.json({ success: true });
  }

  res.status(405).json({ error: 'Method not allowed' });
} 