var express  = require('express');
var app      = express();
var path = require('path');
var port     = process.env.PORT || 3000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');

// routes ======================================================================
var route = require('./app/routes.js'); // load our routes and pass in our app and fully configured passport


// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database


require('./config/passport'); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms
app.use(express.static(path.join(__dirname, 'public')));

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// Routing ================================
app.use('/', route);


// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);

