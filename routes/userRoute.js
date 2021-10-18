const express = require("express");
const authToken=require("../middleware/authToken")// here i require the middleware
const userRouter = express.Router();

const {
  storeUser,
  getUsers,
  getuserDetail,
  updateuser,
  deleteUser,
} = require("../controller/usercontroller");

userRouter.get("/users",getUsers);
userRouter.post("/users",storeUser);
userRouter.get("/users/:id",getuserDetail);
userRouter.put("/users/:id",authToken,updateuser);
userRouter.delete("/users/:id",authToken,deleteUser);

module.exports = userRouter;
