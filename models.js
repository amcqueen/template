var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	username : String,
	password : String,
});


// Methods
userSchema.methods.validPassword = function (password) {
	return (this.password===password);
}



var User = mongoose.model('User', userSchema);


module.exports.User=User;
