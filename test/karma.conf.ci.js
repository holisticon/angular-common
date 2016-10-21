/**
 * @author: hypery2k
 */
process.env['APP_CONFIG'] = require("path").resolve(__dirname, 'appConfigTest.js');
module.exports = require('../etc/karma.conf.ci.js');
