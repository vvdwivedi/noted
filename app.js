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
  handler(argv) {
    notes.addNote(argv.title, argv.body);
  }
})

//Create remove command

yargs.command({
  command: 'remove',
  describe: 'Remove a note using title',
  builder: {
    title: {
      describe: 'Title of note',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    notes.removeNote(argv.title)
  }
})

// Read note method

yargs.command({
  command: 'read',
  describe: 'Read a note using title',
  builder: {
    title: {
      describe: 'Title of note',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    notes.readNote(argv.title);
  }
})

// List all notes

yargs.command({
  command: 'list',
  describe: 'List all notes',
  handler() {
    notes.listNotes();
  }
})

yargs.parse();