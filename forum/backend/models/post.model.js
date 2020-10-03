const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    parent_topic_id: { type: String, required: true },
    post_num: { type: Number, required: true },
    post_author: { type: String, required: true },
    post_body_text: { type: String, required: true }
}, {
  timestamps: true,
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;