const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  user_id:{
    type:String,
    required:true
  },
  total_items:{
    type:Number,
    required:true
  },
  products:[
    {
      type:Object,
      required:true
    }
  ],
  billing_address: {
    type:String,
    required:true
  },
  shipping_address:{
    type:String,
    required:true
  },
  transaction_status:{
      type: String,
      enum : ['passed','failed','pending'],
      required:true
  },
  payment_mode:{
    type:String,
    enum : ['cod','net banking','wallet','debit/credit cards'],
    required:true
  },
  payment_status:{
    type: String,
    enum : ['passed','failed','pending'],
    required:true
  },
  order_status:{
    type: String,
    enum : ['passed','failed','pending'],
    required:true
  }
});

const orderModal = mongoose.model("order", orderSchema);

module.exports = orderModal;
