const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes');

yargs.version('1.1.0');

//Create add notes method

yargs.command({
  command: 'add',
  describe: 'Add a note',
  builder: {
    title: {
      describe: 'Title of note',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'Body of note',
      demandOption: true,
      type: 'string'
    }
  },
  handler: function(argv) {
    notes.addNote(argv.title, argv.body);
  }
})

//Create remove command

yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  builder: {
    title: {
      describe: 'Title of note',
      demandOption: true,
      type: 'string'
    }
  },
  handler: function(argv) {
    notes.removeNote(argv.title)
  }
})

// Read note method

yargs.command({
  command: 'read',
  describe: 'Read a note',
  handler: function() {
    console.log("Adding a new note");
  }
})

// List all notes

yargs.command({
  command: 'list',
  describe: 'List all notes',
  handler: function() {
    console.log("Remove the note");
  }
})

yargs.parse();