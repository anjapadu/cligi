const fs = require("fs");
const logSymbols = require('log-symbols');
let currentDir = process.cwd();
let constantName = process.argv[3];
const removeBlankLines = require('./utils').removeBlankLines;

const app = {};

app.createConstant = function () {
    fs.mkdir(currentDir + '/src/constants/', { recursive: true }, (err) => {
        if (err) throw err;
        let data = `/*export const NEW_VARIABLE = '${constantName}/new_variable';*/`;
        fs.writeFile(currentDir + `/src/constants/${constantName}.js`, data, function (err, data) {
            if (err) console.log(err);
            console.log(logSymbols.success, '\x1b[32m' + `Constants ${constantName} file created successfully` + '\x1b[0m');
            fs.readFile(`${currentDir}/src/constants/index.js`, 'utf-8', function (err, data) {
                if (err) throw err;

                let codeArray = data.split('\n');
                codeArray.push(`export * from './${constantName}'`);

                fs.writeFile(`${currentDir}/src/constants/index.js`, removeBlankLines(codeArray).join('\n'), 'utf-8', function (err) {
                    if (err) throw err;
                    console.log(logSymbols.success, '\x1b[32mConstants file modified successfully\x1b[0m');
                });
            })
        });
    });
}

module.exports = app;