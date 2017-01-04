var passport = require('passport');
var viewController = require('./controllers/viewController');
var userController = require('./controllers/userController');
var homeController = require('./controllers/homeController');

module.exports = function (app) {

    const passportConfig = require('../config/passport');

    app.get('/', homeController.index);
    app.get('/signup', userController.getSignup);
    app.post('/signup', userController.postSignup);

    //app.get('/privacy', viewController.privacy);
    //app.get('/terms', viewController.terms);
    app.get('/login', userController.getLogin);
    app.post('/login', userController.postLogin);
    app.get('/logout', userController.logout);
    app.get('/account', passportConfig.isAuthenticated, userController.getAccount);
    app.post('/account', passportConfig.isAuthenticated, userController.postUpdateProfile);
    app.get('/account/unlink/:provider', passportConfig.isAuthenticated, userController.getOauthUnlink);
    app.post('/account/delete', passportConfig.isAuthenticated, userController.postDeleteAccount);

    app.get('/auth/linkedin', passport.authenticate('linkedin', { state: 'hhfyWEWJhKGQF' }));
    app.get('/auth/linkedin/callback', passport.authenticate('linkedin', { failureRedirect: '/login' }), (req, res) => {
        res.redirect('/');
    });
};