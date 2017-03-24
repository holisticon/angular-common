var path = require("path");
var appConfig = {
    srcPath: 'test/app',
    testPath: 'test/specs',
    genPath: 'src-gen',
    copy: [],
    indexFiles: [{
        chunks: ['main', 'polyfills', 'vendor'],
        template: path.resolve('test', 'app', 'index.html'),
        chunksSortMode: 'dependency'
    }],
    junit: {
        name: 'Holisticon-TestApp',
        dir: '../target/test-reports'
    },
};

module.exports = appConfig;