const express = require("express");
const authToken=require("../middleware/authToken")

const cartsRouter = express.Router();

const {
  storecart,
  getcarts,
  getcartDetail,
  updatecart,
  deletecart,
} = require("../controller/cartcontroller");

cartsRouter.get("/carts",authToken,getcarts);
cartsRouter.post("/carts",authToken,storecart);
cartsRouter.get("/carts/:id",authToken,getcartDetail);
cartsRouter.put("/carts/:id",authToken,updatecart);
cartsRouter.delete("/carts/:id",authToken,deletecart);

module.exports = cartsRouter;
