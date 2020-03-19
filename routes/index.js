var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Venues = require("../models/venues");
var Catering = require("../models/catering");
var Decorations  = require("../models/decorations");

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

router.get('/decorations', function(req, res, next) {
    Decorations.find(function(err, decorations) {
        try {
            res.render('decorations', { decorations: decorations });
        }catch(err){
            next(err)
        }
    });
});

router.get('/venues', function(req, res) {
    Venues.find(function(err, venues) {
        if (err) {
            console.log(err);
        } else {
            console.log("Venues")
            res.render('venues', { venues: venues });
            //console.log(venues);
        }
    });
});

 router.get('/catering', function(req, res) {
    Catering.find(function(err, catering) {
        if (err) {
            console.log(err);
        } else {
            res.render('catering', { catering: catering });
            //console.log(venues);
        }
    });
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
        successRedirect: "/",
        failureRedirect: "/login"
    }), function(req, res){
});


// logout route
router.get("/logout", function(req, res){
   req.logout();
   req.flash("success", "Successfully LOGGED OUT!");
   res.redirect("/");
});




//testing
router.get("/venues/:id", function(req, res){
    //find the campground with provided ID
    Venues.findById(req.params.id, function(err, ven){
        if(err){
            console.log(err);
            console.log("Testing");
        } else {
            console.log("Listing all venues....")
            //render show template with that campground
            res.render("venues/showvenue", {venue: ven});
        }
    });
});


module.exports = router;
