// here i require the role model 
const roleModel = require("../models/roles");

// here i created the storerole for posting the role 
const storerole = async (req, res) => {
  try {
    const role = await new roleModel(req.body);
    // here we save the data into the database 
    role.save();

    res.status(201).send(role);
  } catch (error) {
      console.log(error);
  }
};

// here we show the data of all roles
const getroles = async (req, res) => {
  try {
    const roles = await roleModel.find({});
    res.status(200).send(roles);
  } catch (error) {
    console.log(error);
  }
};

// here we show the data of the role with the respective id
const getroleDetail = async (req, res) => {

    try {
        console.log(req.params.id);
        const roles=await roleModel.find({_id:req.params.id});
       
        // if the id type is object and roles is not found it will return blank array to stop 
        // to print blank array i check the length of array if it is 0 means no data found then
        // it will print no id found 
        if(roles.length===0){
            return res.status(404).send("Id not Found")
        }
        res.status(200).send(roles)
    } catch (error) {
        // it check the if id is not ObjectId like if someone put http://localhost:3000/roles/123
        // it will print id not found
        if(error.kind==='ObjectId'){
            return res.status(404).send("Id not Found")
        }
        console.log(error);
    }
};

const updaterole = async (req, res) => {
    try {
        console.log(req.params.id);
        let roles=await roleModel.updateOne({_id:req.params.id},{$set:req.body});
        
        // here i check of the modified count is 0 or not if it is 0 it return "already updated" 
        // otherwise it will update the the value passed in the body
        if(roles.modifiedCount===0){
            return res.status(404).send("already updated")
        }

        // it will check the field is correct or not if the the acknowledgement is false then it through
        //  This field is not found please check your field otherwise it will work fine
        if(roles.acknowledged===false){
            return res.status(404).send("This field is not found please check your field")
          }
          
        res.status(202).send(roles)
        
    } catch (error) {
        // it check the if id is not ObjectId like if someone put http://localhost:3000/roles/123
        // it will print id not found
        if(error.kind==='ObjectId'){
            return res.status(404).send("Id not Found")
        }
        console.log(error);
    }
};

const deleterole = async (req, res) => {
    try {
        console.log(req.params.id);
        const roles=await roleModel.deleteOne({_id:req.params.id});

        // here i check the deleteCount is 0 or not if it is 0 it return "role not found" 
        // otherwise it will delete the value which id passed in the url
        if(roles.deletedCount===0){
            return res.status(404).send("role not found")
        }
        
        res.status(200).send(roles)
        
    } catch (error) {
        // it check the if id is not ObjectId like if someone put http://localhost:3000/roles/123
        // it will print id not found
        if(error.kind==='ObjectId'){
            return res.status(404).send("Id not Found")
        }
        console.log(error);
    }
};

module.exports = {
  storerole,
  getroles,
  getroleDetail,
  updaterole,
  deleterole,
};
