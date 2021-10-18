const mongoose = require("mongoose");
const bcrypt=require("bcrypt")

const userSchema = mongoose.Schema({
  first_name: {
    type:String,
    required:true
  },
  last_name: String,
  email: {
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
  role: {
    type:String,
    required:true
  },
  profile_image: {
    type:String,
    required:true
  },
});

// this is callled before calling the save function as we user pre here
userSchema.pre("save",async function(next){
  // this will cahnge the password into bcrpt form with 10 rounds
  this.password=await bcrypt.hash(this.password,10);
  next();
})

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
