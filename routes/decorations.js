var express = require("express");
var router  = express.Router();
var middleware = require("../middleware");
var Decorations  = require("../models/decorations");
var Comment = require("../models/comment");

router.get('/', function(req, res, next) {
    Decorations.find({}, function(err, decorations) {
        if (err) {
            console.log(err);
        } else {
            res.render('decorations', { decorations: decorations });
        }        
    });
});

router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("decoration/new"); 
});

//SHOW - shows more info about a selected decoration
router.get("/:id", function(req, res) {
    // find the campground with provided ID
    Decorations.findById(req.params.id).populate("comments").exec(function(error, foundDeco){
        if(error){
            console.log(error);
        }else{
            // render show template with that decoration
            res.render("decoration/showdecoration", {decorations: foundDeco});
            
        }
    });    
});


//CREATE - add new Decorator to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var price = req.body.price;
    var loc = req.body.location;
    var con = req.body.contactno;
    var flag = false;
    console.log("I am here too")
    if(name == "" || image == "" || desc == "" || price == "" || loc == "" || con == "") {
        console.log("Decorator info not complete.");
        req.flash("error", "There cannot be an empty field!!");
        res.redirect("/decorations/new");
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

//comment new
router.get("/:id/comments/new", middleware.isLoggedIn, function(req, res) {
    //console.log("MK : router.get(/:id/comments/new)");
    // find campground by id 
    Decorations.findById(req.params.id, function(err, foundDeco){
        if(err){
            console.log(err);
        }else{
             // send that campground to new comment form template
            res.render("decoration/comments/new", {decorations: foundDeco});
        }
    });
   
});

router.post("/:id/comments", middleware.isLoggedIn, function(req, res){
    //console.log("MK : router.post(/:id/comments)");
    // lookup the decoration using id
    Decorations.findById(req.params.id, function(err, foundDeco) {
        if(err){
            console.log(err);
            res.redirect("/decorations");
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
                   foundDeco.comments.push(comment);
                   foundDeco.save();  // saving the changes to the DB
                    // redirect to that show campground
                    //console.log("MK : ", comment);
                    req.flash("success", "Successfully added comment");
                    res.redirect('/decorations/' + foundDeco._id);
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
            
            res.render("decoration/comments/edit", {decorations_id: req.params.id, comment: foundComment});
            
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
            res.redirect('/decorations/' + req.params.id);
        }
    });
});

//COMMENT Destroy Route

router.delete("/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res){
    //console.log("MK : router.delete(/:id/comments/:comment_id)");
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            console.log(err);
            res.redirect("/decorations/" + req.params.id);
        }else{
            req.flash("success", "Successfully deleted the comment..");
            res.redirect("/decorations/" + req.params.id);
        }
    });
});

module.exports = router;

