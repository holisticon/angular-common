/**
 * @author: hypery2k
 */

const util = require('util');
const helpers = require('./helpers');
const appConfig = helpers.getAppConfig();

// WEBPACK
const webpack = require('webpack');

/**
 * Webpack Plugins
 */
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const commonConfig = require('./webpack.common.js'); // the settings that are common to prod and dev

/**
 * Webpack Constants
 */
const ENV = process.env.ENV || process.env.NODE_ENV || 'test';

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */

module.exports = webpackMerge(commonConfig, {

  /**
   * Source map for Karma from the help of karma-sourcemap-loader &  karma-webpack
   *
   * Do not change, leave as is or it wont work.
   * See: https://github.com/webpack/karma-webpack#source-maps
   */
  devtool: 'inline-source-map',


  /**
   * Options affecting the normal modules.
   *
   * See: http://webpack.github.io/docs/configuration.html#module
   */
  module: {
    rules: [
      // POST-LOADERS

      /**
       * Instruments JS files with Istanbul for subsequent code coverage reporting.
       * Instrument only testing sources.
       *
       * See: https://github.com/deepsweet/istanbul-instrumenter-loader
       */
      {
        test: /\.(js|ts)$/,
        loader: 'istanbul-instrumenter-loader',
        include: [
          appConfig.srcPath,
          appConfig.testPath
        ],
        exclude: [
          /\.(e2e|spec)\.ts$/,
          /node_modules/
        ],
        enforce: 'post'
      }

    ]
  },

  /**
   * Add additional plugins to the compiler.
   *
   * See: http://webpack.github.io/docs/configuration.html#plugins
   */
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: null, // if no value is provided the sourcemap is inlined
      lineToLine: true,
      module: false,
      test: /\.(ts|map|js)($|\?)/i // process .js and .ts files only
    }),
    new webpack.LoaderOptionsPlugin({
      test: /\.ts/i,
      options: {
        tslint: {
          enforce: 'pre',
          emitErrors: true,
          failOnHint: false
        }
      }
    }),
    new webpack.DefinePlugin({
      'ENV': JSON.stringify(ENV),
      'HMR': false,
      'process.env': {
        'ENV': JSON.stringify(ENV),
        'NODE_ENV': JSON.stringify(ENV),
        'HMR': false
      },
      'APP_CONFIG': JSON.stringify(appConfig)
    })
  ]

});
