const express = require("express");
const authToken=require("../middleware/authToken")
const orderRouter = express.Router();

const {
  storeorder,
  getorders,
  getorderDetail,
  updateorder,
  deleteorder,
} = require("../controller/ordercontroller");

orderRouter.get("/orders",authToken,getorders);
orderRouter.post("/orders",authToken,storeorder);
orderRouter.get("/orders/:id",authToken,getorderDetail);
orderRouter.put("/orders/:id",authToken,updateorder);
orderRouter.delete("/orders/:id",authToken,deleteorder);

module.exports = orderRouter;
