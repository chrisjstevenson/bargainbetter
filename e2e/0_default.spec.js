describe('BargainBetter', function() {

    describe('Home', function() {

        before(function(browser, done) {
            done();
        });

        after(function(browser, done) {
            browser.end(function() {
                done();
            });
        });

        afterEach(function(browser, done) {
            done();
        });

        beforeEach(function(browser, done) {
            done();
        });

        it('should have a title', function(browser) {
            browser
                .url(browser.launch_url)
                .waitForElementVisible('body')
                .assert.title('Home - BargainBetter');
                //.end()
        });

        it('should continiue on to linked-in', function(browser) {
            browser
                .click('.btn')
                .waitForElementVisible('.note')
                .end();
        });
    });
});