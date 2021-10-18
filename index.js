const express = require("express");
const mongoose = require("mongoose");
const jwt=require("jsonwebtoken")

const app = express();
const port = 3000;//here i defined number 
const db = mongoose.connection;

// here i require all the routes and middleware
const userRouter = require("./routes/userRoute");
const roleRouter=require("./routes/rolesRoute")
const categoriesRouter=require("./routes/categoriesRoute")
const tagRouter=require("./routes/tagRouter")
const productRoute=require("./routes/productRoute")
const cartRouter=require("./routes/cartRoute")
const orderRoute=require("./routes/orderRoute")
const loginRouter=require("./routes/loginRoute")
const authToken=require("./middleware/authToken");



app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(userRouter);
app.use(roleRouter);
app.use(categoriesRouter);
app.use(tagRouter);
app.use(productRoute);
app.use(cartRouter);
app.use(orderRoute);
app.use(loginRouter);

// this is my logut endpoint with the help of token
// i used put here becuase i change the expiresin times....
app.put("/logout",authToken,async(req,res)=>{
  try {
    const token=req.header("auth-token");

    // as we know that we connot destroy the token manually so i just pass the key as blank string which expires in 1s
    const logout=await jwt.sign({token}," ",{expiresIn:"1s"})
    if(!logout){
      return res.status(500).send("already logout or need to be logged in");
    }
    res.status(200).send("successfully logout")
  } catch (error) {
      console.log(error.message);
      res.status(500).send("server error")  
  }
})

app.listen(port, () => {
  try {
    mongoose.connect("mongodb://127.0.0.1:27017/E-commerece");
    db.on("error", () => console.log(`Database connection error`));
    db.once("open", function () {
      console.log("Mongodb connected.");
    });
  } catch (error) {
    console.log(`someting went worng ${error.message}`);
  }
  console.log(`Example app listening on ${port} port!`);
});
