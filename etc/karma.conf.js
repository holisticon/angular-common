/**
 * @author: hypery2k
 */
var util = require('util');
var debugLog = util.debuglog('@holisticon/angular-common/karma.conf');
const helpers = require('./helpers');
const appConfig = helpers.getAppConfig();
const webpackConfig = require('./webpack.test.js');
webpackConfig.entry = {};

const JUNIT = appConfig.junit;
const specs = appConfig.testSpecs;
const bundle = appConfig.testBundle;

module.exports = function (config) {

  config.set({

    // see https://github.com/karma-runner/karma-junit-reporter/issues/61
    browserNoActivityTimeout: 30000,

    // base path that will be used to resolve all patterns (e.g. files, exclude)
    basePath: '',

    /*
     * Frameworks to use
     *
     * available frameworks: https://npmjs.org/browse/keyword/karma-adapter
     */
    frameworks: ['jasmine'],

    // list of files to exclude
    exclude: [],

    /*
     * list of files / patterns to load in the browser
     *
     * we are building the test environment in ./spec-bundle.js
     */
    files: [
      'node_modules/babel-polyfill/dist/polyfill.js',
      bundle
    ],

    /*
     * preprocess matching files before serving them to the browser
     * available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
     */
    preprocessors: {
      [bundle]: ['webpack']
    },

    webpack: webpackConfig,

    coverageReporter: {
      dir: 'target/coverage-reports/',
      reporters: [
        {type: 'text-summary'},
        {type: 'json'},
        {type: 'html'}
      ]
    },

    // Webpack please don't spam the console when running in karma!
    //webpackServer: {noInfo: true},

    webpackMiddleware: {
      stats: {
        colors: true
      }
    },
    /*
     * test results reporter to use
     *
     * possible values: 'dots', 'progress'
     * available reporters: https://npmjs.org/browse/keyword/karma-reporter
     */
    reporters: ['progress', 'junit', 'kjhtml'],

    /**
     * See https://github.com/karma-runner/karma-junit-reporter#configuration
     */
    junitReporter: JUNIT,

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    /*
     * level of logging
     * possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
     */
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes

    autoWatch: true,

    /*
     * start these browsers
     * available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
     */
    browsers: [
      'PhantomJS'
    ],

    /*
     * Continuous Integration mode
     * if true, Karma captures browsers, runs the tests and exits
     */
    singleRun: false
  });

  config.files.push({pattern: specs, watched: false});
  config.preprocessors[specs] = ['webpack', 'sourcemap'];

  debugLog('Using following karma config:', config);
};
