process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var ldap = require('ldapjs');
var config = require('./config');

//Set username, password for testing

//authenticate(config.ldap.username, config.ldap.password)
//    .then(console.log('client successfully authenticated'));

module.exports.authenticate = function(uid, password) {

    var client = ldap.createClient({
        url: config.ldap.server
    });

    var searchOptions = {
        searchBase: config.ldap.searchBase,
        scope: 'sub',
        bindDN: 'uid=' + uid + ',' + config.ldap.searchBase,
        bindCredentials: password,
        filter: '(uid=' + uid + ')'
    }

    return new Promise(function (resolve, reject) {
        client.bind(searchOptions.bindDN, searchOptions.bindCredentials, function (err) {
            if (err) {
                log.error("ldap - " + err);
                return reject(err);
            }

            client.search(searchOptions.searchBase, searchOptions, function (err, res) {
                res.on('searchEntry', function (entry) {
                    var user = entry.json;
                    //for(var i = 0; i < user.attributes.length; i++) {
                    //    console.log(user.attributes[i].keys + ' : ' + user.attributes[i].vals);
                    //}
                    return resolve(user);
                });
                //res.on('end', function(result) {
                //client.unbind(function() {
                //    log.info('unbound after end')
                //});
                //});
            });
        });
    })
}