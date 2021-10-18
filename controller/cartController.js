// here i require the carts model
const cartModel = require("../models/cart");

// here i created the storecart for posting the cart 
const storecart = async (req, res) => {
  try {
    const cart = await new cartModel(req.body);
    // here we save the data into the database
    cart.save();

    res.status(201).send(cart);
  } catch (error) {
      console.log(error);
  }
};

// here we show the data of all carts
const getcarts = async (req, res) => {
  try {
    const carts = await cartModel.find({});
    res.status(200).send(carts);
  } catch (error) {
    console.log(error);
  }
};

// here we show the data of the cart with the respective id
const getcartDetail = async (req, res) => {

    try {
        console.log(req.params.id);
        const carts=await cartModel.find({_id:req.params.id});

        // if the id type is object and cart is not found it will return blank array to stop 
        // to print blank array i check the length of array if it is 0 means no data found then
        // it will print no id found 
        if(carts.length===0){
            return res.status(404).send("Id not Found")
        }
        res.status(200).send(carts)
    } catch (error) {

        // it check the if id is not ObjectId like if someone put http://localhost:3000/carts/123
        // it will print id not found
        if(error.kind==='ObjectId'){
            return res.status(404).send("Id not Found")
        }
        console.log(error);
    }
};

const updatecart = async (req, res) => {
    try {
        console.log(req.params.id);
        let carts=await cartModel.updateOne({_id:req.params.id},{$set:req.body});
        
        // here i check of the modified count is 0 or not if it is 0 it return "already updated" 
        // otherwise it will update the the value passed in the body
        if(carts.modifiedCount===0){
            return res.status(404).send("already updated")
        }

        // it will check the field is correct or not if the the acknowledgement is false then it through
        //  This field is not found please check your field otherwise it will work fine
        if(carts.acknowledged===false){
            return res.status(404).send("This field is not found please check your field")
        }
        res.status(202).send(carts)
        
    } catch (error) {
        // it check the if id is not ObjectId like if someone put http://localhost:3000/carts/123
        // it will print id not found
        if(error.kind==='ObjectId'){
            return res.status(404).send("Id not Found")
        }
        console.log(error);
    }
};

const deletecart = async (req, res) => {
    try {
        console.log(req.params.id);
        const carts=await cartModel.deleteOne({_id:req.params.id});
        // here i check the deleteCount is 0 or not if it is 0 it return "cart not found" 
        // otherwise it will delete the value which id passed in the url
        if(carts.deletedCount===0){
            return res.status(404).send("cart not found")
        }
    
        res.status(200).send(carts)
        
        
    } catch (error) {
        // it check the if id is not ObjectId like if someone put http://localhost:3000/carts/123
        // it will print id not found
        if(error.kind==='ObjectId'){
            return res.status(404).send("Id not Found")
        }
        console.log(error);
    }
};

module.exports = {
  storecart,
  getcarts,
  getcartDetail,
  updatecart,
  deletecart,
};
