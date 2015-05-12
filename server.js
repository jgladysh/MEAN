var express = require('express'),
    app = express(),
    passport = require('passport'),
    expressSession = require('express-session'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    methodOverride = require('method-override'),
    path = require('path');


// Configuring and initialize passport
app.use(expressSession({secret: 'secret'}));
app.use(passport.initialize());
app.use(passport.session());
var initPassport = require('./app/passport/init');
initPassport(passport);


// Configuring and connect to mongoDB database
var db = require('./config/db');
mongoose.connect(db.url, function (err) {
    if (err) console.log(err);
});


// Set port
var port = process.env.PORT || 9000;


//Configure request/response parsing

// Parse application/json, application/vnd.api+json as json
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieParser());

// Override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));


// Set the static files location
app.use(express.static(__dirname + '/public'));

// View engine setup
app.set('views', path.join(__dirname, '/public/views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


// Configure routes
require('./app/routes')(app, passport);


// Start app
app.listen(port);
console.log('Server start up on port ' + port);
