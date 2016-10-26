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
    name: 'Holisticon-AngularBuildCommon',
    dir: 'dist/test-reports'
  },
  chunks: {
    name: ['polyfills', 'vendor'].reverse()
  },
  srcSASS: path.resolve(sourceRoot, 'scss'),
  srcI18N: path.resolve(sourceRoot, 'app', 'i18n'),
  srcIMG: path.resolve(sourceRoot, 'img'),
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
