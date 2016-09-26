var viewController = require('./controllers/viewController');
var authController = require('./controllers/authController');
var profileController = require('./controllers/profileController');

module.exports = function (app) {
    app.get('/', viewController.index);
    app.get('/privacy', viewController.privacy);
    app.get('/terms', viewController.terms);
    app.get('/profile', profileController.index);
    app.get('/oauth/linkedin', authController.authorize);
    app.get('/oauth/linkedin/callback', authController.authorizationCallback);
};