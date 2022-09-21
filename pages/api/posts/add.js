import Post from "../../../models/Post";
import db from "../../../config/db/index";
var slugify = require("slugify");

export default async function getPosts(req, res) {
  await db.connect();
  const formData = req.body;
  let slug = slugify(formData.title);
  const post = await Post.create({ ...formData, slug: slug });

  res.json({ post });
}
