var express = require('express');
/**
 * //nests the URL parameters from "/restaurants" and passes it to the comments page.
 */
var router = express.Router({mergeParams: true}); 

//Models needed.
var Restaurant = require("../models/restaurant");
var Comment = require("../models/comment");

// Comment Routes

router.get("/new", function(req,res){
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

router.post("/", function(req,res){
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

module.exports = router;