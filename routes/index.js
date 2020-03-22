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

router.get("/newVenue", function(req, res){
    res.render("venues/new"); 
});

router.get("/newDecoration", function(req, res){
    res.render("decoration/new"); 
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You must be signed in to do that!");
    res.redirect("/login");
}

//CREATE - add new venue to DB
router.post("/venues", isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var price = req.body.price;
    var loc = req.body.location;
    var cap = req.body.capacity;
    var cat = req.body.category;
    var con = req.body.contactno;
    var cater = req.body.cateringAvailable;
    var dec = req.body.decorationAvailable;
    var flag = false;
    if(name == "" || image == "" || desc == "" || price == "" || loc == "" || cap == "" || cat == "" || cater == "" || dec == "") {
        console.log("Venue info not complete.");
        req.flash("error", "There cannot be an empty field!!");
        res.redirect("/newVenue");
    } else {
        flag = true;
        var newVenue = {name: name, image: image, description: desc, price: price, location: loc, capacity: cap, 
            category: cat, contactno: con, cateringAvailable: cater, decorationAvailable: dec}
        // Create a new venue and save to DB
        if(flag) {
            Venues.create(newVenue, function(err, newlyCreated){
                if(err){
                    console.log(err);
                } else {
                    //redirect back to venues page
                    console.log(newlyCreated);
                    res.redirect("/venues");
                }
            });
        }
    }

});


/*name: {type: String, required: true},
   image: String,
   description: String,
   location: String,
   price: String,
   contactno: String,*/

//CREATE - add new Decorator to DB
router.post("/decorations", isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var price = req.body.price;
    var loc = req.body.location;
    var con = req.body.contactno;
    var flag = false;
    if(name == "" || image == "" || desc == "" || price == "" || loc == "" || con == "") {
        console.log("Decorator info not complete.");
        req.flash("error", "There cannot be an empty field!!");
        res.redirect("/newDecoration");
    } else {
        flag = true;
        var newDeco = {name: name, image: image, description: desc, price: price, location: loc, 
            contactno: con}
        // Create a new Decorator and save to DB
        if(flag) {
            Decorations.create(newDeco, function(err, newlyCreated){
                if(err){
                    console.log(err);
                } else {
                    //redirect back to venues page
                    console.log(newlyCreated);
                    res.redirect("/decorations");
                }
            });
        }
    }

});




module.exports = router;
