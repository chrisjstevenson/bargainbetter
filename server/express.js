var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');

app.use('/app', express.static('app'));
app.use('/public', express.static('public'));
app.use('/node_modules', express.static('node_modules'));
app.use(favicon('./public/images/favicon.ico'));

app.set('view engine', 'ejs');
app.set('views', process.cwd() + '/public/views');
app.use(express.static('app'));
app.use(bodyParser.json());

require('./routes')(app);

module.exports = app;