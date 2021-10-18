// here i require the tag model 
const tagModel = require("../models/tag");

// here i created the store tag for posting the tag 
const storetag = async (req, res) => {
  try {
    const tag = await new tagModel(req.body);
    // here we save the data into the database  
    tag.save();

    res.status(201).send(tag);
  } catch (error) {
      console.log(error);
  }
};

// here we show the data of all tags
const gettags = async (req, res) => {
  try {
    const tags = await tagModel.find({});
    res.status(200).send(tags);
  } catch (error) {
    console.log(error);
  }
};

// here we show the data of the tag with the respective id
const gettagDetail = async (req, res) => {

    try {
        const tags=await tagModel.find({_id:req.params.id});
       
        // if the id type is object and tags is not found it will return blank array to stop 
        // to print blank array i check the length of array if it is 0 means no data found then
        // it will print no id found 
        if(tags.length===0){
            return res.status(404).send("Id not Found")
        }
        res.status(200).send(tags)
    } catch (error) {
        // it check the if id is not ObjectId like if someone put http://localhost:3000/tags/123
        // it will print id not found
        if(error.kind==='ObjectId'){
            return res.status(404).send("Id not Found")
        }
        console.log(error);
    }
};

const updatetag = async (req, res) => {
    try {
        let tags=await tagModel.updateOne({_id:req.params.id},{$set:req.body});
        
        // here i check of the modified count is 0 or not if it is 0 it return "already updated" 
        // otherwise it will update the the value passed in the body 
        if(tags.modifiedCount===0){
            return res.status(404).send("already updated")
        }

        // it will check the field is correct or not if the the acknowledgement is false then it through
        //  This field is not found please check your field otherwise it will work fine
        if(tags.acknowledged===false){
            return res.status(404).send("This field is not found please check your field")
          }
        res.status(202).send(tags)

    } catch (error) {
        // it check the if id is not ObjectId like if someone put http://localhost:3000/tags/123
        // it will print id not found
        if(error.kind==='ObjectId'){
            return res.status(404).send("Id not Found")
        }
        console.log(error);
    }
};

const deletetag = async (req, res) => {
    try {
        const tags=await tagModel.deleteOne({_id:req.params.id});
        // here i check the deleteCount is 0 or not if it is 0 it return "tag not found" 
        // otherwise it will delete the value which id passed in the url 
        if(tags.deletedCount===0){
            return res.status(404).send("tag not found")
        }
        
        res.status(200).send(tags)
        
    } catch (error) {
        // it check the if id is not ObjectId like if someone put http://localhost:3000/tags/123
        // it will print id not found
        if(error.kind==='ObjectId'){
            return res.status(404).send("Id not Found")
        }
        console.log(error);
    }
};

// here i exports all functions created above
module.exports = {
  storetag,
  gettags,
  gettagDetail,
  updatetag,
  deletetag,
};
