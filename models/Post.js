const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Post = new Schema({ 
    title: String, 
    slug: String,
    description: String,
    content: String,
    thumbnail: String,
    tags: [String],
    comments: [String],
    categories: [String],
}, {
    timestamps: true,
});

module.exports = mongoose.models.Post || mongoose.model('Post', Post);