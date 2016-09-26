describe('BargainBetter', function() {

    describe('Default', function() {

        before(function(client, done) {
            done();
        });

        after(function(client, done) {
            client.end(function() {
                done();
            });
        });

        afterEach(function(client, done) {
            done();
        });

        beforeEach(function(client, done) {
            done();
        });

        it('it should have a title', function(client) {
            client
                .url(client.launch_url)
                .waitForElementVisible('body')
                .assert.title('Bring trust back to e-commerce.')
                .end()
        });

        it('it should click register button', (client) => {
            client
                .url(client.launch_url)
                .waitForElementVisible('body')
                .click('.btn')
                .assert.title('Authorize | LinkedIn')
                .end()
        });

        it('it should authorize with linkedIn', (client) => {
            client
                .url(client.launch_url)
                .waitForElementVisible('body')
                .click('.btn')
                .pause(1000);

        client.setValue('input[name="session_key"]', ['chris.j.stevenson@gmail.com']);
        client
            .setValue('input[name="session_password"', ['Hokies05'])
            .click('input[name="authorize"]')
            .pause(2000)
            .assert.containsText('h1', "Thank you for signing up!")
            .end();
        });
    });
});