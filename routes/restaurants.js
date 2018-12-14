var express = require('express');
var router = express.Router();
var Restaurant = require("../models/restaurant");

//index route: Show all restaurants
router.get("/", function(req, res){
    Restaurant.find({}, function(err, allRestaurants){
        if(err)
        {
            console.log(err);
        }

        else
        {
            res.render("restaurants/index", {restaurants: allRestaurants});
        }
    });
});

//New route: Show a form to add a new restaurant.
router.get("/new", function(req,res){
    res.render("restaurants/new");
});

//Create route: Add a new restaurant into the DB
router.post("/", function(req, res){
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


router.get("/:id", function(req,res){
    //Find restaurant based on its ID
    Restaurant.findById(req.params.id).populate("comments").exec( function(err, foundRestaurant){
        if(err)
        {
            console.log(err);
        }
        else
        {
            //render the show template for this url, send the model data to the template.
            res.render("restaurants/show", {restaurant: foundRestaurant});
        }
    });
});

module.exports = router;