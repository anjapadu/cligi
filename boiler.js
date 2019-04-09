const fs = require("fs");
const logSymbols = require('log-symbols');
const utils = require('./utils');
let currentDir = process.cwd();
let projectName = process.argv[3];
var exec = require('child_process').exec,
    child;
const defaults = {
    mode: 0o777 & (~process.umask()),
    fs
};
fs.mkdirSync(projectName, defaults.mode);
utils.copyFolderRecursiveSync(`${__dirname}/templates/__boiler/`, `${currentDir}`);

console.log(logSymbols.info, '\x1b[33m========================================\x1b[0m', logSymbols.info);
console.log(logSymbols.info, '\x1b[33m========INSTALANDO_DEPENDENCIAS=========\x1b[0m', logSymbols.info);
console.log(logSymbols.info, '\x1b[33m========================================\x1b[0m', logSymbols.info);

child = exec('yarn', {
    cwd: currentDir + '/' + '__boiler'
},
    function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });

fs.renameSync(`${currentDir}/__boiler`, `${currentDir}/${projectName}`, (err) => {
    if (err) {
        console.error(err)
        return
    }
    //done
});