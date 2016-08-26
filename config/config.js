var environment = process.env.NODE_ENV || 'development';

var config = require('./env/' + environment);
config.consoleLogLevel = {
    debug: "debug",
    info: "info",
    error: "error"
}

module.exports = config;