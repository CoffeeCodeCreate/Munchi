var express     = require('express'),
app             = express(),
methodOverride = require("method-override"),
bodyParser      = require("body-parser"),
mongoose        = require("mongoose"),
//MongoDB / Mongoose modules
Restaurant = require("./models/restaurant"),
Comment = require("./models/comment");

seedDB = require("./seeds");

mongoose.connect("mongodb://localhost/munchi_v1");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

// Tells express to use the method-override package and what to look for in the URL
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
seedDB();


/**
 * ROUTES TO THE PAGES
 */
var indexRoutes = require("./routes/index");
var commentRoutes = require("./routes/comments");
var restaurantRoutes = require("./routes/restaurants");


/**
 * Modularized the routes.
 * 
 * Now instead of having to declare the routes and all their functionality here,
 * app.use() allows us to declare all that functionality in another file
 * which will be used once the respective route is requested.
 * 
 * Example: All the functionality needed for the index route '/' is in a separate file in a seperate
 * folder.
 * 
 * Also, all the routes' respective files will have their own declared routes that are relative to
 * the current route.
 * 
 * For example, the "/" route in the restaurants.js file is the "/restaurant" route.
 * 
 * Think of it as "/restaurants" being prefixed to the "/new" route in the restaurants.js
 * file.
 */

app.use("/", indexRoutes);
app.use("/restaurants", restaurantRoutes);
app.use("/restaurants/:id/comments", commentRoutes);

app.listen(3000, function(){
    console.log("app running....");
});