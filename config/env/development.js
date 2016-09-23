var config = module.exports;

config.environment = 'development';

config.express = {
    hostName: 'localhost',
    port: 9002,
    ip: '127.0.0.1'
};

config.db = {
    host: 'localhost',
    name: 'bargainbetter',
    port: '27017'
};

config.callBackUrl = 'http://localhost:9002/oauth/linkedin/callback';