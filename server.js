/*

FILE CONTENTS

  - Name project
  - Import modules
  - Create app
  - Set up view engine
  - Import routes
  - Set up middleware
  - Connect to mongoDB
  - Set up passport
  - Export app
  - Create a test user
  - Start server

*/



//////////////////////////////////
////// 	NAME PROJECT	     	//////
//////////////////////////////////

var PROJECT_NAME = "template";



//////////////////////////////////
////// 	IMPORT MODULES	   	//////
//////////////////////////////////

var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var validator = require('validator');
var path = require('path');

// database - mongoDB
var mongo = require('mongodb');
var mongoose = require('mongoose');

// authentication - passport, local username/password strategy, sessions enabled
var User = require('./models').User;
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;



//////////////////////////////////
//////	CREATE APP 		    	//////
//////////////////////////////////

var app = express();
 


//////////////////////////////////
//////	SET UP VIEW ENGINE	//////
//////////////////////////////////

var engine = require('ejs-locals');
app.engine('ejs', engine);
app.set('view engine', 'ejs');



//////////////////////////////////
//////	IMPORT ROUTES		//////
//////////////////////////////////

var pageNavigation = require('./routes/pageNavigation');



//////////////////////////////////
//////	SET UP MIDDLEWARE	  //////
//////////////////////////////////

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static('public'));

// passport
app.use(session({secret: 'leftish five', saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use('/', pageNavigation);



//////////////////////////////////
//////	CONNECT TO MONGODB	//////
//////////////////////////////////

if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
	// openshift
	connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ':' +
    	process.env.OPENSHIFT_MONGODB_DB_PASSWORD + '@' +
    	process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
    	process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
    	process.env.OPENSHIFT_APP_NAME;
} else {
	// locally
	connection_string = 'mongodb://localhost/'+PROJECT_NAME;
}
mongoose.connect(connection_string);
var db = mongoose.connection;

// Startup messages
db.on('error', console.error.bind(console, 'Error connecting to database'));
db.once('open', function callback() {
	console.log("Database successfully opened");
});



//////////////////////////////////
//////	SET UP PASSPORT	   	//////
//////////////////////////////////

passport.use(new LocalStrategy(
  function(username, password, done) {
    var username = validator.toString(username); 
    var password = validator.toString(password);
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});



//////////////////////////////////
//////	EXPORT APP 			   //////
//////////////////////////////////

module.exports = app;



//////////////////////////////////
//////  CREATE A TEST USER  //////
//////////////////////////////////

var newUser = new User({username:'a', password:'a'});

  newUser.save(function(err, result) {
    if (err) {
      console.error(err);
    }
    else {
      console.log('Created user a');
    }

  });



//////////////////////////////////
//////	START SERVER 		    //////
//////////////////////////////////


if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
	// openshift
	var port = process.env.OPENSHIFT_NODEJS_PORT;
	var ip = process.env.OPENSHIFT_NODEJS_IP;
	app.listen(port || 8080, ip);
} else {
	// locally
	app.listen(4000);
}