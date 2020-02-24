var mongoose = require("mongoose");

var cateringSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String,
   location: String,
   price: String,
   beverages: Boolean,
   contactno: String
});

module.exports = mongoose.model("catering", cateringSchema);