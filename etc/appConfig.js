var path = require("path"),
  sourcePath = 'test/e2e/app',
  distPath = 'dist',
  sourceRoot = path.resolve(__dirname, '..', sourcePath),
  distRoot = path.resolve(__dirname, '..', distPath);

var appConfig = {
  srcPath: sourceRoot,
  genPath: 'src-gen',
  testPath: 'test/specs',
  distPath: distRoot,
  templatesPath: 'scripts/templates',
  specs: '/**/*.spec.ts',
  testBundle: path.resolve(__dirname, './spec-bundle.js'),
  junit: {
    title: 'AngularCommon',
    dir: 'dist/test-reports'
  },
  entryModule: path.resolve(sourceRoot, 'app/app.module#AppModule'),
  copy: [],
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
