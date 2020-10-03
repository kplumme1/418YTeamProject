const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const topicSchema = new Schema({
    parent_board_id: { type: String, required: true },
    thread_num: { type: Number, required: true },
    thread_author: { type: String, required: true },
    thread_top_post_id: { type: String, required: true },
    thread_title_text: { type: String, required: true }
}, {
  timestamps: true,
});

const Topic = mongoose.model('Topic', topicSchema);

module.exports = Topic;