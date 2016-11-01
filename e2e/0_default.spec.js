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
                .assert.title('Home - BargainBetter')
                .end()
        });

        it('should navigate to login view', function(browser) {
            browser
                .url(browser.launch_url)
                .waitForElementVisible('body')
                .click('body > div.masthead > div > nav > ul > li:nth-child(5) > a')
                .assert.title('Login - BargainBetter')
                .end();
        });

        //it('it should click register button', (client) => {
        //    client
        //        .url(client.launch_url)
        //        .waitForElementVisible('body')
        //        .click('.btn')
        //        .assert.title('Authorize | LinkedIn')
        //        .end()
        //});
        //
        //it('it should authorize with linkedIn', (client) => {
        //    client
        //        .url(client.launch_url)
        //        .waitForElementVisible('body')
        //        .click('.btn')
        //        .pause(1000);
        //
        //client.setValue('input[name="session_key"]', ['chris.j.stevenson2@gmail.com']);
        //client
        //    .setValue('input[name="session_password"', ['bargainTest'])
        //    .click('input[name="authorize"]')
        //    .pause(2000)
        //    .assert.containsText('h1', "Thank you for signing up!")
        //    .end();
        //});
    });
});