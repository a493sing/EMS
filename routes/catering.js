var express = require("express");
var router  = express.Router();
var Campground = require("../models/ems");
// var middleware = require("../middleware");
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

module.exports = router;

