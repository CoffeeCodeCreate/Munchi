//Requiring packages needed
var mongoose = require('mongoose');

//The mongoose schema
var commentSchema = mongoose.Schema({
    //The data the schema will hold
    text: String,
    author: String
});

//Exporting this mongoose model as a module.
module.exports = mongoose.model("Comment", commentSchema);