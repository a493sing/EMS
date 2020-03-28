var express = require("express");
var router  = express.Router();
var middleware = require("../middleware");
var request = require("request");
var Catering = require("../models/catering");

router.get('/', function(req, res) {
    Catering.find({}, function(err, catering) {
        if (err) {
            console.log(err);
        } else {
            //console.log("Catering")
            res.render('catering', { catering: catering });
        }
    });
});

router.get("/:id", function(req, res){
    //find the catering with provided ID
    Catering.findById(req.params.id, function(err, catr){
        if(err){
            console.log(err);
            console.log("Testing");
        } else {
            //render show template with that catering
            res.render("catering/showcatering", {catering: catr});
        }
    });
});

// router.get("/newCaterer", function(req, res){
//     res.render("catering/new"); 
// });

//CREATE - add new Caterer to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var price = req.body.price;
    var loc = req.body.location;
    var con = req.body.contactno;
    var bev = req.body.beverages;
    var flag = false;
    if(name == "" || image == "" || desc == "" || price == "" || loc == "" || con == "" || bev == "") {
        console.log("Caterer info not complete.");
        req.flash("error", "There cannot be an empty field!!");
        res.redirect("/newCaterer");
    } else {
        flag = true;
        var newCaterer = {name: name, image: image, description: desc, price: price, location: loc, 
            contactno: con, beverages: bev}
        // Create a new Caterer and save to DB
        if(flag) {
            Catering.create(newCaterer, function(err, newlyCreated){
                if(err){
                    console.log(err);
                } else {
                    //redirect back to venues page
                    console.log(newlyCreated);
                    res.redirect("/catering");
                }
            });
        }
    }

});

module.exports = router;

