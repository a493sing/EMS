var express = require("express");
var router  = express.Router();
var middleware = require("../middleware");
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

router.get("/:id", function(req, res){
    //find the venues with provided ID
    Venues.findById(req.params.id, function(err, ven){
        if(err){
            console.log(err);
            console.log("Testing");
        } else {
            //render show template with that venues
            res.render("venues/showvenue", {venue: ven});
        }
    });
});

// router.get("/newVenue", function(req, res){
//     res.render("venues/new"); 
// });

//CREATE - add new venue to DB
router.post("/", middleware.isLoggedIn, function(req, res){
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
    if(name == "" || image == "" || desc == "" || price == "" || loc == "" || cap == "" || cat == "" || cater == "" || dec == "" || con == "") {
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

module.exports = router;

