var mongoose = require('mongoose');
//passport functions needed for mongoose
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
    username: String,
    password: String
});

/**
 * Adds methods to our schema
 * This also will add a username, hash and salt field to store the username,
 * hashed password and salt value.
 */
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);