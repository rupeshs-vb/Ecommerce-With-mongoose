const express = require("express");
const authToken=require("../middleware/authToken")

const productRouter = express.Router();

const {
  storeproduct,
  getproducts,
  getproductDetail,
  updateproduct,
  deleteproduct,
} = require("../controller/productcontroller");

productRouter.get("/products", getproducts);
productRouter.post("/products", storeproduct);
productRouter.get("/products/:id",getproductDetail);
productRouter.put("/products/:id",authToken,updateproduct);
productRouter.delete("/products/:id",authToken,deleteproduct);

module.exports = productRouter;
