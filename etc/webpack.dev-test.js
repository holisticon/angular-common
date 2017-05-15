"use strict";

/**
 * Webpack Profile for Development
 *
 * @author: Martin Reinhardt (hypery2k)
 */

/**
 * @author: hypery2k
 */
const util = require('util');
const helpers = require('./helpers');
const appConfig = helpers.getAppConfig();

// WEBPACK
const webpack = require('webpack');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const testConfig = require('./webpack.test.js'); // the settings that are common to prod and dev

/**
 * Webpack Plugins
 */
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
let config =  webpackMerge(commonConfig, {

  plugins: [
    /**
     * Plugin: Open Browser Webpack Plugin
     *
     * See: https://github.com/baldore/open-browser-webpack-plugin#usage
     */
    new OpenBrowserPlugin({ url: 'http://localhost:9876/debug.html?' })
  ]

});

module.exports = config
