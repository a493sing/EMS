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

   cateringAvailable: String,
   decorationAvailable: String,
   id: {
      type: mongoose.Schema.Types.ObjectId
   }

});

module.exports = mongoose.model("venues", venuesSchema);
