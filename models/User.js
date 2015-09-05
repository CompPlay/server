var mongoose = require("mongoose"),
	Schema = mongoose.Schema,
	passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({

	name: String,
	email: String,
	username: String,
	password: String
	
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", User);
