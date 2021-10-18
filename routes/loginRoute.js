const express = require("express");

const loginRouter = express.Router();

const loginUser=require("../controller/loginController");

loginRouter.post("/login", loginUser);

module.exports=loginRouter;