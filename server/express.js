var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var session = require('express-session');
const MongoStore = require('connect-mongo')(session);
var flash = require('express-flash');

app.use(flash());
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

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'pug');
app.set('views', process.cwd() + '/views');
app.use(express.static('app'));
app.use(bodyParser.json());

require('./routes')(app);

module.exports = app;