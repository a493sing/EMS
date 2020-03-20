var express = require("express");
var router  = express.Router();
var Campground = require("../models/ems");
// var middleware = require("../middleware");
var request = require("request");
var Venues = require("../models/venues");

router.get('/', function(req, res) {
    Venues.find({}, function(err, venues) {
        if (err) {
            console.log(err);
        } else {
            console.log("Venues")
            res.render('venues', { venues: venues });
        }
    });
});

/* STARTED MODIFYING FOR VENUES - TO BE CONTINUED

// CREATE - add new venue to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from form and add to venues array
    var name = req.body.name;
    var location = req.body.location;
    var cap = req.body.capacity;
    var price = req.body.price;
    var contact = req.body.contact;
    var catering = req.body.catering;
    var decoration = req.body.decoration;
    var category = req.body.category;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }    
    var newVenue = {
        name: name, 
        image: image, 
        price: price,
        description: description,
        location: location,
        capacity: cap,
        category: category,
        contactno: contact,
        cateringAvailable: catering,
        decorationAvailable: decoration,        
        author:author
    }

    // Create a new campground and save to DB
    Venues.create(newVenue, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            console.log(newlyCreated);
            res.redirect("/venues");
        }
    });
});

//NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("venues/new"); 
});

// SHOW - shows more info about one campground
router.get("/:id", function(req, res){
    //find the campground with provided ID
    Venues.findById(req.params.id).populate("comments").exec(function(err, foundVenue){
        if(err){
            console.log(err);
        } else {
            console.log(foundVenue)
            //render show template with that campground
            res.render("venues/show", {venue: foundCampground});
        }
    });
});

router.get("/:id/edit", middleware.checkUserCampground, function(req, res){
    console.log("IN EDIT!");
    //find the campground with provided ID
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            //render show template with that campground
            res.render("campgrounds/edit", {campground: foundCampground});
        }
    });
});

router.put("/:id", function(req, res){
    var newData = {name: req.body.name, image: req.body.image, description: req.body.desc};
    Campground.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, campground){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            req.flash("success","Successfully Updated!");
            res.redirect("/campgrounds/" + campground._id);
        }
    });
});


//middleware
// function isLoggedIn(req, res, next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     req.flash("error", "You must be signed in to do that!");
//     res.redirect("/login");
// }

*/

module.exports = router;

