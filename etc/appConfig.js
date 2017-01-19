var path = require("path"),
  sourcePath = 'test/app',
  sourceRoot = path.resolve(__dirname, '..', sourcePath);

var appConfig = {
  srcPath: sourceRoot,
  genPath: 'src-gen',
  testPath: 'test/specs',
  distPath: 'dist',
  templatesPath: 'scripts/templates',
  specs: '/**/*.spec.ts',
  testBundle: path.resolve(__dirname, './spec-bundle.js'),
  junit: {
    title: 'AngularCommon',
    dir: 'dist/test-reports'
  },
  chunks: {
    name: ['polyfills', 'vendor'].reverse()
  },
  copy: [{
    from: path.resolve(sourceRoot, 'img'),
    to: 'img'
  }, {
    from: path.resolve(sourceRoot, 'i18n'),
    to: 'i18n'
  }],
  indexFiles: [{
    chunks: ['main', 'polyfills', 'vendor'],
    template: path.resolve(sourceRoot, 'index.html'),
    chunksSortMode: 'dependency'
  }],
  proxy: {
    '*': 'http://localhost:8080', // REST service
  },
  additionalWebpackOptions: false
};

module.exports = appConfig;
