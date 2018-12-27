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
                if(foundRestaurant.author.id.equals(req.user.id))
                {
                    //move onto the next step
                    next();    
                }
                else
                {
                    //take user back to the previous page
                    res.redirect("back");
                }
            }
         });
     }
 }


 middlewareObj.checkCommentOwnership = function(req, res, next)
 {
     if(req.isAuthenticated())
     {
         Comment.findById(req.params.comment.id, function(err, foundComment){
            if(err)
            {
                //redirect back to the main restaurants page
                res.redirect("/restaurants");
            }
            else
            {
                /**
                 * Check to see if the currently logged in user does own the comment by
                 * comparing the comments author id to the logged in user's id
                 */

                 if(foundComment.author.id.equals(req.user.id))
                 {
                     //move onto the next step
                     next();
                 }

                // If the logged in user is not the author of the comment, redirect them back a page.
                 else
                 {
                     res.redirect("back");
                 }

            }
         });
     }
 }


 middlewareObj.isLoggedIn = function(req, res, next)
 {
     if(req.isAuthenticated())
     {
         return next();
     }
     res.redirect("/login");
 }


 module.exports - middlewareObj;