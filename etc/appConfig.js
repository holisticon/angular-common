var path = require("path"),
  sourcePath = 'test/app',
  templatesPath = 'scripts/templates',
  testPath = 'test/specs',
  distPath = 'dist',
  bundlePath = path.resolve(__dirname, './spec-bundle.js'),
  sourceRoot = path.resolve(__dirname, '..', sourcePath),
  testRoot = path.resolve(__dirname, '..', testPath),
  distRoot = path.resolve(__dirname, '..', distPath);

var appConfig = {

  src: sourceRoot,
  test: testRoot,
  templates: path.resolve(__dirname, '..', templatesPath),
  srcPath: sourcePath,
  testPath: testPath,
  testSpecs: testPath + '/**/*.spec.ts',
  testBundlePath: bundlePath,
  testTitle: 'Holisticon - AngularBuildCommon',
  srcApp: sourceRoot,
  srcSASS: path.resolve(sourceRoot, 'scss'),
  srcI18N: path.resolve(sourceRoot, 'app', 'i18n'),
  srcIMG: path.resolve(sourceRoot, 'img'),
  index: path.resolve(sourceRoot, 'index.html'),
  dist: distRoot,
  distPath: distPath
};

module.exports = appConfig;
