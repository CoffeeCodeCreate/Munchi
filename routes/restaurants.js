var express = require('express');
var router = express.Router();
var Restaurant = require("../models/restaurant");
var middleware = require("../middleware");

/**
 *  index route: Show all restaurants 
 */
router.get("/", function(req, res){
    //retrieve all restaurants from the database.
    Restaurant.find({}, function(err, allRestaurants){
        if(err)
        {
            console.log(err);
        }

        else
        {
            res.render("restaurants/index", {restaurants: allRestaurants, currentUser: req.user});
        }
    });
});

/**
 * 
 *  New route: Show a form to add a new restaurant. 
 */

router.get("/new", middleware.isLoggedIn, function(req,res){
    res.render("restaurants/new");
});

/**
 * CREATE route: Add a new restaurant into the DB
 *  */
router.post("/", middleware.isLoggedIn, function(req, res){
    console.log(req.body);
    console.log(req);
    var name = req.body.name;
    var image = req.body.image;
    var specialty = req.body.specialty;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }

    var newRestaurant = {
        name: name,
        image: image,
        specialty: specialty,
        description: description,
        author: author
    };

    Restaurant.create(newRestaurant, function(err, newEntry){
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log(newEntry);
            res.redirect("/restaurants");
        }
    });
});

router.get("/:id/edit", middleware.checkRestaurantOwnership, function(req, res){
    Restaurant.findById(req.params.id, function(err, foundRestaurant){
        res.render("restaurants/edit", {restaurant: foundRestaurant});
    });
});

//UPDATE route
router.put("/:id",middleware.checkRestaurantOwnership, function(req,res){

    //Find and update the correct restaurant based on its ID
    Restaurant.findByIdAndUpdate(req.params.id, req.body.restaurant, function(err, updatedRestaurant){
        if(err)
        {
            res.redirect("/restaurants");
        }

        else
        {
            res.redirect("/restaurants/" + req.params.id);
        }
    });
});

//DESTROY route
router.delete("/:id", middleware.checkRestaurantOwnership, function(req,res){
    Restaurant.findByIdAndRemove(req.params.id, function(err){
        /**
         * Fix this code, use only one redirect in the next version!
         */
        if(err)
        {
            res.redirect("/restaurants");
        }
        else
        {
            res.redirect("/restaurants");
        }
    });
});

/**
 * SHOW PAGE
 */
router.get("/:id", function(req,res){
    //Find restaurant based on its ID, populate/fill with their respective comments.
    Restaurant.findById(req.params.id).populate("comments").exec(function(err, foundRestaurant){
        if(err || !foundRestaurant)
        {
            res.redirect("back");
        }
        else
        {
            //render the show template for this url, send the model data to the template.
            res.render("restaurants/show", {restaurant: foundRestaurant});
        }
    });
});

module.exports = router;