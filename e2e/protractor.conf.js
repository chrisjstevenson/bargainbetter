exports.config = {
    allScriptsTimeout: 11000,
    getPageTimeout: 10000,
    specs: [
        '*.spec.js'
    ],
    capabilities: {
        'browserName': 'chrome'
    },
    baseUrl: 'http://localhost:9002',
    framework: 'jasmine',
    jasmineNodeOpts: {
        defaultTimeoutInterval: process.env.PROTRACTOR_DEBUG ? 9999999 : 30000
    },
    onPrepare: function () {
        browser.ignoreSynchronization = true;
        browser.driver.manage().window().setSize(1280, 1024);
        return browser.driver.get(browser.baseUrl);
    }
};