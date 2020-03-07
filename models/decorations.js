var mongoose = require("mongoose");

var decorationsSchema = new mongoose.Schema({
   name: {type: String, required: true},
   image: String,
   description: String,
   location: String,
   price: String,
   contactno: String
});

module.exports = mongoose.model("decorations", decorationsSchema);