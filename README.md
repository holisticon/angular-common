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
npm install @holisticon/angular-common --save-dev
```

Or if you want to use the development version (nightly build), which maybe not stable!:

```
npm install @holisticon/angular-common@next --save-dev
```
## Usage

### Basic Usage
* Create an config path, e.g. etc/appConfig.js:

```javascript
var appConfig = {
  srcPath: 'src/main/frontend',
  testPath: 'src/test/frontend',
  junit: {
    name: 'My-TestApp',
    dir: 'target/surefire-reports'
  },
};

module.exports = appConfig;

```

And provide dummy files for
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

#### Multiple Entries

```javascript
var path = require("path"),
  srcPath = 'src/main/frontend',
  testPath = 'src/test/frontend',
  sourceRoot = path.resolve(__dirname, '..', srcPath);

var appConfig = {
  srcPath: srcPath,
  testPath: testPath,
  entry: {
    'polyfills': sourceRoot + '/polyfills.browser.ts',
    'app': sourceRoot + '/main.browser.ts',
    'app2': sourceRoot + '/customer.browser.ts'
  },
  ...
};

module.exports = appConfig;

```

#### JUnit-Report customization

```javascript
...
var appConfig = {
  ...
    junit: {
    title: 'MyProject',
    dir: 'dist/test-reports'
  },
  ...
};

module.exports = appConfig;

```


#### Add additional webpack options:

Add entries to the property *additionalWebpackOptions*:
```javascript
...
  additionalWebpackOptions: {
    plugins: [
      /* use only de and en locale */
      new webpack.NormalModuleReplacementPlugin(
        /moment[\/\\]locale$/,
        /de|en/
      )
    ]
  },
module.exports = appConfig;

```

