/**
 *
 * @module config/helpers
 */

/**
 * path module
 * @type {"path"}
 */
const path = require('path');

require('jasmine-json');

var getAppConfig = require('../etc/helpers').getAppConfig,
  mergeAppConfig = require('../etc/helpers').mergeAppConfig;

describe('getAppConfig', () => {

  it('should read appConfig', () => {
    var appConfig = getAppConfig();
    expect(appConfig).toBeDefined();
    expect(appConfig.testBundle).toBeDefined();
  });

});

describe('mergeAppConfig', () => {


  it('should read default appConfig', () => {
    var config = mergeAppConfig();
    expect(config).toBeDefined();
    var expectation = getAppConfig();
    delete config['junit'];
    delete expectation['junit'];
    expect(config).toEqualJson(expectation);
  });

  it('should work with null config', () => {
    var config = mergeAppConfig(null);
    expect(config).toBeDefined();
    var expectation = getAppConfig();
    delete config['junit'];
    delete expectation['junit'];
    expect(config).toEqualJson(expectation);
  });

  it('should work with empty config', () => {
    var config = mergeAppConfig({});
    expect(config).toBeDefined();
    var expectation = getAppConfig();
    delete config['junit'];
    delete expectation['junit'];
    expect(config).toEqualJson(expectation);
  });

  it('should work with overwritten config', () => {
    var config = mergeAppConfig({ srcPath: 'src', testPath: 'tests' });
    expect(config).toBeDefined();
    var expectation = getAppConfig();
    delete config['junit'];
    delete expectation['junit'];
    expect(config).not.toEqualJson(expectation);
    expect(config.src).toBe(path.resolve(__dirname, '..', 'src'));
    expect(config.srcSASS).toBe(path.resolve(__dirname, '..', 'src', 'scss'));
    expect(config.srcI18N).toBe(path.resolve(__dirname, '..', 'src', 'app', 'i18n'));
    expect(config.srcIMG).toBe(path.resolve(__dirname, '..', 'src', 'img'));
    expect(config.test).toBe(path.resolve(__dirname, '..', 'tests'));
    expect(config.indexFiles[0].template).toBe(path.resolve(__dirname, '..', 'src', 'index.html'));
  });

});
