describe('Default', () => {

    //beforeAll(() => {
    //    browser.get('/');
    //});

    it('it should load default', () => {
        browser.get('/');
        browser.wait(protractor.until.elementLocated(by.css('.btn')));
        expect(browser.getCurrentUrl()).toMatch('/');
    });

    it('it should click a button to log into linked-in');
    it('it should redirect to default if no route exists');
});