var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models').User;

router.get('/', function(req, res){
	if (req.user){
		// user is logged in
		res.render('home.ejs', {})
	} else {
		// user is not logged in
		res.render('splash.ejs', {});
	}
});



router.get('/login', function(req, res){
	if (req.user){ 
		// user is logged in
		res.render('home.ejs', {})
	} else { 
		// user is not logged in
		res.render('login.ejs', {});
	}
});

router.get('/signup', function(req, res){
	if (req.user){ 
		// user is logged in
		res.render('home.ejs', {})
	} else { 
		// user is not logged in
		res.render('signup.ejs', {});
	}
});






module.exports = router;