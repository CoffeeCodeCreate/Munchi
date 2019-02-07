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
        name: "Burger King",
        image: "https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F3%2F3a%2FBurger_King_Logo.svg%2F1200px-Burger_King_Logo.svg.png&f=1",
        specialty: "Burgers of course",
        description: "Fastfood burger spot2"
    },

    {
        name: "Wendys",
        image: "https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pacbiztimes.com%2Fwp-content%2Fuploads%2F2016%2F07%2Fwendys-co-logo.jpg&f=1",
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

    data.forEach(function(seed){
        Restaurant.create(seed, function(err, restaurant){
            if(err)
            {
                console.log(err);
            }
            else
            {
                console.log("Added a restaurant");
                //Add a comment to the restaurant
                Comment.create(
                    {
                        text: "This place sucks",
                        author: "Bill"
                    },
                    function(err, comment)
                    {
                        if(err)
                        {
                            console.log(err);
                        }
                        else
                        {
                            restaurant.comments.push(comment);
                            restaurant.save();
                            console.log("Created a new comment!");
                        }
                    }
                )
            }
        });
    });
}

module.exports = seedDB;