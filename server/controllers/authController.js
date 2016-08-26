var config = require('../../config/config');
var scope = ['r_basicprofile', 'r_emailaddress'];

module.exports.authorize = function (req, res) {
    Linkedin.auth.setCallback(config.callBackUrl);
    Linkedin.auth.authorize(res, scope);
};

module.exports.authorizationCallback = function(req, res) {
    Linkedin.auth.getAccessToken(res, req.query.code, req.query.state, function (err, results) {
        if (err) {
            return console.error(err);
        }

        return res.redirect(`/profile?t=${results.access_token}`);
    });
}