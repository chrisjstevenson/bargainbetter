var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use('/app', express.static('app'));
app.use('/assets', express.static('assets'));
app.use('/node_modules', express.static('node_modules'));

app.set('view engine', 'ejs');
app.set('views', process.cwd() + '/server/views');
app.use(express.static('app'));
app.use(bodyParser.json());

require('./routes')(app);

module.exports = app;