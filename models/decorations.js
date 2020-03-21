var mongoose = require("mongoose");

var decorationsSchema = new mongoose.Schema({
   name: {type: String, required: true},
   image: String,
   description: String,
   location: String,
   price: String,
   contactno: String,
   id: {
      type: mongoose.Schema.Types.ObjectId
   }
});

module.exports = mongoose.model("decorations", decorationsSchema);