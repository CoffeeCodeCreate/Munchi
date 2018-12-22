var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require("../models/user");

//root route
router.get("/", function(req, res){
    res.render("landing");
});

//show registration form
router.get("/register", function(req, res){
    res.render("register");
});

//handle signup logic
router.post("/register", function(req,res){
    /**
     * Create a new user then take the variables from req.body and use it as the users username.
     */

     var newUser = new User({username: req.body.username});
     /**
         * Register the user, input the new user being added as the first parameter
         * the second parameter is the users password
         * the third parameter is a function callback
    */

    User.register(newUser, req.body.password, function(err,user){
        if(err)
        {
            console.log(err);
            return res.render("register");
        }

        //if all is authenticated, redirect.
        passport.authenticate("local")(req, res, function(){
            console.log(user._id);
            res.redirect("/restaurants");
        });
    });
});

//login route

router.get("/login", function(req, res){
    res.render("login");
})

router.post("/login", passport.authenticate("local",
    //login redirect middleware
    {
        successRedirect: "/restaurants",
        failureRedirect: "/login"
    }),
    function(req, res)
    {
        console.log("Middleware is done running...");
    }
);

//Logout route
router.get("/logout",function(req,res){
    //terminates a login session
    req.logout();
    console.log("User is logged out!");
    res.redirect("/restaurants");
});


module.exports = router;