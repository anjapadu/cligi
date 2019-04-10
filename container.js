const fs = require("fs");
const logSymbols = require('log-symbols');
let currentDir = process.cwd();
let containerName = process.argv[3];
const app = {}

app.createContainer = function () {
    fs.mkdir(currentDir + '/src/containers/' + containerName + '/', { recursive: true }, (err) => {
        if (err) throw err;
        let data = `import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
    
class ${containerName} extends PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        return <div>
            <p>{"${containerName}"}</p>
        </div>
    }
}

const mapStateToProps = (state) => {

    return {

    }
}
    
export default connect(mapStateToProps, {

})(${containerName})`;
        fs.writeFile(currentDir + '/src/containers/' + containerName + '/' + "index.jsx", data, function (err, data) {
            if (err) console.log(err);
            console.log(logSymbols.success, '\x1b[32m' + `Container ${containerName} file created successfully` + '\x1b[0m');

        });
    });
}

module.exports = app;