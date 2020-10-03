const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const boardSchema = new Schema({
  board_title_text: { type: String, required: true },
  board_desc_text: { type: String, required: true },
}, {
  timestamps: true,
});

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;