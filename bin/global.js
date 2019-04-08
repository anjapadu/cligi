#!/usr/bin/env node

var myLibrary = require('../index');

// Displays the text in the console

// console.log('MY LIBRERIA', myLibrary);

switch (process.argv[2]) {
    case 'boiler':
        require('../boiler');
        break;
    case 'reducer':
        require('../reducer');
        break;
    case 'component':
        require('../component');
        break;
    case 'saga':
        require('../saga');
        break;
    default:
        console.log('Insert code')
}