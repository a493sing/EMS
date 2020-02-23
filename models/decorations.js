var mongoose = require("mongoose");

var decorationsSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String,
   location: String,
   price: String,
   contactno: String
});

module.exports = mongoose.model("Decorations", decorationsSchema);