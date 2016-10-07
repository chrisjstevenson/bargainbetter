global._ = require('lodash');
global.Promise = require('bluebird');
global.log = require('../config/log');
global.config = require('../config/config');
const chalk = require('chalk');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

module.exports.run = (cb) => {

    log.info('server - Starting "' + config.environment + '"');

    connectToMongoose()
        .then(() => {
            var app = Promise.promisifyAll(require('./express'));
            var server = Promise.promisifyAll(require('http').Server(app));

            app.listenAsync(app.get('port'));

            log.info(`${chalk.green('✓')} Express server listening on port ${app.get('port')} in ${app.get('env')} mode.`);
        })
        .catch((error) => log.error(chalk.red('server - Error while starting', error)))
        .finally(cb);
};


function connectToMongoose() {
    var options = {
        server: {
            auto_reconnect: true,
            socketOptions: {
                keepAlive: 300000,
                connectTimeoutMS: 30000
            }
        },
        replset: {
            socketOptions: {
                keepAlive: 300000,
                connectTimeoutMS: 30000 }
        }
    };

    var url = `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`;

    var db = mongoose.connection;

    db.on('reconnected', function () {
        log.warn('MongoDB reconnected!');
    });
    db.on('disconnected', function () {
        log.warn('MongoDB disconnected!');
    });

    return mongoose.connect(url, options)
        .then(() => {
            log.info(`connected to ${url}`);
        })
}