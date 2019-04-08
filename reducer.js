const fs = require("fs");

let currentDir = process.cwd();
let reducerName = process.argv[2]
console.log(currentDir, reducerName)
try {
    if (fs.existsSync(currentDir + `/src/reducers/${reducerName}.js`)) {
        //file exists   
        console.log('FILE EXISTS');
    } else {
        console.log('NOT EXISTS');
        let data = `
import {

} from './constants'

const INITIAL_STATE = {
   
}

export default (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        
        default:
            return state;
    }
}
`;
        fs.writeFile(`${currentDir}/src/reducers/${reducerName}.js`, data, function (err, data) {
            if (err) console.log(err);
            console.log("Successfully Written to File.");
            fs.readFile(`${currentDir}/src/reducers/index.js`, 'utf-8', function (err, data) {
                if (err) throw err;

                let codeArray = data.split('\n');
                let { lastImportLine, lastLine } = findLastImportIndexAndLastLine(codeArray);
                codeArray.splice(lastImportLine + 1, 0, `import ${reducerName} from './${reducerName}'`);

                if (codeArray[lastLine + 2 - 1].trim()[codeArray[lastLine + 2 - 1].trim().length - 1] === ',') {
                    console.log('hasComa');
                } else {
                    codeArray[lastLine + 2 - 1] = '    ' + codeArray[lastLine + 2 - 1].trim() + ','
                }

                codeArray.splice(lastLine + 2, 0, `    ${reducerName},`)

                fs.writeFile(`${currentDir}/src/reducers/index.js`, codeArray.join('\n'), 'utf-8', function (err) {
                    if (err) throw err;
                    console.log('filelistAsync complete');
                });


            })
        });
    }
} catch (err) {
    console.log('NOT EXIST');

    console.error(err)
}



function findLastImportIndexAndLastLine(array) {
    let lastImportLine = -1;
    let importMultiLine = false;
    let lastLine = -1;

    array.forEach((item, index) => {
        if (item.indexOf('})')) {
            lastLine = index;
        }
        if (item.indexOf('import ') === 0 || importMultiLine) {
            if (item.indexOf(' from ') > 0) {
                lastImportLine = index;
            } else {
                importMultiLine = true;
            }
        }
    })
    return { lastImportLine, lastLine };
}