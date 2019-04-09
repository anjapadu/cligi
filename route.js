const fs = require("fs");
const logSymbols = require('log-symbols');
let currentDir = process.cwd();
let containerName = process.argv[3];
let pathname = process.argv[4];



const createContainer = require('./container').createContainer;
try {
    if (fs.existsSync(currentDir + `/src/router/asyncRoutes.js`) && fs.existsSync(currentDir + `/src/router/index.js`)) {
        //file exists   
        // console.log('FILE EXISTS');
        if (!fs.existsSync(currentDir + `/src/components/${containerName}/index.jsx`)) {
            createContainer(containerName)
        }

        fs.readFile(`${currentDir}/src/router/asyncRoutes.js`, 'utf-8', function (err, data) {
            if (err) throw err;

            let codeArray = data.split('\n');
            let newString = `\nexport const ${containerName} = Loadable(
    withLoader({
        loader: () => import(/* webpackChunkName: "${containerName.toLowerCase()}" */'../containers/${containerName}')
    })
)`;
            codeArray.push(newString);
            fs.writeFile(`${currentDir}/src/router/asyncRoutes.js`, codeArray.join('\n'), 'utf-8', function (err) {
                if (err) throw err;
                console.log(logSymbols.success, '\x1b[32masyncRoutes file modified successfully\x1b[0m');
            });
        });

        fs.readFile(`${currentDir}/src/router/index.js`, 'utf-8', function (err, data) {
            if (err) throw err;

            let codeArray = data.split('\n');
            let { closeSwitchIndex, fromImportIndex } = findCloseSwitchAnFromImport(codeArray);
            codeArray.splice(closeSwitchIndex, 0, `                <Route
                    path={"${pathname[0] == '/' ? pathname : ('/' + pathname)}"}
                    component={() => <${containerName} />}
                    exact
                />`)
            codeArray.splice(fromImportIndex, 0, '');
            fs.writeFile(`${currentDir}/src/router/index.js`, codeArray.join('\n'), 'utf-8', function (err) {
                if (err) throw err;
                console.log(logSymbols.success, '\x1b[32mRouter file modified successfully\x1b[0m');
            });
        })


    } else {
        /*** NO EXISTE ***/
    }
} catch (err) {
    console.log('NOT EXIST');

    console.error(err)
}

function findCloseSwitchAnFromImport(array = []) {
    let closeSwitchIndex = -1;
    let fromImportIndex = -1
    array.forEach((item, index) => {
        if (item.indexOf('</Switch>') > -1) {
            closeSwitchIndex = index;
        }
        if (item.indexOf(`from './asyncRoutes'` > -1)) {
            fromImportIndex = index;
        }
    })
    return { closeSwitchIndex, fromImportIndex };
}