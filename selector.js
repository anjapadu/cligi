const fs = require("fs");
const logSymbols = require('log-symbols');
let currentDir = process.cwd();
let selectorName = process.argv[3]
const removeBlankLines = require('./utils').removeBlankLines;

const app = {}

app.createSelector = function () {
    try {
        if (fs.existsSync(currentDir + `/src/selectors/${selectorName}.js`)) {
            //file exists   
            // console.log('FILE EXISTS');
        } else {
            // console.log('NOT EXISTS');
            let data =
                `import {
    createSelector
} from 'reselect';

/*
const getStateVariable = state => state.${selectorName}.stateVariable;
*/

const ${selectorName}Selector = createSelector(
    [/*getStateVariable*/],
    (/*stateVariable*/) => ({
        /*stateVariable*/
    })
);
    
export {
    ${selectorName}Selector
}`;
            fs.writeFile(`${currentDir}/src/selectors/${selectorName}.js`, data, function (err, data) {
                if (err) console.log(err);
                console.log(logSymbols.success, '\x1b[32m' + `Selector ${selectorName} file created successfully` + '\x1b[0m');
                fs.readFile(`${currentDir}/src/selectors/index.js`, 'utf-8', function (err, data) {
                    if (err) throw err;

                    let codeArray = data.split('\n');
                    codeArray.push(`export * from './${selectorName}'`);

                    fs.writeFile(`${currentDir}/src/selectors/index.js`, removeBlankLines(codeArray).join('\n'), 'utf-8', function (err) {
                        if (err) throw err;
                        console.log(logSymbols.success, '\x1b[32mSelectors file modified successfully\x1b[0m');
                    });


                })
            });
        }
    } catch (err) {
        console.log('NOT EXIST');
        console.error(err)
    }
}

module.exports = app;