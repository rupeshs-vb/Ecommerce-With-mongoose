const bcrypt=require("bcrypt") //here i require the bcrcypt for hashing the password
const jwt=require("jsonwebtoken") 

// this line require the user schema
const userModel = require("../models/user");

// here i created the login user 
const loginUser=async(req,res)=>{
    try {
        
        // here i user according to the email if data find it store into userlogin
        const userlogin=await userModel.findOne({email:req.body.email});

        // here i check the email wether the email is in database or not 
        if(!userlogin){
            return res.status(400).send("incorrect email or password")
        }
        
        // after checking email here i compare the password  if 
        // login password or database password is matched it will send successfully login
        // otherwise it send "incorrect email or password"
        const isMatch=await bcrypt.compare(req.body.password,userlogin.password)
        if(!isMatch){
            return res.status(400).send("incorrect email or password")
        }
        
        // here i created the payload with the help of userlogin after user logged in successfully
        const payload={
            user:{
                id:userlogin.id
            }
        }
        
        jwt.sign(payload,
            "myjwtsecretkeyisthis",// myjwtsecretkeyisthis this is my secret key
            {expiresIn:"3d"}, //the generated token will expires in 3 days
            (err,token)=>{
                if(err) throw err;
                res.json({msg:"successfully login",token}) //this line print the msg as well as token 
            }
        )
    
    } catch (error) {
        console.error(error.message);
    }
}

// here i exports the loginUser
module.exports=loginUser