"use strict";

/**
 * Helper module
 *
 * @author: Martin Reinhardt (hypery2k)
 */

const DEBUG_ENV = 'holisticon_angular-common';
const path = require('path');
const util = require('util');
const debugLog = util.debuglog(DEBUG_ENV);
const defaultAppConfig = require('./appConfig');
const providedAppConfig = require(process.env.APP_CONFIG || './appConfig');

// Helper functions
const ROOT = path.resolve(__dirname, '..');

function isDebug() {
  var env = process.env || {};
  return env.NODE_DEBUG === DEBUG_ENV ? true : false
}

function hasProcessFlag(flag) {
  return process.argv.join('').indexOf(flag) > -1;
}

function isWebpackDevServer() {
  return process.argv[1] && !!(/webpack-dev-server$/.exec(process.argv[1]));
}

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [ROOT].concat(args));
}

function checkNodeImport(context, request, cb) {
  if (!path.isAbsolute(request) && request.charAt(0) !== '.') {
    cb(null, 'commonjs ' + request);
    return;
  }
  cb();
}

/**
 * Takes the default config and merge it with the provided overwrites
 * @param overwrittenConfig with overwrites
 * @returns config object
 * @example
 { src: '/my-sample-project/test/app',
  test: '/my-sample-project/test/specs',
  templates: '/my-sample-project/scripts/templates',
  srcPath: 'test/app',
  testPath: 'test/specs',
  testSpecs: 'test/specs/**\/*.spec.ts',
testBundlePath: '/my-sample-project/etc/spec-bundle.js',
  testTitle: 'Holisticon - AngularBuildCommon',
  srcApp: '/my-sample-project/test/app',
  srcSASS: '/my-sample-project/test/app/scss',
  srcI18N: '/my-sample-project/test/app/app/i18n',
  srcIMG: '/my-sample-project/test/app/img',
  index: '/my-sample-project/test/app/index.html',
  dist: '/my-sample-project/dist',
  distPath: 'dist',
  additionalWebpackOptions: false }

 */
function mergeAppConfig(overwrittenConfig) { /*eslint complexity: [error, 22]*/
  var appConfig = overwrittenConfig || {},
    basePath = path.resolve(process.cwd()),
    appName = appConfig.appName || defaultAppConfig.appName,
    entry,
    junit,
    srcPath = appConfig.srcPath || defaultAppConfig.srcPath,
    testPath = appConfig.testPath || defaultAppConfig.testPath,
    sourceResolved = path.resolve(basePath, srcPath),
    testPathResolved = path.resolve(basePath, testPath),
    templatesPath = appConfig.templatesPath || defaultAppConfig.templatesPath,
    distPath = appConfig.distPath || defaultAppConfig.distPath,
    genPath = appConfig.genPath || defaultAppConfig.genPath,
    templatesResolved = path.resolve(basePath, templatesPath);
  var indexFiles = defaultAppConfig.indexFiles;
  if (appConfig.entry) {
    entry = appConfig.entry;
  } else {
    entry = {
      'polyfills': sourceResolved + '/polyfills.browser.ts',
      'main': sourceResolved + '/main.browser.ts'
    }
  }
  if (appConfig.junit) {
    junit = {
      outputDir: path.resolve(basePath, appConfig.junit.dir), // results will be saved as $outputDir/$browserName.xml
      outputFile: 'TEST-' + appConfig.junit.title + '.xml', // if included, results will be saved as $outputDir/$browserName/$outputFile
      suite: appConfig.junit.title, // suite will become the package name attribute in xml testsuite element
      useBrowserName: false // add browser name to report and classes names
    }
  } else {
    junit = {
      outputDir: path.resolve(basePath, 'dist', 'test-reports'), // results will be saved as $outputDir/$browserName.xml
      outputFile: 'TEST-' + defaultAppConfig.junit.name + '.xml', // if included, results will be saved as $outputDir/$browserName/$outputFile
      suite: defaultAppConfig.junit.name, // suite will become the package name attribute in xml testsuite element
      useBrowserName: false // add browser name to report and classes names
    }
  }
  if (appConfig.indexFiles) {
    indexFiles = appConfig.indexFiles;
  } else {
    // refresh with current source path
    indexFiles[0].template = path.resolve(srcPath, 'index.html');
  }
  var config = {
    basePath: basePath,
    srcPath: srcPath,
    testPath: testPath,
    src: sourceResolved,
    test: testPathResolved,
    pwa: appConfig.pwa,
    watchURL: appConfig.watchURL || 'http://localhost:3000',
    testBundle: defaultAppConfig.testBundle,
    templates: templatesResolved || srcPath + '/' + templatesPath,
    templatesPath: templatesPath,
    srcSASS: appConfig.srcSASS || path.resolve(sourceResolved, 'scss'),
    srcI18N: appConfig.srcI18N || path.resolve(sourceResolved, 'app', 'i18n'),
    srcIMG: appConfig.srcIMG || path.resolve(sourceResolved, 'img'),
    modulesPath: appConfig.modulesPath || path.resolve(basePath, 'node_modules'),
    testSpecs: appConfig.testSpecs || testPathResolved + defaultAppConfig.specs,
    distPath: distPath,
    dist: appConfig.dist || path.resolve(distPath),
    genPath: genPath,
    junit: junit,
    copy: appConfig.copy || defaultAppConfig.copy,
    indexFiles: indexFiles,
    gen: appConfig.gen || path.resolve(genPath),
    chunks: appConfig.chunks || defaultAppConfig.chunks,
    globals: appConfig.globals || defaultAppConfig.globals,
    entry: entry,
    mangle: appConfig.mangle || defaultAppConfig.mangle,
    proxy: appConfig.proxy || defaultAppConfig.proxy,
    title: appConfig.title || defaultAppConfig.title
  };
  debugLog('Using following appConfig:', config);
  return config;
}

/**
 * Use the provided (as process.env var) config file and merge it with the default
 */
function getAppConfig() {
  return mergeAppConfig(providedAppConfig);
}

exports.DEBUG_ENV = DEBUG_ENV;
exports.isDebug = isDebug;
exports.mergeAppConfig = mergeAppConfig;
exports.getAppConfig = getAppConfig;
exports.hasProcessFlag = hasProcessFlag;
exports.isWebpackDevServer = isWebpackDevServer;
exports.root = root;
exports.checkNodeImport = checkNodeImport;
