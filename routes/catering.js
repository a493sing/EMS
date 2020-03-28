var express = require("express");
var router  = express.Router();
var middleware = require("../middleware");
var request = require("request");
var Catering = require("../models/catering");
var Comment = require("../models/comment");

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
    Catering.findById(req.params.id).populate("comments").exec(function(err, catr){
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

//comment new
router.get("/:id/comments/new", middleware.isLoggedIn, function(req, res) {
    //console.log("MK : router.get(/:id/comments/new)");
    // find campground by id 
    Catering.findById(req.params.id, function(err, catering){
        if(err){
            console.log(err);
        }else{
             // send that campground to new comment form template
            res.render("catering/comments/new", {catering: catering});
        }
    });
   
});

router.post("/:id/comments", middleware.isLoggedIn, function(req, res){
    //console.log("MK : router.post(/:id/comments)");
    // lookup the decoration using id
    Catering.findById(req.params.id, function(err, catering) {
        if(err){
            console.log(err);
            res.redirect("/catering");
        }else{
            // create new comment
            Comment.create(req.body.comment, function(err, comment){
               if(err){
                   req.flash("error", "something went wrong");
                   console.log(err);
               }else{
                   // add username and id to the comment
                   comment.author.id = req.user._id;
                   comment.author.username = req.user.username;
                   //save comment
                   comment.save();
                   // connect new comment to the campgound
                   catering.comments.push(comment);
                   catering.save();  // saving the changes to the DB
                    // redirect to that show campground
                    //console.log("MK : ", comment);
                    req.flash("success", "Successfully added comment");
                    res.redirect('/catering/' + catering._id);
               }
            });      
           
        }
    });
    
});

// EDIT Route
router.get("/:id/comments/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    //console.log("MK : router.get(/:id/comments/:comment_id/edit)");
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if(err){
            console.log(err);
            res.redirect("back");
        }else{
            
            res.render("catering/comments/edit", {catering_id: req.params.id, comment: foundComment});
            
        }
    });
});

//UPDATE Route
router.put("/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res){
    // console.log("MK : router.put(/:id/comments/:comment_id)");
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            console.log(err);
            res.redirect("back");
        }else{
            res.redirect('/catering/' + req.params.id);
        }
    });
});

//COMMENT Destroy Route

router.delete("/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res){
    //console.log("MK : router.delete(/:id/comments/:comment_id)");
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            console.log(err);
            res.redirect("/catering/" + req.params.id);
        }else{
            req.flash("success", "Successfully deleted the comment..");
            res.redirect("/catering/" + req.params.id);
        }
    });
});

module.exports = router;

