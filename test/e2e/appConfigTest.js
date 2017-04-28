var path = require("path");
var appConfig = {
    srcPath:  path.resolve('app'),
    testPath: 'specs',
    genPath: 'src-gen',
    copy: [],
    indexFiles: [{
        chunks: ['main', 'polyfills', 'vendor'],
        template: path.resolve('app', 'index.html'),
        chunksSortMode: 'dependency'
    }],
    junit: {
        name: 'Holisticon-TestApp',
        dir: '../../target/e2e-reports'
    },
};

module.exports = appConfig;
