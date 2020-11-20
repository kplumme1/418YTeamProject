const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const threadSchema = new Schema({
    parent_topic_id: { type: String, required: true },
    thread_num: { type: Number, required: true },
    thread_author: { type: String, required: true },
    thread_title: { type: String, required: true },
    del_flag: { type: Boolean, required: true }    
}, {
  timestamps: true,
});

const Thread = mongoose.model('Thread', threadSchema);

module.exports = Thread;