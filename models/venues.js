var mongoose = require("mongoose");

var venuesSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String,
   location: String,
   capacity: Number,
   category: String,
   contactno: String,
   cateringavailability: Boolean,
   decorationavailability: Boolean
});

module.exports = mongoose.model("venues", venuesSchema);
