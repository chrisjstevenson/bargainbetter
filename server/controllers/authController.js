var authController = module.exports;
var config = require('../../config/config');
var scope = ['r_basicprofile', 'r_emailaddress'];
const Linkedin = require('node-linkedin')(process.env.LINKEDIN_ID, process.env.LINKEDIN_SECRET);

authController.authorize = function (req, res) {
    Linkedin.auth.setCallback(process.env.LINKEDIN_CALLBACK_URL);
    Linkedin.auth.authorize(res, scope);
};

authController.authorizationCallback = function(req, res) {
    Linkedin.auth.getAccessToken(res, req.query.code, req.query.state, function (err, results) {
        if (err) {
            return console.error(err);
        }

        return res.redirect(`/profile?t=${results.access_token}`);
    });
};