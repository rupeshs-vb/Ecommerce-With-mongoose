const mongoose = require("mongoose");

const categoriesSchema = mongoose.Schema({
  name: {
      type:String,
      require:true
  },
  slug: {
    type:String,
    required:true
  },
  image: {
    type:String,
    required:true
  },
  description: {
    type:String,
    required:true
  },
});

const categoriesModal = mongoose.model("categories", categoriesSchema);

module.exports = categoriesModal;
