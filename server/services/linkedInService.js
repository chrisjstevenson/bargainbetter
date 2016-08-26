var Guid = require('guid');

module.exports.getProfile = function getProfile(access_token)
{
    return new Promise(function (resolve, reject) {
        var linkedin = Linkedin.init(access_token);
        linkedin.people.me(function(err, res) {
            if (err) {
                console.log(err);
                return reject(err);
            }
            return resolve(res)
        });
    })
};