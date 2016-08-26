var viewController = require('./controllers/viewController');
var authController = require('./controllers/authController');
var profileController = require('./controllers/profileController');

module.exports = function (app) {
    app.get('/', viewController.index);

    app.get('/profile', profileController.index);
    app.get('/profile/:token', profileController.register);
    app.get('/oauth/linkedin', authController.authorize);
    app.get('/oauth/linkedin/callback', authController.authorizationCallback);

};