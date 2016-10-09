/**
 * @author: @martinreinhardt
 */
const baseConfig = require('./karma.conf.js');
const defaultAppConfig = require('./appConfig');
const appConfig = require(process.env.APP_CONFIG || './appConfig');

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
      [specs]: ['coverage', 'webpack', 'babel', 'sourcemap']
    },

    babelPreprocessor: {
      options: {
        presets: ['es2015'],
        plugins: [
          "transform-decorators-legacy",
          "transform-es2015-arrow-functions",
          "transform-es2015-block-scoping",
          "transform-es2015-classes",
          "transform-es2015-constants",
          "transform-es2015-destructuring",
          "transform-es2015-modules-commonjs",
          "transform-es2015-object-super",
          "transform-class-properties"
        ]
      }
    }

  });
};
