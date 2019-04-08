#!/usr/bin/env node

// var myLibrary = require('../index');

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
    case 'selector':
        require('../selector');
        break;
    case 'saga':
        require('../saga');
        break;
    case 'action':
        require('../action');
        break;
    case 'sstate':
        require('../action');
        require('../reducer');
        require('../saga');
        require('../selector');
        break;
    default:
        console.log('Insert code')
}   