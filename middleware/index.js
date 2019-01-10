var Restaurant = require("../models/restaurant");
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
     if(req.isAuthenticated())
     {
         Restaurant.findById(req.params.id, function(err, foundRestaurant){
            if(err || !foundRestaurant)
            {
                req.flash("error","Restaurant not found");
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
                    req.flash("error", "You don't have permission to do that.");
                    res.redirect("back");
                }
            }
         });
     }
    else
     {
         req.flash("error", "You need to be logged in to do that.");
         res.redirect("back");
     }
 }


 middlewareObj.checkCommentOwnership = function(req, res, next)
 {
     if(req.isAuthenticated())
     {
         Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err || !foundComment)
            {
                req.flash("error", "Comment not found!");
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
                    req.flash("error","You dont have permission to do that!");
                    res.redirect("back");
                 }

            }
         });
     }
     //If theyre not logged in
    else
    {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
 }


 middlewareObj.isLoggedIn = function(req, res, next)
 {
     if(req.isAuthenticated())
     {
         return next();
     }
     req.flash("error","You need to be logged in.");
     res.redirect("/login");
 }

 module.exports = middlewareObj;