// here i require the user model 
const userModel = require("../models/user");

// here i created the store user for posting the user 
const storeUser = async (req, res) => {
  try {
    // here the user store the value passed by the body   
    const user = await new userModel(req.body);
    // here check the user email must be unique or user already posted the document or not
    const userEmail=await userModel.findOne({email:req.body.email});
    // this condition throw bad request is user already exixts
    if(userEmail){
        return res.status(400).send("user already exists")
    }

    // NOTE:-before saving the data I also define pre function in user model 
    // where it will change the password into bcrypt form then store into database

    // here we save the data into the database  
    user.save();

    res.status(201).send(user);
  } catch (error) {
      console.log(error);
      res.status(500).send("Server Error")
  }
};

// here we show the data of all user
const getUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).send(users);
  } catch (error) {
    console.log(error);
  }
};

// here we show the data of the user with the respective id
const getuserDetail = async (req, res) => {

    try {
        // here we store the data into user if id is found
        const users=await userModel.find({_id:req.params.id});
        
        // if the id type is object and user is not found it will return blank array to stop 
        // to print blank array i check the length of array if it is 0 means no data found then
        // it will print no id found 
        if(users.length===0){
            return res.status(404).send("Id not Found")
        }
        res.status(200).send(users)
    } catch (error) {

        // it check the if id is not ObjectId like if someone put http://localhost:3000/users/123
        // it will print id not found
        if(error.kind==='ObjectId'){
            return res.status(404).send("Id not Found")
        }
        console.log(error);
    }
};

const updateuser = async (req, res) => {
    try {
        let users=await userModel.updateOne({_id:req.params.id},{$set:req.body});
        
        // here i check of the modified count is 0 or not if it is 0 it return "already updated" 
        // otherwise it will update the the value passed in the body 
        if(users.modifiedCount===0){
            return res.status(404).send("already updated")
        }

        // it will check the field is correct or not if the the acknowledgement is false then it through
        //  This field is not found please check your field otherwise it will work fine
        if(users.acknowledged===false){
            return res.status(404).send("This field is not found please check your field")
          }
        res.status(202).send(users)

    } catch (error) {
        // it check the if id is not ObjectId like if someone put http://localhost:3000/users/123
        // it will print id not found
        if(error.kind==='ObjectId'){
            return res.status(404).send("Id not Found")
        }
        console.log(error);
    }
};

const deleteUser = async (req, res) => {
    try {
        
        const users=await userModel.deleteOne({_id:req.params.id});
        // here i check the deleteCount is 0 or not if it is 0 it return "user not found" 
        // otherwise it will delete the value which id passed in the url 
        if(users.deletedCount===0){
            return res.status(404).send("user not found")
        }
        
        res.status(200).send(users)
        
        
    } catch (error) {

        // it check the if id is not ObjectId like if someone put http://localhost:3000/users/123
        // it will print id not found
        if(error.kind==='ObjectId'){
            return res.status(404).send("Id not Found")
        }
        console.log(error);
    }
};

// here i exports all functions created above
module.exports = {
  storeUser,
  getUsers,
  getuserDetail,
  updateuser,
  deleteUser,
};
