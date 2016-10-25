var gulp = require('gulp');
var mocha = require('gulp-mocha');
var nightwatch = require('gulp-nightwatch');
var selenium = require('selenium-download');
var server = require('./server/server');
var portfinder = require('portfinder');
var os = require('os');
var config = require('./config/config');

gulp.task('find-open-port', function (cb) {
    portfinder.getPort(function (err, port) {
        testingPort = port;
        config.url = `http://localhost:${testingPort}`;
        config.express.port = testingPort;

        hostedAddress = 'http://' + os.hostname() + '.na.bestbuy.com:' + testingPort;

        cb();
    });
});

gulp.task('server', ['find-open-port'], server.run);

gulp.task('selenium-download', function (cb) {
    selenium.ensure('e2e/bin', function (err) {
        if (err) console.error(err.stack);
        console.log('✔ Selenium & Chromedriver downloaded to:', 'e2e/bin');
        cb();
    });
});

gulp.task('ui-tests', ['selenium-download', 'server'], function (cb) {

    gulp.src('e2e')
        .pipe(nightwatch({
            configFile: 'e2e/nightwatch.conf.js'
        }))
        .on('end', err => {
            process.exit(err ? 1 : 0);
            cb(err);
        });
});


gulp.task('ui-tests-server', ['webdriver-update', 'server'], function (cb) {
    var args = [];

    process.env.ci = true;
    args.push('--seleniumAddress');
    args.push('http://PTW01CCHAP001.na.bestbuy.com:4444/wd/hub');

    runSelenium(args, cb);
});

function runSelenium(args, cb) {
    args.push('--baseUrl');
    args.push(hostedAddress);

    gulp.src(['./e2e/*.spec.js'])
        .pipe(protractor({
            configFile: './e2e/protractor.conf.js',
            args: args
        }))
        .on('end', err => {
            process.exit(err ? 1 : 0);
            cb(err);
        });
}