import db from '../../../config/db';
import Comment from '../../../models/Comment';

export default async function handler(req, res) {
  await db.connect();
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });
  const { postId, parentId, name, content } = req.body;
  if (!postId || !name || !content) return res.status(400).json({ message: 'Missing required fields' });
  try {
    // Chỉ cho phép trả lời comment cha (parentId là null hoặc là comment cha)
    let parentComment = null;
    if (parentId) {
      parentComment = await Comment.findById(parentId);
      if (!parentComment || parentComment.parentId) {
        return res.status(400).json({ message: 'Invalid parent comment' });
      }
    }
    const newComment = await Comment.create({ postId, parentId: parentId || null, name, content });
    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ message: 'Error adding comment', error: err.message });
  }
}