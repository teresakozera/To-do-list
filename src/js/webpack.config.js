const path = require('path');

module.exports = {
    entry: {
        loginPage:  './start.js',
        listPage:   './to-do-list-main.js'
    },
    output: {
        path: path.resolve(__dirname, '../../dist'),
        filename: '[name].js'
    }
};