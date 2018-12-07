var express     = require('express'),
app             = express(),
bodyParser      = require("body-parser"),
mongoose        = require("mongoose"),
//MongoDB / Mongoose modules
Restaurant = require("./models/restuarant");

mongoose.connect("mongodb://localhost/munchi_v1");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


app.get("/", function(req,res){
    res.send("<h1>Im working!</h1>");
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
            res.render("index", {restaurants: allRestaurants});
        }
    })
});

app.get("/restaurants/new", function(req,res){
    res.render("new");
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



app.listen(3000, function(){
    console.log("app running....");
});