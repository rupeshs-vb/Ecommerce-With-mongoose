const jwt=require("jsonwebtoken")

const authToken=function(req,res,next){
    const token=req.header('auth-token');

    // if token is not found while calling the function authtoken into other filed or function it print
    // No token, Authoriztion required
    if(!token){
        return res.status(401).json({msg:"No token, Authoriztion required"});
    }
    try {
        // here i decoded the token or verifying the token with secret key
        const decoded=jwt.verify(token,"myjwtsecretkeyisthis");
        req.user=decoded.user;
        next();
    } catch (error) {
        res.status(401).json({msg:"token is not valid"});
    }
}

module.exports=authToken