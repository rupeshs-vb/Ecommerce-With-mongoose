// here i require the categories model
const categoriesModel = require("../models/categories");

// here i created the storecategories for posting the categories 
const storecategories = async (req, res) => {
  try {
    const categories = await new categoriesModel(req.body);
    // here we save the data into the database
    categories.save();

    res.status(201).send(categories);
  } catch (error) {
      console.log(error);
  }
};

// here we show the data of all categories
const getcategories = async (req, res) => {
  try {
    const categoriess = await categoriesModel.find({});
    res.status(200).send(categoriess);
  } catch (error) {
    console.log(error);
  }
};

// here we show the data of the categories with the respective id
const getcategoriesDetail = async (req, res) => {

    try {
        console.log(req.params.id);
        const categoriess=await categoriesModel.find({_id:req.params.id});
        
        // if the id type is object and categories is not found it will return blank array to stop 
        // to print blank array i check the length of array if it is 0 means no data found then
        // it will print no id found 
        if(categoriess.length===0){
            return res.status(404).send("Id not Found")
        }
        res.status(200).send(categoriess)
    } catch (error) {
        // it check the if id is not ObjectId like if someone put http://localhost:3000/categories/123
        // it will print id not found
        if(error.kind==='ObjectId'){
            return res.status(404).send("Id not Found")
        }
        console.log(error);
    }
};

const updatecategories = async (req, res) => {
    try {
        console.log(req.params.id);
        let categoriess=await categoriesModel.updateOne({_id:req.params.id},{$set:req.body});
        
        // here i check of the modified count is 0 or not if it is 0 it return "already updated" 
        // otherwise it will update the the value passed in the body
        if(categoriess.modifiedCount===0){
            return res.status(404).send("already updated")
        }

        // it will check the field is correct or not if the the acknowledgement is false then it through
        //  This field is not found please check your field otherwise it will work fine
        if(categoriess.acknowledged===false){
            return res.status(404).send("This field is not found please check your field")
        }

        res.status(202).send(categoriess)
        
    } catch (error) {
        // it check the if id is not ObjectId like if someone put http://localhost:3000/categories/123
        // it will print id not found
        if(error.kind==='ObjectId'){
            return res.status(404).send("Id not Found")
        }
        console.log(error);
    }
};

const deletecategories = async (req, res) => {
    try {
        console.log(req.params.id);
        const categoriess=await categoriesModel.deleteOne({_id:req.params.id});
        // here i check the deleteCount is 0 or not if it is 0 it return "categories not found" 
        // otherwise it will delete the value which id passed in the url
        if(categoriess.deletedCount===0){
            return res.status(404).send("categories not found")
        }
        
        res.status(200).send(categoriess)
        
        
    } catch (error) {
        // it check the if id is not ObjectId like if someone put http://localhost:3000/categories/123
        // it will print id not found
        if(error.kind==='ObjectId'){
            return res.status(404).send("Id not Found")
        }
        console.log(error);
    }
};

module.exports = {
  storecategories,
  getcategories,
  getcategoriesDetail,
  updatecategories,
  deletecategories,
};
