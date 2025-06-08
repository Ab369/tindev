const jwt=require('jsonwebtoken');
const user=require('../models/user');

const userAuth=async(req,res,next)=>{
    //Auth-Step3. receiving stored cookies
    const cookie=req.cookies;
    const {token}=cookie;

    try{
       if(!token){
        throw new Error('invalid token');
       }

       //Auth-Step4.verify token and get data
       const decoded=jwt.verify(token,'jwtKey');
       const {email}=decoded;

       //check if email exist in db
       const isUser=await user.findOne({email:email});
       if(!isUser){
        throw new Error('user not exist');
       }

       //storing email in req object to be used after calling this mware
       req.user=decoded;
       next();

    }catch(err){
      res.status(404).json({message:err.message});
    }
}

module.exports=userAuth;