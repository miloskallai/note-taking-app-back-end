const express = require('express');
const app = express();
const PORT = 8080;
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(
  'mongodb://localhost/notes_api',
  { useNewUrlParser: true }
);

const noteSchema = new mongoose.Schema({
  user: String,
  note_title: String,
  note_text: String,
  date: Date,
  is_shared: Boolean
});

const Note = mongoose.model('Note', noteSchema);

app.get('/notes', (req, res) => {
  Note.find({}, (err, notes) => {
    if (err) {
      console.log(err);
    } else {
      res.json(notes);
    }
  });
});

app.post('/notes', (req, res) => {
  const { user, note_title, note_text, is_shared } = req.body;
  Note.create(
    {
      user,
      note_title,
      note_text,
      date: new Date(),
      is_shared
    },
    (err, note) => {
      if (err) {
        console.log(err);
      } else {
        console.log('new note added to db:');
        console.log(note);
      }
    }
  );
});

app.put('/notes/:id', (req, res) => {
  const _id = req.params.id;
  const { user, note_title, note_text, is_shared } = req.body;
  Note.findOneAndUpdate(
    { _id },
    {
      $set: {
        user,
        note_title,
        note_text,
        date: new Date(),
        is_shared
      }
    },
    { new: true },
    (err, note) => {
      if (err) {
        console.log(err);
      } else {
        console.log(note);
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`server is up, listening on port ${PORT}`);
});
