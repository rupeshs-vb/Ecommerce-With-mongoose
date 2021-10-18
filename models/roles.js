const mongoose = require("mongoose");

const roleSchema = mongoose.Schema({
  name: {
    type:String,
    required:true
  },
  slug: {
    type:String,
    required:true
  },
});

const roleModel = mongoose.model("role", roleSchema);

module.exports = roleModel;
