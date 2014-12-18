var express = require('express');
var router = express.Router();
var passport = require('passport');

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



router.post('/login', passport.authenticate('local'), function(req, res) {
	res.status(200).json({
		success: true
	});
});



router.get('/logout', function(req, res){
  req.logout();
  res.status(200).json({
		success: true
	});
});



module.exports = router;