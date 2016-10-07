exports.environment = 'production';

exports.express = {
    hostName: 'localhost',
    port: 9002,
    ip: '127.0.0.1'
};

exports.sessionSecret = 'soverysecret!@@!';

exports.db = {
    host: 'mongodb', // this is the hostname of the mongodb container
    name: 'bargainbetter',
    port: '27017'
};

exports.linkedInCallBackUrl = 'http://www.bargainbetter.com/oauth/linkedin/callback';
exports.linkedInId = '78m6kmzfd6yoqf';
exports.linkedInSecret = 'lqfcxRk3d4Jpz3dN';
