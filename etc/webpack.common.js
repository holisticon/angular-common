"use strict";

/**
 * Webpack Profile which is shared
 *
 * @author: Martin Reinhardt (hypery2k)
 */

const util = require('util');
const path = require('path');
const os = require('os');
const helpers = require('./helpers');
const appConfig = helpers.getAppConfig();
const debugLog = util.debuglog(helpers.DEBUG_ENV);
const isDebug = helpers.isDebug();
// WEBPACK
const webpack = require('webpack');

/*
 * Webpack Plugins
 */
const CheckerPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;
const TsConfigPathsPlugin = require('awesome-typescript-loader').CheckerPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');

debugLog('Using following appConfig:', appConfig);
/*
 * Webpack Constants
 */
const ENV = process.env.ENV || process.env.NODE_ENV || 'test';
const METADATA = {
    title: 'Holisticon',
    baseUrl: '/',
    isDevServer: helpers.isWebpackDevServer()
};

/*
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
var config = {

    stats: {
        // Add asset Information
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
        errorDetails: isDebug,
        // Add the hash of the compilation
        hash: isDebug,
        // Add built modules information
        modules: isDebug,
        // Sort the modules by a field
        modulesSort: "field",
        // Add public path information
        publicPath: isDebug,
        // Add information about the reasons why modules are included
        reasons: isDebug,
        // Add the source code of modules
        source: isDebug,
        // Add timing information
        timings: isDebug,
        // Add webpack version information
        version: isDebug,
        // Add warnings
        warnings: isDebug
    },
    /*
     * The entry point for the bundle
     * Our Angular.js app
     *
     * See: http://webpack.github.io/docs/configuration.html#entry
     */
    entry: appConfig.entry,

    /*
     * Options affecting the resolving of modules.
     *
     * See: http://webpack.github.io/docs/configuration.html#resolve
     */
    resolve: {

        /*
         * An array of extensions that should be used to resolve modules.
         *
         * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
         */
        extensions: ['.aot.ts', '.ts', '.js', '.json'],

        // Make sure root is src
        modules: [
            appConfig.src,
            'node_modules'
        ]
    },

    /*
     * Options affecting the normal modules.
     *
     * See: http://webpack.github.io/docs/configuration.html#module
     */
    module: {

        // resolve https://github.com/holisticon/angular-common/issues/10
        exprContextCritical: false,

        /*
         * An array of automatically applied loaders.
         *
         * IMPORTANT: The loaders here are resolved relative to the resource which they are applied to.
         * This means they are not resolved relative to the configuration file.
         *
         * See: http://webpack.github.io/docs/configuration.html#module-loaders
         */
        rules: [
            // PRE-LOADERS
            {
                test: /\.ts$/,
                loader: 'string-replace-loader',
                options: {
                    search: '(System|SystemJS)(.*[\\n\\r]\\s*\\.|\\.)import\\((.+)\\)',
                    replace: '$1.import($3).then(mod => (mod.__esModule && mod.default) ? mod.default : mod)',
                    flags: 'g'
                },
                include: [helpers.root('src')],
                enforce: 'pre'
            },

            /*
             * Tslint loader support for *.ts files
             *
             * See: https://github.com/wbuchwalter/tslint-loader
             */
            {
                test: /\.ts$/,
                loader: 'tslint-loader',
                exclude: [
                    /node_modules/,
                    /\.(html|css|sass)$/
                ],
                enforce: 'pre'
            },

            /*
             * Source map loader support for *.js files
             * Extracts SourceMaps for source files that as added as sourceMappingURL comment.
             *
             * See: https://github.com/webpack/source-map-loader
             */
            {
                test: /\.js$/,
                loader: 'source-map-loader',
                exclude: [
                    path.resolve(__dirname, '../../../../node_modules'),
                ],
                enforce: 'pre'
            },
            // LOADERS
            /*
             * Typescript loader support for .ts and Angular 2 async routes via .async.ts
             *
             * See: https://github.com/s-panferov/awesome-typescript-loader
             */
            {
                test: /\.ts$/,
                loaders: appConfig.entryModule ? [
                    'awesome-typescript-loader',
                    '@ngtools/webpack'
                ] : [
                    'awesome-typescript-loader'
                ]
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            },
            // https://github.com/jtangelder/sass-loader#usage
            // TODO appConfig.srcSASS
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            },
            /*
             * to string and css loader support for *.css files
             * Returns file content as string
             *
             */
            {
                test: /\.css$/,
                loaders: ['to-string-loader', 'css-loader'],
                exclude: [/\.(html|css)$/]
            },

            /* Raw loader support for *.html
             * Returns file content as string
             *
             * See: https://github.com/webpack/raw-loader
             */
            {
                test: /\.(html|xml)$/,
                loader: 'raw-loader'
            },
            /* JSON loader support for *.jspn
             * Returns file content as string
             *
             * See: https://github.com/webpack/json-loader
             */
            {
                test: /\.(json)$/,
                loader: 'json-loader'
            }

        ]

    },

    /*
     * Add additional plugins to the compiler.
     *
     * See: http://webpack.github.io/docs/configuration.html#plugins
     */
    plugins: [

        /**
         * Advanced typescript path resolution
         *
         * See: https://github.com/s-panferov/awesome-typescript-loader#advanced-path-resolution-in-typescript-20
         */
        new TsConfigPathsPlugin(),

        /*
         * Plugin: CheckerPlugin
         * Description: Do type checking in a separate process, so webpack don't need to wait.
         *
         * See: https://github.com/s-panferov/awesome-typescript-loader#configuration
         */
        new CheckerPlugin(),

        /*
         * Plugin: OccurenceOrderPlugin
         * Description: Varies the distribution of the ids to get the smallest id length
         * for often used ids.
         *
         * See: https://webpack.github.io/docs/list-of-plugins.html#occurrenceorderplugin
         * See: https://github.com/webpack/docs/wiki/optimization#minimize
         */
        new webpack.optimize.OccurrenceOrderPlugin(true),

        /*
         * Plugin: CopyWebpackPlugin
         * Description: Copy files and directories in webpack.
         *
         * Copies project static assets.
         *
         * See: https://www.npmjs.com/package/copy-webpack-plugin
         */
        new CopyWebpackPlugin(appConfig.copy),
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
        new webpack.DefinePlugin({
            'ENV': JSON.stringify(ENV),
            'HMR': false,
            'process.env': {
                'ENV': JSON.stringify(ENV),
                'NODE_ENV': JSON.stringify(ENV),
                'HMR': false
            }
        })
    ],

    /*
     * Include polyfills or mocks for various node stuff
     * Description: Node configuration
     *
     * See: https://webpack.github.io/docs/configuration.html#node
     */
    node: {
        global: true,
        crypto: 'empty',
        module: false,
        clearImmediate: false,
        setImmediate: false
    }

};

if (os.platform() !== 'win32') {
    // FIXME, see https://github.com/holisticon/angular-common/issues/11
    config.plugins.push(
        /**
         * Plugin: NotifierPlugin
         * See: https://github.com/Turbo87/webpack-notifier#usage
         */
        new WebpackNotifierPlugin());
}

/*
 * Plugin: HtmlWebpackPlugin
 * Description: Simplifies creation of HTML files to serve your webpack bundles.
 * This is especially useful for webpack bundles that include a hash in the filename
 * which changes every compilation.
 *
 * See: https://github.com/ampedandwired/html-webpack-plugin
 */
for (var indexConfig of appConfig.indexFiles) {
    config.plugins.push(new HtmlWebpackPlugin(indexConfig));
}

// add additional settings here
if (appConfig.additionalWebpackOptions) {
    config = webpackMerge(config, appConfig.additionalWebpackOptions);
}
debugLog('Using following webpack common config:', config);
module.exports = config;