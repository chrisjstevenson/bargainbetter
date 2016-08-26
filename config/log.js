var winston = require('winston');
var config = require('./config');
var moment = require('moment');

function now() {
    return moment().format();
}

module.exports = global.log = new winston.Logger({
    transports: [
        new winston.transports.Console({
            level: config.consoleLogLevel.info,
            colorize: true,
            timestamp: now,
            prettyPrint: true
        })
    ]
})