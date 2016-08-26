global.log = require('../config/log');
var Promise = global.Promise = require('bluebird');
var app = Promise.promisifyAll(require('./express'));
Promise.promisifyAll(require('request'));
global.Linkedin = require('node-linkedin')('78m6kmzfd6yoqf', 'lqfcxRk3d4Jpz3dN');

var config = require('../config/config');
const chalk = require('chalk');
const ip = require('ip');
const divider = chalk.gray('\n-----------------------------------');

module.exports.run = function (cb) {

    console.log('server - Starting "' + config.environment + '"');

    return app.listenAsync(9002)
        .then(console.log(`Server started ${chalk.green('✓')}`))
        .then(() => {
            console.log(`${chalk.bold('Access URLs:')}${divider}
Localhost: ${chalk.magenta(`http://localhost:${config.express.port}`)}
      LAN: ${chalk.magenta(`http://${ip.address()}:${config.express.port}`)}${divider}`)
        })
        .catch((error) => console.log(chalk.red('server - Error while starting', error)));
};

