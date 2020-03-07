var mongoose = require("mongoose");

var cateringSchema = new mongoose.Schema({
   name: {type: String, required: true},
   image: String,
   description: String,
   location: String,
   price: String,
   beverages: String,
   contactno: String
});

module.exports = mongoose.model("catering", cateringSchema);