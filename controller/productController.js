// here i require the products model
const productModel = require("../models/products");

// here i created the storeproduct for posting the product 
const storeproduct = async (req, res) => {
  try {
    const product = await new productModel(req.body);
    // here we save the data into the database
    product.save();

    res.status(201).send(product);
  } catch (error) {
      console.log(error);
  }
};

// here we show the data of all products and searching is also done here
const getproducts = async (req, res) => {
    try {
        let products;
        
        // this Object.keys(req.query) return the length of the query 
        // if it is 0 all product data will be printed means
        // someone pass http://localhost:3000/products this only no querry then 
        // it will print all the products data
        if(Object.keys(req.query).length===0){
          products = await productModel.find();     
        }
        else{
          // this else check bloack run when someone put query into url
          // it will check the data into database then prit according to the querry
          products = await productModel.find(req.query);

          // if someone pass querry but no data found it will return blanck array to avoid this
          // i check the lenght of the array if it 0 then it will simply return  "no product found"
          // otherwise it will print the data according to the querry
          if(products.length===0){
            return res.status(400).send("no product found")
          }
        }
        res.status(200).send(products);
      } catch (error) {
        console.log(error)
      }
    
};
// here we show the data of the product with the respective id
const getproductDetail = async (req, res) => {

    try {
        console.log(req.params.id);
        const products=await productModel.find({_id:req.params.id});

        // if the id type is object and product is not found it will return blank array to stop 
        // to print blank array i check the length of array if it is 0 means no data found then
        // it will print no id found 
        if(products.length===0){
          return res.status(404).send("Id not Found")
      }
        res.status(200).send(products)
    } catch (error) {
        // it check the if id is not ObjectId like if someone put http://localhost:3000/products/123
        // it will print id not found
        if(error.kind==='ObjectId'){
          return res.status(404).send("Id not Found")
        }
        console.log(error);
    }
};

const updateproduct = async (req, res) => {
    try {
        
        let products=await productModel.updateOne({_id:req.params.id},{$set:req.body});

        // here i check of the modified count is 0 or not if it is 0 it return "already updated" 
        // otherwise it will update the the value passed in the body
        if(products.modifiedCount===0){
          return res.status(404).send("already updated")
        }

        // it will check the field is correct or not if the the acknowledgement is false then it through
        //  This field is not found please check your field otherwise it will work fine
        if(products.acknowledged===false){
          return res.status(404).send("This field is not found please check your field")
        }
        res.status(202).send(products)
    } catch (error) {
        // it check the if id is not ObjectId like if someone put http://localhost:3000/products/123
        // it will print id not found
        if(error.kind==='ObjectId'){
          return res.status(404).send("Id not Found")
        }
        console.log(error);
    }
};

const deleteproduct = async (req, res) => {
    try {
        const products=await productModel.deleteOne({_id:req.params.id});
        // here i check the deleteCount is 0 or not if it is 0 it return "product not found" 
        // otherwise it will delete the value which id passed in the url
        if(products.deletedCount===0){
          return res.status(404).send("product not found")
        }
        
        res.status(200).send(products)
        
    } catch (error) {
        // it check the if id is not ObjectId like if someone put http://localhost:3000/products/123
        // it will print id not found
        if(error.kind==='ObjectId'){
          return res.status(404).send("Id not Found")
        }
        console.log(error);
    }
};

module.exports = {
  storeproduct,
  getproducts,
  getproductDetail,
  updateproduct,
  deleteproduct,
};
