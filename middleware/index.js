var Restaurant = require("../modles/restaurant");
var Comments = require("../models/comment");

// Initializing middleware object.

var middlewareObj = {};


/**
 * Middleware object functions
 */

 // Check restaurant ownership
 
 middlewareObj.checkRestaurantOwnership = function(req,res,next)
 {
     //if the user is logged in.
     if(req.Authenticated())
     {
         Restaurant.findById(req.params.id, function(err, foundRestaurant){
            if(err)
            {
                res.redirect("/restaurants");
            }

            else
            {
                //Check to see if the user logged in is the restaurant post's author.
                if(foundRestaurant.author.id.equals(req.user.id){
                    
                });
            }
         });
     }
 }