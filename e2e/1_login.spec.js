describe('BargainBetter', function() {

    describe('Login', function() {

        const email = 'user@bargainbetter.com';

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

        it('should navigate to login view', function(browser) {
            browser
                .url(browser.launch_url)
                .waitForElementVisible('body')
                .click('body > div.masthead > div > nav > ul > li:nth-child(5) > a')
                .assert.title('Login - BargainBetter');
        });

        it('it should click create an account link', function(browser) {
            browser
                .click('.page-header > p > a')
                .assert.containsText('h3', "Sign up");
        });

        it ('it should create new account with default credentials', function(browser) {

            browser
                .setValue('input[name="email"]', [email])
                .setValue('input[name="password"]', ['abc123'])
                .setValue('input[name="confirmPassword"]', ['abc123'])

                .click('.btn-success')
                .waitForElementVisible('.dropdown-toggle')

                .assert.title('Home - BargainBetter')
                .assert.containsText('span', email);
        });

        it ('should NOT create an account with a duplicate email address', function(browser) {
            var email = 'user@bargainbetter.com';

            browser
                .url(browser.launch_url + '/logout')
                .url(browser.launch_url + '/signup')
                .setValue('input[name="email"]', [email])
                .setValue('input[name="password"]', ['abc123'])
                .setValue('input[name="confirmPassword"]', ['abc123'])

                .click('.btn-success')

                .assert.containsText('.alert > div', "Account with that email address already exists.")
                .end();
        });

        it ('should allow a user to login with default credentials', function(browser) {
            browser
                .url(browser.launch_url + '/logout')
                .url(browser.launch_url + '/login')
                .setValue('input[name="email"]', [email])
                .setValue('input[name="password"]', ['abc123'])

                .click('.btn.btn-primary')

                .waitForElementVisible('.dropdown-toggle')

                .assert.title('Home - BargainBetter')
                .assert.containsText('span', email);
        });

        //it ('should allow a user to login with linked-in credentials', function(browser) {
        //    browser
        //        .url(browser.launch_url + '/logout')
        //        .url(browser.launch_url + '/login')
        //        .setValue('input[name="email"]', [email])
        //        .setValue('input[name="password"]', ['abc123'])
        //
        //        .click('.btn.btn-primary')
        //
        //        .waitForElementVisible('.dropdown-toggle')
        //
        //        .assert.title('Home - BargainBetter')
        //        .assert.containsText('span', email);
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