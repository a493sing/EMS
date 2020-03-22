var mongoose = require("mongoose");

var cateringSchema = new mongoose.Schema({
   name: {type: String, required: true},
   image: String,
   description: String,
   location: String,
   price: String,
   beverages: String,
   contactno: String,
   id: {
      type: mongoose.Schema.Types.ObjectId
   }
});

module.exports = mongoose.model("catering", cateringSchema);