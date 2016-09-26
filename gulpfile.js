var gulp = require('gulp');
var mocha = require('gulp-mocha');
var server = require('./server/server');
var protractor = require('gulp-protractor').protractor;
var webdriverUpdate = require('gulp-protractor').webdriver_update;
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

gulp.task('webdriver-update', webdriverUpdate);

gulp.task('ui-tests', ['webdriver-update', 'server'], function (cb) {
    var args = [];
    args.push('--seleniumAddress');
    args.push('http://localhost:4444/wd/hub');

    //if (process.env.ci) {
    //    args.push('--seleniumAddress');
    //
    //    // borrowing brojetski's claimshub prodtest box for now
    //
    //    //args.push('http://PDW01RSPSR001.na.bestbuy.com:4444/wd/hub');
    //    // dsg01gso
    //    args.push('http://PTW01CCHAP001.na.bestbuy.com:4444/wd/hub');
    //}

    runSelenium(args, cb);
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