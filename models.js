var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	username: {
		type: String, 
		required: true, 
		unique: true
	}, 
	password: {
		type: String, 
		required: true, 
	},
});


// Methods
userSchema.methods.toJSON = function() {
  var obj = this.toObject()
  delete obj.password
  return obj
}

userSchema.methods.validPassword = function (password) {
	return (this.password===password);
}



var User = mongoose.model('User', userSchema);


module.exports.User=User;
