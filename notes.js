const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
  const notes = loadNotes();
  // This will loop through all even if a duplicate is found
  // const duplicateNotes = notes.filter((note) => note.title === title);

  // find stops one condition returns true
  const duplicateNote = notes.find((note) => note.title === title);
  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body
    }); 
    saveNotes(notes);
    logSuccess('New note added');
  } else {
    logFailure('Note title is taken');
  }
}

const removeNote = (title) => {
  const notes = loadNotes();
  const notesToKeep = notes.filter((note) => note.title !== title)
  if (notes.length > notesToKeep.length) {
    saveNotes(notesToKeep);
    logSuccess('Note was removed');
  } else {
    logFailure('Note not found');
  }
}

const readNote = (title) => {
  const notes = loadNotes();
  const noteToRead = notes.find((note) => note.title === title)
  if (noteToRead) {
    logNote(noteToRead);
  } else {
    logFailure('Note not found');
  }
}


const listNotes = () => {
  const notes = loadNotes();
  logSuccess("Your Notes");
  notes.forEach(note => {
    logNote(note);
  })
}

const loadNotes = () => {
  try {
    const db = fs.readFileSync('notes.json');
    const dataJson = db.toString();
    return JSON.parse(dataJson);  
  } catch (error) {
    return [];
  }
}

const saveNotes = (notes) => {
  const data = JSON.stringify(notes);
  fs.writeFileSync('notes.json', data);
}

const logSuccess = (message) => {
  console.log(chalk.green.inverse(message));
}

const logNote = (note) => {
  console.log('+======================+');
  console.log(chalk.green.inverse(note.title));
  console.log(chalk.red.inverse(note.body));
}

const logFailure = (message) => {
  console.log(chalk.red.inverse(message));
}

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
};