var passport = require('passport');
var viewController = require('./controllers/viewController');
var authController = require('./controllers/authController');
var profileController = require('./controllers/profileController');
var userController = require('./controllers/userController');
var homeController = require('./controllers/homeController');

module.exports = function (app) {

    const passportConfig = require('../config/passport');

    app.get('/', homeController.index);
    app.get('/signup', userController.getSignup);
    app.post('/signup', userController.postSignup);
    //app.get('/privacy', viewController.privacy);
    //app.get('/terms', viewController.terms);
    //app.get('/profile', profileController.index);
    //app.get('/oauth/linkedin', authController.authorize);
    //app.get('/oauth/linkedin/callback', authController.authorizationCallback);
    app.get('/login', userController.getLogin);
    app.get('/logout', userController.logout);
    app.get('/account/profile', passportConfig.isAuthenticated, userController.getAccount);


    app.get('/auth/linkedin', passport.authenticate('linkedin', { state: 'hhfyWEWJhKGQF' }));
    app.get('/oauth/linkedin/callback', passport.authenticate('linkedin', { state: 'hhfyWEWJhKGQF', failureRedirect: '/login' }), (req, res) => {
        res.redirect(req.session.returnTo || '/');
    });
};