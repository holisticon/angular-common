"use strict";

/**
 * Karma Config for CI servers
 *
 * @author: Martin Reinhardt (hypery2k)
 */

const baseConfig = require('./karma.conf.js');
const defaultAppConfig = require('./appConfig');
const appConfig = require(process.env.APP_CONFIG || './appConfig');
const webpackConfig = require('./webpack.test.js');
delete webpackConfig.entry;

const bundle = defaultAppConfig.testBundlePath;
const specs = appConfig.testSpecs;

module.exports = function (config) {

  // Load base config
  baseConfig(config);
  // Override base config
  config.set({
    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true,

    autoWatch: false,

    preprocessors: {
      [bundle]: ['coverage', 'webpack', 'sourcemap'],
      [specs]: ['webpack', 'sourcemap']
    },

    webpack: webpackConfig

  });
};
