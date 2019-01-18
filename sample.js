const mongoose = require('mongoose');

//connect to db (if not exists, creates a new db)
mongoose.connect(
  'mongodb://localhost/sample',
  { useNewUrlParser: true }
);

//create schema
const noteSchema = new mongoose.Schema({
  user: String,
  note_title: String,
  note_text: String,
  date: Date,
  is_shared: Boolean
});

const Note = mongoose.model('Note', noteSchema);

//adding new note to db
const sampleNote = new Note({
  user: 'Miloska',
  note_title: 'Noteeee note',
  note_text: 'Thdis is a sample note text',
  date: new Date(),
  is_shared: false
});

sampleNote.save((error, note) => {
  if (error) {
    console.log('Something went wrong');
  } else {
    console.log(note);
  }
});

//create and save new note to db
Note.create(
  {
    user: 'LAJOSKA',
    note_title: 'sssaaaaNoteeee note',
    note_text: 'Thdis is a sample note text',
    date: new Date(),
    is_shared: false
  },
  (error, note) => {
    if (error) {
      console.log(error);
    } else {
      console.log(note);
    }
  }
);

//retrive all note from db
Note.find({}, (error, notes) => {
  if (error) {
    console.log(error);
  } else {
    console.log(notes);
  }
});
