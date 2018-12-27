var express = require('express');
/**
 * //nests the URL parameters from "/restaurants" and passes it to the comments page.
 */
var router = express.Router({mergeParams: true}); 

//Models needed.
var Restaurant = require("../models/restaurant");
var Comment = require("../models/comment");

//middleware functions
//note: It automatically retrieves the index.js file in this folder.
var middleware = require("../middleware/");

// Comment Routes
/**
 * Middleware function checks to see if user is logged in before they can comment.
 */
router.get("/new", middleware.isLoggedIn, function(req,res){
    //Find restaurant by ID
    Restaurant.findById(req.params.id, function(err, restaurant){
        if(err)
        {
            console.log(err);
        }

        else
        {
            //render this page, pass the restaurant object as 'restaurant'
            res.render("comments/new", {restaurant: restaurant});
        }
    });
});

router.post("/", middleware.isLoggedIn, function(req,res){
    //Look up restaurant based on ID
    Restaurant.findById(req.params.id, function(err, restaurant){
        if(err)
        {
            console.log(err);
        }
        else
        {
            // The comment object is passed as a schema for the Comment DB model.
            Comment.create(req.body.comment, function(err, comment){
                if(err)
                {
                    console.log(err);
                }
                else
                {
                    //Push the comment into the restaurant 'comment' attribute
                    restaurant.comments.push(comment);
                    //Save all changes
                    restaurant.save();
                    //redirect
                    res.redirect("/restaurants/" + restaurant._id);
                }
            });
        }
    });
});

//comment edit
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req,res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err)
        {
            res.redirect("back");
        }

        else
        {
            /**
             * Send the restaurant ID and the comment object to the edit form from req.body
             */

            res.render("comments/edit", {restaurant_id: req.params.id, comment: foundComment});
        }
    });
});

//comment UPDATE route via PUT request
router.put(":/comment_id",middleware.checkCommentOwnership, function(req,res){
    /**
     * Find the comment via the comment's id and then edit it.
     */
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err)
        {
            res.redirect("back");
        }
        else
        {
            //redirect back to the restaurant based on ID
            res.redirect("/restuarants/" + req.params.id);
        }
    });
});

//Comment DESTROY route via DELETE request
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req,res){
    //find by ID and remove
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err)
        {
            res.redirect("back");
        }
        else
        {
            //redirect back the show page of the restaurant based on ID
            res.redirect("/restaurants/" , req.params.id);
        }
    });
});

module.exports = router;