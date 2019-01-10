//importing modules needed
var mongoose    = require('mongoose'),
    Restaurant  = require("./models/restaurant"),
    Comment     = require("./models/comment");

//Dummy restaurants used to seed the mongo DB.
//Used for testing both the models and the UI. 
var data = [
    {
        name: "Macdonalds",
        image: "https://www.famouslogos.net/images/mcdonalds-logo.jpg",
        specialty: "Burgers, Fries and Chicken Nuggets",
        description: "Fastfood burger spot"
    },

    {
        name: "Macdonalds",
        image: "https://www.famouslogos.net/images/mcdonalds-logo.jpg",
        specialty: "Burgers, Fries and Chicken Nuggets",
        description: "Fastfood burger spot2"
    },

    {
        name: "Macdonalds",
        image: "https://www.famouslogos.net/images/mcdonalds-logo.jpg",
        specialty: "Burgers, Fries and Chicken Nuggets",
        description: "Fastfood burger spot3"
    }
]

function seedDB()
{
    //remove all restaurants from DB
    Restaurant.remove({}, function(err){
        if(err)
        {
            console.log(err);
        }
        console.log("removed all restaurants from the DB");
    });

    // data.forEach(function(seed){
    //     Restaurant.create(seed, function(err, restaurant){
    //         if(err)
    //         {
    //             console.log(err);
    //         }
    //         else
    //         {
    //             console.log("Added a restaurant");
    //             //Add a comment to the restaurant
    //             Comment.create(
    //                 {
    //                     text: "This place sucks",
    //                     author: "Bill"
    //                 },
    //                 function(err, comment)
    //                 {
    //                     if(err)
    //                     {
    //                         console.log(err);
    //                     }
    //                     else
    //                     {
    //                         restaurant.comments.push(comment);
    //                         restaurant.save();
    //                         console.log("Created a new comment!");
    //                     }
    //                 }
    //             )
    //         }
    //     });
    // });
}

module.exports = seedDB;