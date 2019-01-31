const express = require('express');
const app = express();
const PORT = 8080;
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./.config/keys').mongoURI;
const { Note } = require('./models/note');

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('Mongo DB connected!');
  })
  .catch(err => {
    console.log(err);
    console.log('Could not connect to Mongo DB');
  });

app.get('/notes', (req, res) => {
  Note.find({}, (err, notes) => {
    if (err) {
      console.log(err);
    } else {
      res.json(notes);
    }
  });
});

app.get('/notes/:id', (req, res) => {
  const _id = req.params.id;
  Note.findById({ _id }, (err, note) => {
    if (err) {
      console.log(err);
    } else {
      res.json(note);
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
        is_shared
      }
    },
    (err, note) => {
      if (err) {
        console.log(err);
      } else {
        console.log(note);
      }
    }
  );
});

app.delete('/notes/:id', (req, res) => {
  const _id = req.params.id;
  Note.remove({ _id }, err => {
    if (err) {
      console.log(err);
    } else {
      console.log('Post removed from db');
    }
  });
});

app.listen(PORT, () => {
  console.log(`server is up, listening on port ${PORT}`);
});
