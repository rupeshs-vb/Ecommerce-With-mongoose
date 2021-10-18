// here i require the order model
const orderModel = require("../models/orders");

// here i created the storeorder for posting the order 
const storeorder = async (req, res) => {
  try {
    const order = await new orderModel(req.body);
    // here we save the data into the database
    order.save();

    res.status(201).send(order);
  } catch (error) {
      console.log(error);
  }
};

// here we show the data of all orders
const getorders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.status(200).send(orders);
  } catch (error) {
    console.log(error);
  }
};

// here we show the data of the order with the respective id
const getorderDetail = async (req, res) => {

    try {
        console.log(req.params.id);
        const orders=await orderModel.find({_id:req.params.id});

        // if the id type is object and orders is not found it will return blank array to stop 
        // to print blank array i check the length of array if it is 0 means no data found then
        // it will print no id found 
        if(orders.length===0){
            return res.status(404).send("Id not Found")
        }
        res.status(200).send(orders)
    } catch (error) {
        // it check the if id is not ObjectId like if someone put http://localhost:3000/orders/123
        // it will print id not found
        if(error.kind==='ObjectId'){
            return res.status(404).send("Id not Found")
        }
        console.log(error);
    }
};

const updateorder = async (req, res) => {
    try {
        console.log(req.params.id);
        let orders=await orderModel.updateOne({_id:req.params.id},{$set:req.body});
        
        // here i check of the modified count is 0 or not if it is 0 it return "already updated" 
        // otherwise it will update the the value passed in the body
        if(orders.modifiedCount===0){
            return res.status(404).send("already updated")
        }
        
        // it will check the field is correct or not if the the acknowledgement is false then it through
        //  This field is not found please check your field otherwise it will work fine
        if(orders.acknowledged===false){
            return res.status(404).send("This field is not found please check your field")
        }
        
        res.status(202).send(orders)
        
    } catch (error) {
        // it check the if id is not ObjectId like if someone put http://localhost:3000/orders/123
        // it will print id not found
        if(error.kind==='ObjectId'){
            return res.status(404).send("Id not Found")
        }
        console.log(error);
    }
};

const deleteorder = async (req, res) => {
    try {
        console.log(req.params.id);
        const orders=await orderModel.deleteOne({_id:req.params.id});
        // here i check the deleteCount is 0 or not if it is 0 it return "order not found" 
        // otherwise it will delete the value which id passed in the url
        if(orders.deletedCount===0){
            return res.status(404).send("order not found")
        }
        
        res.status(200).send(orders)
        
        
    } catch (error) {
        if(error.kind==='ObjectId'){
            // it check the if id is not ObjectId like if someone put http://localhost:3000/orders/123
            // it will print id not found
            return res.status(404).send("Id not Found")
        }
        console.log(error);
    }
};

module.exports = {
  storeorder,
  getorders,
  getorderDetail,
  updateorder,
  deleteorder,
};
