const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const topicSchema = new Schema({
    user_id: { type: String, required: true },//user_id references User._ID
    user_role: { type: String, required: true },//user roles: Admin, Moderator, User
}, {
  timestamps: true,
});

const Userprefs = mongoose.model('Topic', topicSchema);

module.exports = Userprefs;