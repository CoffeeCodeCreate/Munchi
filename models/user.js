var mongoose = require('mongoose');
//passport functions needed for mongoose
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
    username: String,
    password: String
});

//adds passport methods to the User model
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);