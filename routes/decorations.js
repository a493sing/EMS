var express = require("express");
var router  = express.Router();
var Campground = require("../models/ems");
// var middleware = require("../middleware");
var request = require("request");
var Decorations  = require("../models/decorations");

router.get('/', function(req, res, next) {
    Decorations.find({}, function(err, decorations) {
        if (err) {
            console.log(err);
        } else {
            console.log("Decorations")
            res.render('decorations', { decorations: decorations });
        }        
    });
});

module.exports = router;

