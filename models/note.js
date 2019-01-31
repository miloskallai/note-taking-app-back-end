const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  user: String,
  note_title: String,
  note_text: String,
  date: Date,
  is_shared: Boolean
});

const Note = mongoose.model('Note', noteSchema);

module.exports = { Note };
