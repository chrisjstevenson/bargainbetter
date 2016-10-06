global._ = require('lodash');
global.Promise = require('bluebird');
global.log = require('../config/log');
const config = require('../config/config');
const chalk = require('chalk');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

dotenv.load({ path: '.env' });

module.exports.run = (cb) => {

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

    var db = mongoose.connection;

    db.on('reconnected', function () {
        log.warn('MongoDB reconnected!');
    });
    db.on('disconnected', function () {
        log.warn('MongoDB disconnected!');
    });

    return mongoose.connect(process.env.MONGODB_URI, options)
        .then(() => {
            log.info(`${chalk.green('✓')} Connected to ${process.env.MONGODB_URI}`);
        })
}
