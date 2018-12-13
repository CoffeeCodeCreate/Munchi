var express     = require('express'),
app             = express(),
methodOverride = require("method-override"),
bodyParser      = require("body-parser"),
mongoose        = require("mongoose"),
//MongoDB / Mongoose modules
Restaurant = require("./models/restaurant");
Comment = require("./models/comment");

seedDB = require("./seeds");

mongoose.connect("mongodb://localhost/munchi_v1");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

// Tells express to use the method-override package and what to look for in the URL
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
seedDB();


app.get("/", function(req,res){
    res.render("landing");
});

app.get("/restaurants", function(req,res){
    //Get all restaurants from MongoDB database
    Restaurant.find({}, function(err, allRestaurants){
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.render("restaurants/index", {restaurants: allRestaurants});
        }
    })
});

app.get("/restaurants/new", function(req,res){
    res.render("restaurants/new");
})

app.post("/restaurants", function(req,res){
    console.log(req.body);
    console.log(req);
    var name = req.body.name;
    var image = req.body.image;
    var specialty = req.body.specialty;
    var description = req.body.description;

    var newRestaurant = {
        name: name,
        image: image,
        specialty: specialty,
        description: description
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


//Show page
app.get("/restaurants/:id", function(req,res){
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

//Delete route
app.delete("/restaurants/:id", function(req, res){
    //destroy post
    Restaurant.findByIdAndRemove(req.params.id, function(err){
        if(err)
        {
            console.log(err)
        }
        else
        {
            res.redirect("/restaurants");
        }
    });
});

// Comment Routes

app.get("/restaurants/:id/comments/new", function(req,res){
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

app.post("/restaurants/:id/comments", function(req,res){
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

app.listen(3000, function(){
    console.log("app running....");
});