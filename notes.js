const fs = require('fs');
const chalk = require('chalk');

const getNotes = function() {
  return "your notes ...."
}

const addNote = function(title, body) {
  const notes = loadNotes();
  const duplicateNotes = notes.filter(function(note) {
    return note.title === title;
  })
  if (duplicateNotes.length === 0) {
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

const removeNote = function(title) {
  const notes = loadNotes();
  const notesToKeep = notes.filter(function(note) {
    return note.title !== title;
  })
  if (notes.length > notesToKeep.length) {
    saveNotes(notesToKeep);
    logSuccess('Note was removed');
  } else {
    logFailure('Note not found');
  }
}

const loadNotes = function() {
  try {
    const db = fs.readFileSync('notes.json');
    const dataJson = db.toString();
    return JSON.parse(dataJson);  
  } catch (error) {
    return [];
  }
}

const saveNotes = function(notes) {
  const data = JSON.stringify(notes);
  fs.writeFileSync('notes.json', data);
}

const logSuccess = function(message) {
  console.log(chalk.green.inverse(message));
}

const logFailure = function(message) {
  console.log(chalk.red.inverse(message));
}

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote
};