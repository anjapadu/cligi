#!/usr/bin/env node

// var myLibrary = require('../index');

// Displays the text in the console

// console.log('MY LIBRERIA', myLibrary);

switch (process.argv[2]) {
    case 'boiler':
        require('../boiler');
        break;
    case 'route':
        require('../route').createRoute();
        break;
    case 'reducer':
        require('../reducer').createReducer();
        break;
    case 'container':
        require("../container").createContainer();
        break;
    case 'component':
        require('../component').createComponent();
        break;
    case 'selector':
        require('../selector').createSelector();
        break;
    case 'saga':
        require('../saga').createSaga();
        break;
    case 'action':
        require('../action').createAction();
        break;
    case 'sstate':
        require('../action').createAction();
        require('../reducer').createReducer();
        require('../saga').createSaga();
        require('../selector').createSelector();
        require("../constant").createConstant();
        break;
    default:
        console.log('Insert code')
}   