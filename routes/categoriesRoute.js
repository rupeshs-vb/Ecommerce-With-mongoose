const express = require("express");
const authToken=require("../middleware/authToken")

const categoriesRouter = express.Router();

const {
  storecategories,
  getcategories,
  getcategoriesDetail,
  updatecategories,
  deletecategories,
} = require("../controller/categoriesControlle");

categoriesRouter.get("/categories", getcategories);
categoriesRouter.post("/categories", storecategories);
categoriesRouter.get("/categories/:id",getcategoriesDetail);
categoriesRouter.put("/categories/:id",authToken,updatecategories);
categoriesRouter.delete("/categories/:id",authToken,deletecategories);

module.exports = categoriesRouter;
