const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const threadSchema = new Schema({
    parent_topic_id: { type: String, required: true },
    thread_title: { type: String, required: true },
    author_id: { type: String, required: true },
    del_flag: { type: Boolean, required: true }    
}, {
  timestamps: true,
});

const Thread = mongoose.model('Topic', topicSchema);

module.exports = Thread;