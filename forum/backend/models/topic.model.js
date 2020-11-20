const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const topicSchema = new Schema({
    parent_board_id: { type: String, required: true},
    topic_title: { type: String, required: true },
    topic_desc: { type: String, required: true },
    topic_num: { type: Number, required: true },
    del_flag: { type: Boolean, required: true }    
}, {
  timestamps: true,
});

const Topic = mongoose.model('Topic', topicSchema);

module.exports = Topic;