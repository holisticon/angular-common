"use strict";

/**
 * Webpack Profile for Production
 *
 * @author: Martin Reinhardt (hypery2k)
 */
const util = require('util');
const helpers = require('./helpers');
const appConfig = helpers.getAppConfig();
const webpack = require('webpack');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const commonConfig = require('./webpack.common.js'); // the settings that are common to prod and dev

/**
 * Webpack Plugins
 */
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const ProvidePlugin = webpack.ProvidePlugin;
const DefinePlugin = webpack.DefinePlugin;
const NormalModuleReplacementPlugin = webpack.NormalModuleReplacementPlugin;
const IgnorePlugin = webpack.IgnorePlugin;
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const WebpackMd5Hash = require('webpack-md5-hash');
const OfflinePlugin = require('offline-plugin');
const AotPlugin = require("@ngtools/webpack").AotPlugin;

/**
 * Webpack Constants
 */
const ENV = process.env.ENV || process.env.NODE_ENV || 'production';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8080;
const METADATA = webpackMerge(commonConfig.metadata, {
    host: HOST,
    port: PORT,
    ENV: ENV,
    HMR: false
});

let config = webpackMerge(commonConfig, {

    /**
     * Options affecting the output of the compilation.
     *
     * See: http://webpack.github.io/docs/configuration.html#output
     */
    output: {

        /**
         * The output directory as absolute path (required).
         *
         * See: http://webpack.github.io/docs/configuration.html#output-path
         */
        path: appConfig.dist,

        /**
         * Specifies the name of each output file on disk.
         * IMPORTANT: You must not specify an absolute path here!
         *
         * See: http://webpack.github.io/docs/configuration.html#output-filename
         */
        filename: '[name].[chunkhash].bundle.js',

        devtool: 'hidden-source-map',

        /**
         * The filename of non-entry chunks as relative path
         * inside the output.path directory.
         *
         * See: http://webpack.github.io/docs/configuration.html#output-chunkfilename
         */
        chunkFilename: '[id].[chunkhash].chunk.js'

    },

    /**
     * Add additional plugins to the compiler.
     *
     * See: http://webpack.github.io/docs/configuration.html#plugins
     */
    plugins: [

        /*
         * Plugin: CheckerPlugin
         * Description: Do type checking in a separate process, so webpack don't need to wait.
         *
         * See: https://github.com/s-panferov/awesome-typescript-loader#configuration
         */
        new CheckerPlugin(),


        /**
         * Plugin: WebpackMd5Hash
         * Description: Plugin to replace a standard webpack chunkhash with md5.
         *
         * See: https://www.npmjs.com/package/webpack-md5-hash
         */
        new WebpackMd5Hash(),

        /**
         * Plugin: DefinePlugin
         * Description: Define free variables.
         * Useful for having development builds with debug logging or adding global constants.
         *
         * Environment helpers
         *
         * See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
         */
        // NOTE: when adding more properties make sure you include them in custom-typings.d.ts
        new DefinePlugin({
            'ENV': JSON.stringify(METADATA.ENV),
            'HMR': METADATA.HMR,
            'process.env': {
                'ENV': JSON.stringify(ENV),
                'NODE_ENV': JSON.stringify(METADATA.ENV),
                'HMR': METADATA.HMR
            }
        }),

        /**
         * Plugin: UglifyJsPlugin
         * Description: Minimize all JavaScript output of chunks.
         * Loaders are switched into minimizing mode.
         *
         * See: https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
         // NOTE: To debug prod builds uncomment //debug lines and comment //prod lines
         */
        new UglifyJsPlugin({
            debug: false,
            // beautify: true, //debug
            //mangle: false, //debug
            // dead_code: false, //debug
            // unused: false, //debug
            // deadCode: false, //debug
            // compress: {
            //   screw_ie8: true,
            //   keep_fnames: true,
            //   drop_debugger: false,
            //   dead_code: false,
            //   unused: false
            // }, // debug
            // comments: true, //debug
            sourceMap: false, //prod
            beautify: false, //prod
            mangle: {
                except: appConfig.mangle.except || ['jQuery', 'angular'],
                screw_ie8: true,
                sequences: true, // join consecutive statemets with the “comma operator”
                properties: true, // optimize property access: a["foo"] → a.foo
                dead_code: true, // discard unreachable code
                drop_debugger: true, // discard “debugger” statements
                unsafe: false, // some unsafe optimizations (see below)
                conditionals: true, // optimize if-s and conditional expressions
                comparisons: true, // optimize comparisons
                evaluate: true, // evaluate constant expressions
                booleans: true, // optimize boolean expressions
                loops: true, // optimize loops
                unused: true, // drop unused variables/functions
                hoist_funs: true, // hoist function declarations
                hoist_vars: false, // hoist variable declarations
                if_return: true, // optimize if-s followed by return/continue
                join_vars: true, // join var declarations
                cascade: true, // try to cascade `right` into `left` in sequences
                side_effects: true, // drop side-effect-free statements
                warnings: false,
                global_defs: { // global definitions
                    NODE_ENV: METADATA.ENV,
                    ENV: METADATA.ENV
                }
            }, //prod
            compress: {
                screw_ie8: true
            }, //prod
            comments: false //prod
        }),
        // enforce linting on prod build
        new webpack.LoaderOptionsPlugin({
            test: /\.ts/i,
            options: {
                tslint: {
                    enforce: 'pre',
                    emitErrors: true,
                    failOnHint: true
                }
            }
        }),

        /**
         * Plugin: NormalModuleReplacementPlugin
         * Description: Replace resources that matches resourceRegExp with newResource
         *
         * See: http://webpack.github.io/docs/list-of-plugins.html#normalmodulereplacementplugin
         */

        new NormalModuleReplacementPlugin(
            /angular2-hmr/,
            helpers.root('config/modules/angular2-hmr-prod.js')
        ),

        /**
         * Plugin: IgnorePlugin
         * Description: Don’t generate modules for requests matching the provided RegExp.
         *
         * See: http://webpack.github.io/docs/list-of-plugins.html#ignoreplugin
         */

        // new IgnorePlugin(/angular2-hmr/),

        /**
         * Plugin: CompressionPlugin
         * Description: Prepares compressed versions of assets to serve
         * them with Content-Encoding
         *
         * See: https://github.com/webpack/compression-webpack-plugin
         */
        //  install compression-webpack-plugin
        // new CompressionPlugin({
        //   regExp: /\.css$|\.html$|\.js$|\.map$/,
        //   threshold: 2 * 1024
        // })

    ]

});
if (appConfig.pwa) {
    config.plugins.push(new OfflinePlugin(appConfig.pwa));
}
if (appConfig.entryModule) {
    // Angular AOT compiler
    config.plugins.push(new AotPlugin({
        tsConfigPath: 'tsconfig.aot.json',
        entryModule: appConfig.entryModule,
        typeChecking: false
    }));
}
module.exports = config