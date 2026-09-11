import Post from "../../../models/Post";
import db from "../../../config/db/index";
import jwt from 'jsonwebtoken';
var slugify = require("slugify");

export default async function getPosts(req, res) {
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
  const formData = req.body;
  let slug = slugify(formData.title);
  const post = await Post.create({ ...formData, slug: slug });

  res.json({ post });
}
