const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
      type:String,
      require:true
  },
  thumbnail:{
    type:String,
    required:true
  },
  product_Gallery: [{
    type:String,
    required:true
  }],
  description: {
    type:String,
    required:true
  },
  base_price:{
    type:Number,
    required:true
  },
  sell_price:{
    type:Number,
    required:true
  },
  category_name:{
    type:String,
    required:true
  },
  tags:{
    type:String,
    required:true
  },
  date:{
    type:Date,
    default:Date.now
  },
  additional_information:String
});

const productModal = mongoose.model("product", productSchema);

module.exports = productModal;
