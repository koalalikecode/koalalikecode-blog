const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  parentId: { type: Schema.Types.ObjectId, ref: 'Comment', default: null },
  name: { type: String, required: true },
  content: { type: String, required: true } // HTML từ rich text editor
}, {
  timestamps: true
});

module.exports = mongoose.models.Comment || mongoose.model('Comment', CommentSchema);