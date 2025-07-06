const app=require('express');
const router=app.Router();
const user=require('../models/user');
const bcrypt=require('bcrypt')

//create new account
router.post('/signup',async (req,res)=>{
   try{ 
    const {email,password,firstName,lastName,username,age,gender}=req.body;
    const passwordHash=await bcrypt.hash(password,10) //hashing password in Db

    //add user
    const newUser=new user({email,firstName,lastName,username,age,gender,password:passwordHash});
    await newUser.save();
    res.json({message:'user account created!'});
}catch(err){
    res.status(500).json({message:err.message});
}
})

//login route
router.post('/login',async(req,res)=>{
    try{
         const email=req?.body?.email;
         const password=req?.body?.password;
        if(!email|!password){
        throw new Error('Email or Password undefined')
        }
       const found_user=await user.findOne({email:email});
       if(!found_user){
        throw new Error('invalid credentials');
       }

        //const valid_password=await bcrypt.compare(password,found_user.password);
        const valid_password= await found_user.validateBcryptPassword(password); //same as above but using schema methods
        
       if(!valid_password){
        throw new Error('invalid credentials');
       }
    //    //Auth-Step1.getting jwt token-for secretly storing email
    //    const token=jwt.sign({email:email},'jwtKey',{expiresIn:'1d'});
       const token=found_user.getJWTtoken(); //doing Auth-Step1 using schema method

       //Auth-Step2.storing token in cookies (Auth-Step 3 and 4 written in auth mware)
       res.cookie('token',token,{ expires: new Date(Date.now() + 9000000)});
       
       res.json({message:'Logged in succesfully!',data:found_user});
    }catch(err){
        res.status(401).json({message:'Error Logging In: '+err.message})
    }
})

router.get('/logout',(req,res)=>{
    res.clearCookie('token');
    res.json({message:'logged Out'})
})


module.exports=router;