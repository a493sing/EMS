var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Catering = require("../models/catering");
var Venues = require("../models/venues");
var Decorations = require("../models/decorations");


//root route
router.get("/", function(req, res){
    res.render("landing");
});

// show register form
router.get("/register", function(req, res, next){
   try {
   res.header('token', JSON.stringify({ token: 'token' })); 
   res.render("register");
   } catch(err) {
       next(err);
   }
});

//handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
           req.flash("success", "Successfully Signed Up! Start your planning now " + req.body.username);
           res.redirect("/"); 
        });
    });
});


//show login form
router.get("/login", function(req, res){
   res.render("login"); 
});


//handling login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/venues",
        failureRedirect: "/login"
    }), function(req, res){
});


// logout route
router.get("/logout", function(req, res){
   req.logout();
   req.flash("success", "Successfully LOGGED OUT!");
   res.redirect("/");
});

// function isLoggedIn(req, res, next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     req.flash("error", "You must be signed in to do that!");
//     res.redirect("/login");
// }

router.get("/newDecoration", function(req, res){
    res.render("decoration/new"); 
});
router.get("/newCaterer", function(req, res){
    res.render("catering/new"); 
});
router.get("/newVenue", function(req, res){
    res.render("venues/new"); 
});

module.exports = router;
