const fs = require("fs");
const logSymbols = require('log-symbols');
let currentDir = process.cwd();
let componentName = process.argv[3]

const app = {}

app.createComponent = function () {
    fs.mkdir(currentDir + '/src/components/' + componentName + '/', { recursive: true }, (err) => {
        if (err) throw err;

        let data = `import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

class ${componentName} extends PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        return <div>
            <p>{"${componentName}"}</p>
        </div>
    }
}
    
const mapStateToProps = (state) => {

    return {

    }
}

export default connect(mapStateToProps, {

})(${componentName})`;

        fs.writeFile(currentDir + '/src/components/' + componentName + '/' + "index.jsx", data, function (err, data) {
            if (err) console.log(err);
            console.log(logSymbols.success, '\x1b[32m' + `Component ${componentName} file created successfully` + '\x1b[0m');

        });
    });
}

module.exports = app;