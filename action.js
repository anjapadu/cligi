const fs = require("fs");
const logSymbols = require('log-symbols');
const removeBlankLines = require('./utils').removeBlankLines;

let currentDir = process.cwd();
let actionName = process.argv[3];

try {
    if (fs.existsSync(currentDir + `/src/actions/${actionName}.js`)) {
        //file exists   
        // console.log('FILE EXISTS');
    } else {
        // console.log('NOT EXISTS');
        let data = `
import {

} from '../constants'

/*export const setVariableState = (payload) => ({
    type: SET_VARIABLE_STATE,
    payload
})*/
`;
        fs.writeFile(`${currentDir}/src/actions/${actionName}.js`, data, function (err, data) {
            if (err) console.log(err);
            console.log(logSymbols.success, '\x1b[32m' + `Action ${actionName} file created successfully` + '\x1b[0m');
            fs.readFile(`${currentDir}/src/actions/index.js`, 'utf-8', function (err, data) {
                if (err) throw err;

                let codeArray = data.split('\n');
                codeArray.push(`export * from './${actionName}'`);

                fs.writeFile(`${currentDir}/src/actions/index.js`, removeBlankLines(codeArray).join('\n'), 'utf-8', function (err) {
                    if (err) throw err;
                    console.log(logSymbols.success, '\x1b[32m' + `Actions file modified successfully` + '\x1b[0m');
                });


            })
        });
    }
} catch (err) {
    console.log('NOT EXIST');

    console.error(err)
}

