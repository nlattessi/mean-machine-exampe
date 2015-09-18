// BASE SETUP
// =============================

// CALL PACKAGES
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var config      = require('./config');
var path        = require('path');

// APP CONFIGURATION
// =============================
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure to use CORS
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
  next();
});

// log all requests to console
app.use(morgan('dev'));

// connect to database(modulus.io)
mongoose.connect(config.database);

// set static files location
app.use(express.static(__dirname + '/public'));

// API ROUTES
// =============================
var apiRoutes = require('./app/routes/api')(app, express);
app.use('/api', apiRoutes);

app.get('*', function(req,res) {
  res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

// START SERVER
app.listen(config.port);
console.log('Magic happens on port ' + config.port);
