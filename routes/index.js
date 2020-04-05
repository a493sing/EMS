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
           console.log(err.message);
	failureFlash: true
           req.flash("error", err.message);
	res.redirect("/register");
        }
	else {
        passport.authenticate("local")(req, res, function(){
           req.flash("success", "Successfully Signed Up! Start your planning now " + req.body.username);
           res.redirect("/"); 
        });
	}
    });
});


//show login form
router.get("/login", function(req, res){
   res.render("login"); 
});


//handling login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/",
        failureRedirect: "/login",
	failureFlash: true
    }), function(req, res){
});


// logout route
router.get("/logout", function(req, res){
   req.logout();
   req.flash("success", "Successfully LOGGED OUT!");
   res.redirect("/");
});


router.get("/venues/:id", function(req, res){
    //find the venues with provided ID
    Venues.findById(req.params.id, function(err, ven){
        if(err){
            console.log(err);
            console.log("Testing");
        } else {
            console.log("Listing all venues....")

            //render show template with that venues
            res.render("venues/showvenue", {venue: ven});
        }
    });
});


//catering
router.get("/catering/:id", function(req, res){
    //find the catering with provided ID
    Catering.findById(req.params.id, function(err, catr){
        if(err){
            console.log(err);
            console.log("Testing");
        } else {
            console.log("Listing all venues....")
            //render show template with that catering
            res.render("catering/showcatering", {catering: catr});
        }
    });
});


//decorations 
router.get("/decorations/:id", function(req, res){
    //find the decorations with provided ID
    Decorations.findById(req.params.id, function(err, deco){
        if(err){
            console.log(err);
            console.log("Testing");
        } else {
            console.log("Listing all venues....")
            //render show template with that decorations
            res.render("decoration/showdecoration", {decorations: deco});
        }
    });
});

module.exports = router;
