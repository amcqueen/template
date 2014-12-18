var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models').User;



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

router.post('/signup', function(req, res){
	var newUser = new User({username:req.body.username, password:req.body.password});
	newUser.save(function(err, result) {
		if (err) {
		  console.error(err);
		} else {
			console.log('Created user: '+newUser.username);
			req.logIn(newUser, function(err) {
				if (err) {console.error(err)};
				// login success!
				res.status(200).json({
					success:true
				});
			});
			
		}
	});
});



module.exports = router;