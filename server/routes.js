var viewController = require('./controllers/viewController');
var authController = require('./controllers/authController');
var profileController = require('./controllers/profileController');
var userController = require('./controllers/userController');
var homeController = require('./controllers/homeController');

module.exports = function (app) {
    app.get('/', homeController.index);
    //app.get('/privacy', viewController.privacy);
    //app.get('/terms', viewController.terms);
    //app.get('/profile', profileController.index);
    //app.get('/oauth/linkedin', authController.authorize);
    //app.get('/oauth/linkedin/callback', authController.authorizationCallback);
    app.get('/login', userController.getLogin);

    app.use(function(req, res, next) {
        res.redirect('/');
    });
};