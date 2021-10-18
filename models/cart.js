const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  product:[{
    type:Object,
    required:true
  }],
  user:{ 
    type:Object,
    require:true
  },
  product_qty: {
    type:Number,
    required:true
  },
  base_price:{
    type:Object,
    required:true
  },
  sell_price:{
    type:Object,
    reuqired:true
  },
  total_price:{
    type:Number,
    reuqired:true
  }
});

const cartModal = mongoose.model("cart", cartSchema);

module.exports = cartModal;
