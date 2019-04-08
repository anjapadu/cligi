const fs = require("fs");

let currentDir = process.cwd();
let sagaName = process.argv[3]
console.log(currentDir, sagaName)
try {
    if (fs.existsSync(currentDir + `/src/sagas/${sagaName}.js`)) {
        //file exists   
        console.log('FILE EXISTS');
    } else {
        console.log('NOT EXISTS');
        let data = `
import {
call,
select,
xtakeLatest,
fork,
put,
all
} from 'redux-saga/effects';
import {

} from '../reducers/constants';

/***********************/
/******Start here*******/
/***********************/
export default [

];
`
        fs.writeFile(`${currentDir}/src/sagas/${sagaName}.js`, data, function (err, data) {
            if (err) console.log(err);
            console.log("Successfully Written to File.");
            fs.readFile(`${currentDir}/src/sagas/index.js`, 'utf-8', function (err, data) {
                if (err) throw err;
                let codeArray = data.split('\n');
                let lastImportLine = findLastImportIndex(codeArray);
                codeArray.splice(lastImportLine + 1, 0, `import ${sagaName}Saga from './${sagaName}'`);
                let lastYieldAllLine = findYieldAllSaga(codeArray);
                codeArray.splice(lastYieldAllLine, 0, `        ...${sagaName}Saga,`)
                if (codeArray[lastYieldAllLine - 1].trim()[codeArray[lastYieldAllLine - 1].trim().length - 1] === ',') {
                    console.log('hasComa');
                } else {
                    codeArray[lastYieldAllLine - 1] = '        ' + codeArray[lastYieldAllLine - 1].trim() + ','
                }
                fs.writeFile(`${currentDir}/src/sagas/index.js`, codeArray.join('\n'), 'utf-8', function (err) {
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

function findYieldAllSaga(array) {
    let startOfAll = -1;
    let endOfAll = -1;
    array.forEach((item, index) => {
        if (item.indexOf('yield all([') > -1) {
            startOfAll = index;
        }
        if (startOfAll !== -1 && item.indexOf('])') > -1 && index > startOfAll) {
            endOfAll = index;
        }
    })
    return endOfAll;
}

function findLastImportIndex(array) {
    let lastImportLine = -1;
    array.forEach((item, index) => {
        if (item.indexOf('import ') === 0) {
            lastImportLine = index;
        }
    })
    return lastImportLine;
}