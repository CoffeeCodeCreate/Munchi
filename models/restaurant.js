var mongoose = require("mongoose");

var restaurantSchema = new mongoose.Schema({
    name: String,
    image: String,
    specialty: String,
    description: String,
    author:
    {
        id:
        {
            //reference to the user model's id: '._id'
            type: mongoose.Schema.Types.ObjectId,
            //the model to refer to
            ref: "User"
        },
        username: String
    },
    bestSellers: 
        [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Best"
            }
        ],
    comments:
    [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

//Export the restaurant schema as a mongoose model called Restaurant.
module.exports = mongoose.model("Restaurant", restaurantSchema);