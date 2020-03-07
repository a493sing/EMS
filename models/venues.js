var mongoose = require("mongoose");

var venuesSchema = new mongoose.Schema({
   name: {type: String, required: true},
   image: String,
   price: String,
   description: String,
   location: String,
   capacity: Number,
   category: String,
   contactno: String,
   cateringAvailable: Boolean,
   decorationAvailable: Boolean
});

module.exports = mongoose.model("venues", venuesSchema);
