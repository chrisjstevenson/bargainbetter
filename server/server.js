global.log = require('../config/log');
var Promise = global.Promise = require('bluebird');
var app = Promise.promisifyAll(require('./express'));
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
Promise.promisifyAll(require('request'));
global.Linkedin = require('node-linkedin')('78m6kmzfd6yoqf', 'lqfcxRk3d4Jpz3dN');


var config = require('../config/config');
const chalk = require('chalk');
const ip = require('ip');
const divider = chalk.gray('\n-----------------------------------');

module.exports.run = function (cb) {

    console.log('server - Starting "' + config.environment + '"');

    connectToMongoose()
        .then(app.listenAsync(config.express.port))
        .then(console.log(`Server started ${chalk.green('✓')}`))
        .then(() => {
            console.log(`${chalk.bold('Access URLs:')}${divider}
Localhost: ${chalk.magenta(`http://localhost:${config.express.port}`)}
      LAN: ${chalk.magenta(`http://${ip.address()}:${config.express.port}`)}${divider}`)
        })
        .catch((error) => console.log(chalk.red('server - Error while starting', error)));
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
