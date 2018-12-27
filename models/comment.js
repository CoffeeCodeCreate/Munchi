//Requiring packages needed
var mongoose = require('mongoose');

//The mongoose schema
var commentSchema = mongoose.Schema({
    //The data the schema will hold
    text: String,
    author:
    {
        id:
        {
            type: mongoose.Schema.Types.ObjectId,
        //the model referred to
            ref: "User"
        },
        //String of the current user.
        username: String
    }
});

//Exporting this mongoose model as a module.
module.exports = mongoose.model("Comment", commentSchema);