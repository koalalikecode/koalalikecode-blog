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
  if (req.method === 'GET') {
    const posts = await Post.find({}).sort({ createdAt: -1 });
    return res.json({ posts });
  }
  res.status(405).json({ error: 'Method not allowed' });
} 