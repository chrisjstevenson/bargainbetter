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
    app.get('/logout', userController.logout);
    app.get('/account/profile', passportConfig.isAuthenticated, userController.getAccount);


    app.get('/auth/linkedin', passport.authenticate('linkedin', { state: 'hhfyWEWJhKGQF' }));
    app.get('/auth/linkedin/callback', passport.authenticate('linkedin', { failureRedirect: '/login' }), (req, res) => {
        res.redirect('/');
    });
};