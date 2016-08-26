var request = require('request');
var _ = require('lodash');

var options = {
    strictSSL: false,
    headers: {
        Authorization: 'apikey f12cb36f352b9e8ff9c7399b2c3fb2c9-us13'
    }
};

module.exports.lists = function lists() {
    //url: 'https://us13.api.mailchimp.com/3.0/lists/5e59e840a2/members/',
    options.url = 'https://us13.api.mailchimp.com/3.0/lists/';

    return request.getAsync(options).then(response => parseSafe(response.body));
};

module.exports.subscribe = function subscribe(data) {

    //url: 'https://us13.api.mailchimp.com/3.0/lists/5e59e840a2/members/',
    options.url = 'https://us13.api.mailchimp.com/3.0/lists//5e59e840a2/members/';
    options.body = JSON.stringify(data);

    return request.postAsync(options).then(response => parseSafe(response.body));
};

module.exports.getAllSubscribers = function getAllSubscribers(data) {

    //url: 'https://us13.api.mailchimp.com/3.0/lists/5e59e840a2/members/',
    options.url = 'https://us13.api.mailchimp.com/3.0/lists//5e59e840a2/members/';
    options.body = JSON.stringify(data);

    return request.getAsync(options).then(response => parseSafe(response.body));
};

module.exports.unsubscribe = function unsubscribe(data) {

    //url: 'https://us13.api.mailchimp.com/3.0/lists/5e59e840a2/members/',
    options.url = 'https://us13.api.mailchimp.com/3.0/lists//5e59e840a2/members/';
    options.body = JSON.stringify(data);

    return request.getAsync(options).then(response => parseSafe(response.body));
};

function parseSafe(str) {
    return _.attempt(JSON.parse.bind(null, str));
}