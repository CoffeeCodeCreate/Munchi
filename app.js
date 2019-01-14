var express     = require('express'),
app             = express(),
methodOverride = require("method-override"),
bodyParser      = require("body-parser"),
mongoose        = require("mongoose"),
passport        = require("passport"),
flash           = require("connect-flash");
LocalStrategy   = require("passport-local");

//MongoDB / Mongoose models
Restaurant      = require("./models/restaurant"),
Comment         = require("./models/comment"),
User            = require("./models/user");

// seedDB = require("./seeds");
// seedDB();

/**
 * ROUTES TO THE PAGES
 */
var indexRoutes = require("./routes/index");
var commentRoutes = require("./routes/comments");
var restaurantRoutes = require("./routes/restaurants");

mongoose.connect("mongodb://localhost/munchi_v1");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

// Tells express to use the method-override package and what to look for in the URL
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
//Use the connect-flash package
app.use(flash());

//Seeds the database
// seedDB();

/**
 * Session config for mongoose.
 */

 app.use(require("express-session")({
     //secret phrase needed to confirm session
    secret: "Hello Friend",
    //dont save this session to prevent session jacking
    resave: false,
    //dont save the session uninitialized.
    //This reduces server storage and requires permission when setting a cookie.
    saveUninitialized: false
 }));

 /**
  * The following functions are used for the login feature.
  */
 app.use(passport.initialize());
 /**
  * Loads the user object into req.user if a serialized user object is 
  * stored on the server.
  */
 app.use(passport.session());

 /**
  * Passport Strategy configuration.
  * 
  * For this web app we'll be going with the 'local' strategy.
  */

  //The user model created will now use the authenticate function in passport.
  passport.use(new LocalStrategy(User.authenticate()));

  //Get information from the user object to store in a session (serialize)
  passport.serializeUser(User.serializeUser());

  //Take the information and turn it back into a user object (deserialize)
  passport.deserializeUser(User.deserializeUser());


/** 
 * Main function: passes this variable to every ejs or js file, stores it in the locals response body.
 * In this case the current user data will be passed around all the files needed.
 * The data stored in 'currentUser' will be the user data stores in the body of the request.
 * 
*/
app.use(function(req, res, next){
    //Whatever we put here is available in all our templates
    
    /**
     * Here the variable 'currentUser' is passed to all ejs templates through the response.locals object.
     * 
     * This variable will be used to check whether or not the user is logged in.u
     */
    res.locals.currentUser = req.user;

    //Pass the flash messages to every template
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    
    //runs the next middleware.
    next();
 });




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