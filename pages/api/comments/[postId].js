import db from '../../../config/db';
import Comment from '../../../models/Comment';

export default async function handler(req, res) {
  await db.connect();
  const { postId } = req.query;
  if (req.method !== 'GET') return res.status(405).json({ message: 'Method not allowed' });
  try {
    // Lấy tất cả comment cha
    const parents = await Comment.find({ postId, parentId: null }).sort({ createdAt: -1 });
    // Lấy tất cả comment con
    const children = await Comment.find({ postId, parentId: { $ne: null } });
    // Gắn children vào parent
    const parentWithChildren = parents.map(parent => {
      const replies = children.filter(child => String(child.parentId) === String(parent._id));
      return { ...parent.toObject(), replies };
    });
    res.status(200).json(parentWithChildren);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching comments', error: err.message });
  }
}