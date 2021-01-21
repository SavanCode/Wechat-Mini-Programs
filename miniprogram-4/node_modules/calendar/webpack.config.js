const path = require('path');

module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, 'calendar.js'),
    output: {
        path: path.resolve(__dirname),
        filename: 'index.js',
        libraryExport: 'calendar',
        libraryTarget: 'commonjs',
    },
};
