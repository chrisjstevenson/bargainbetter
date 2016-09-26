// Slightly modified from https://github.com/angular/protractor/issues/610
module.exports.waitForUrl = function (urlRegex) {
    return browser.wait(function () {
        return browser.getCurrentUrl()
            .then(function (url) {
                return new RegExp(urlRegex).test(url);
            });
    });
};