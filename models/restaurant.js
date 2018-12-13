var mongoose = require("mongoose");

var restaurantSchema = new mongoose.Schema({
    name: String,
    image: String,
    spectialty: String,
    description: String,
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