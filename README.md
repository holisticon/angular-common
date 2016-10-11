# Angular Common Module

[![Build Status](https://travis-ci.org/holisticon/angular-common.svg?branch=master)](https://travis-ci.org/holisticon/angular-common)
[![npm version](https://badge.fury.io/js/%40holisticon%2Fangular-common.svg)](https://badge.fury.io/js/%40holisticon%2Fangular-common)
[![Code Climate](https://codeclimate.com/github/holisticon/angular-common/badges/gpa.svg)](https://codeclimate.com/github/holisticon/angular-common) 
[![Issue Count](https://codeclimate.com/github/holisticon/angular-common/badges/issue_count.svg)](https://codeclimate.com/github/holisticon/angular-common) 
[![Dependency Status](https://david-dm.org/holisticon/angular-common.svg)](https://david-dm.org/holisticon/angular-common) 
[![devDependency Status](https://david-dm.org/holisticon/angular-common/dev-status.svg)](https://david-dm.org/holisticon/angular-common#info=devDependencies)

> A simple module for Angular 2, that encapsulates the complete Webpack build and just requires some basic configuration in the using Angular2 projects without hassle around with the build

[![NPM](https://nodei.co/npm/@holisticon/angular-common.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/@holisticon/angular-common/)

## Installation

```
npm install @holisticon/angular-common --save
```

Or if you want to use the development version (nightly build), which maybe not stable!:

```
npm install @holisticon/angular-common@next --save
```
## Usage

### Basic Usage
* Create an config path, e.g. etc/appConfig.js:
```javascript
var path = require("path");
// resolve paths
var sourceRoot = path.resolve(__dirname, '..', 'src', 'main', 'frontend'),
  testRoot = path.resolve(__dirname, '..', 'src', 'test', 'frontend'),
  distRoot = path.resolve(__dirname, '..', 'src', 'main', 'resources', 'static');
// overwrite defaults
var appConfig = {
  srcPath: 'src/main/frontend',
  testPath: 'src/test/frontend',
  entry: {
    app: sourceRoot + '/scripts/app.js',
    salesboard: sourceRoot + '/scripts/app.salesboard.js',
    assignment: sourceRoot + '/scripts/app.assignment.js'
  },
  srcApp: path.resolve(sourceRoot, 'app'),
  testApp: path.resolve(testRoot, 'specs'),
  srcSASS: path.resolve(sourceRoot, 'scss'),
  srcI18N: path.resolve(sourceRoot, 'app', 'i18n'),
  srcIMG: path.resolve(sourceRoot, 'img'),
  dist: distRoot
};
module.exports = appConfig;

```
And provide a dummy files for
* karma.conf.js:
```javascript
process.env['APP_CONFIG'] = require("path").resolve(__dirname, 'etc', 'appConfig.js');
module.exports = require('@holisticon/angular-common').karma;
```
* karma.conf.ci.js:
```javascript
process.env['APP_CONFIG'] = require("path").resolve(__dirname, 'etc', 'appConfig.js');
module.exports = require('@holisticon/angular-common').karma_ci;
```
* webpack.config.js:
```javascript
process.env['APP_CONFIG'] = require("path").resolve(__dirname, 'etc', 'appConfig.js');
module.exports = require('@holisticon/angular-common').webpack;
```
* Append following entries to your package.json:
```javascript
  ...
  "scripts": {
    "start": "npm install && npm run watch",
    "watch": "cross-env NODE_ENV=development webpack-dev-server --hot --inline --colors --progress --display-error-details --port 3000 ",
    "build": "cross-env NODE_ENV=production webpack",
    "test": "cross-env NODE_ENV=test karma start etc/karma.conf.ci.js",
    "debug": "cross-env NODE_ENV=test karma start etc/karma.conf.js"
  },
  ...
```

### Advanced Usage

TODO multi-app
