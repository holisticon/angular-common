"use strict";

/**
 * Karma Config
 *
 * @author: Martin Reinhardt (hypery2k)
 */

const util = require('util');
const helpers = require('./helpers');
const debugLog = util.debuglog(helpers.DEBUG_ENV);
const isDebug = helpers.isDebug();
const appConfig = helpers.getAppConfig();
const webpackConfig = require('./webpack.dev-test.js');
delete webpackConfig.entry;

const JUNIT = appConfig.junit;
const specs = appConfig.testSpecs;
const bundle = appConfig.testBundle;

module.exports = function(config) {

    config.set({

        // see https://github.com/karma-runner/karma-junit-reporter/issues/61
        browserNoActivityTimeout: 120000,

        // base path that will be used to resolve all patterns (e.g. files, exclude)
        basePath: '',

        // see https://github.com/angular/angular-cli/issues/2125
        mime: {
            'text/x-typescript': ['ts', 'tsx']
        },

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
            bundle
        ],

        /*
         * preprocess matching files before serving them to the browser
         * available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
         */
        preprocessors: {
            [bundle]: ['coverage', 'webpack', 'sourcemap']
        },

        webpack: webpackConfig,


        coverageReporter: {
            type: 'in-memory'
        },

        coverageIstanbulReporter: {
            reports: ['text-summary'],
            fixWebpackSourcePaths: true
        },

        remapCoverageReporter: {
            'text-summary': null,
            json: 'target/ccoverage/coverage.json',
            html: 'target/ccoverage/html'
        },

        // Webpack please don't spam the console when running in karma!
        //webpackServer: {noInfo: true},

        webpackMiddleware: {
            stats: { // Add asset Information
                assets: isDebug,
                // Sort assets by a field
                assetsSort: "field",
                // Add information about cached (not built) modules
                cached: isDebug,
                // Add children information
                children: isDebug,
                // Add chunk information (setting this to `false` allows for a less verbose output)
                chunks: isDebug,
                // Add built modules information to chunk information
                chunkModules: isDebug,
                // Add the origins of chunks and chunk merging info
                chunkOrigins: isDebug,
                // Sort the chunks by a field
                chunksSort: "field",
                // Context directory for request shortening
                context: appConfig.srcPath,
                // Add errors
                errors: true,
                // Add details to errors (like resolving log)
                errorDetails: true,
                colors: true
            }
        },
        /*
         * test results reporter to use
         *
         * possible values: 'dots', 'progress'
         * available reporters: https://npmjs.org/browse/keyword/karma-reporter
         */
        reporters: ['progress', 'junit', 'coverage', 'remap-coverage', 'kjhtml'],

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
         * custom launchers to run tests with
         */
        customLaunchers: {
            Chrome_headless: {
                base: 'Chrome',
                flags: ['--headless', '--disable-gpu']
            }
        },

        /*
         * start these browsers
         * available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
         */
        browsers: [
            'PhantomJS',
            //'Chrome_headless'
        ],

        /*
         * Continuous Integration mode
         * if true, Karma captures browsers, runs the tests and exits
         */
        singleRun: false
    });

    config.files.push({ pattern: specs, watched: false });
    config.preprocessors[specs] = ['webpack', 'sourcemap'];

    debugLog('Using following karma config:', config);
};