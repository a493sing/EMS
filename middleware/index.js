var Comment = require("../models/comment");
var Decorations  = require("../models/decorations");

module.exports = {
    isLoggedIn: function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash("error", "You must be signed in to do that!");
        res.redirect("/login");
    },
    checkUser: function(req, res, next){
        if(req.isAuthenticated()){
            Ems.findById(req.params.id, function(err, ems){
               if(ems.author.id.equals(req.user._id)){
                   next();
               } else {
                   req.flash("error", "You don't have permission to do that!");
                   console.log("BADD!!!");
                   //res.redirect("/campgrounds/" + req.params.id);
                   res.redirect("/" + req.params.id);
               }
            });
        } else {
            req.flash("error", "You need to be signed in to do that!");
            res.redirect("/login");
        }
    },
    checkCommentOwnership: function(req, res, next){
        if(req.isAuthenticated()){
            Comment.findById(req.params.comment_id, function(err, foundComment){
                if(err){
                    req.flash("error", "Something went wrong");
                    res.redirect("back");
                }else{
                    //If yes check if the user owns the campground
                    if(foundComment.author.id.equals(req.user._id)){
                        next();
                    }else{  //otherwise, redirect
                        req.flash("error", "You don't have permission to do that..");
                        res.redirect("back");
                    }
                    
                }
            });
            
        }else{      // otherwise redirect
            req.flash("error", "You must be logged in..");
            res.redirect("back");
        }
    },    
    checkDecorationsOwnership: function(req, res, next){
         if(req.isAuthenticated()){
            Decorations.findById(req.params.id, function(err, foundDeco){
                if(err){
                    req.flash("error", "Decoration not found..");
                    res.redirect("back");
                }else{
                    //If yes check if the user owns the campground
                    if(foundDeco.author.id.equals(req.user._id)){
                        next();
                    }else{  //otherwise, redirect
                        req.flash("error", "This is not a decoration you created, You do not have permission.. ");
                        res.redirect("back");
                    }
                    
                }
            });
            
        }else{      // otherwise redirect
            req.flash("error", "You must be logged in..");
            res.redirect("back");
        }
    }
}