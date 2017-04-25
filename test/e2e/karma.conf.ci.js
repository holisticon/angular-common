/**
 * @author: hypery2k
 */
process.env['APP_CONFIG'] = require("path").resolve(__dirname, 'appConfigTest.js');
module.exports = require('@holisticon/angular-common').karma_ci;
