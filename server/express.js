var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var favicon = require('serve-favicon');
var passport = require('passport');
var session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const errorHandler = require('errorhandler');
var flash = require('express-flash');

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'pug');
app.set('views', process.cwd() + '/views');
app.use(express.static('app'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use('/app', express.static('app'));
app.use('/public', express.static('public'));
app.use('/node_modules', express.static('node_modules'));
app.use(favicon('./public/images/favicon.ico'));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: config.sessionSecret,
    store: new MongoStore({
        url: `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`,
        autoReconnect: true
    })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});
app.use(function(req, res, next) {
    // After successful login, redirect back to the intended page
    if (!req.user &&
        req.path !== '/login' &&
        req.path !== '/signup' &&
        !req.path.match(/^\/auth/) &&
        !req.path.match(/\./)) {
        req.session.returnTo = req.path;
    }
    next();
});


require('./routes')(app);

app.use(errorHandler());

module.exports = app;