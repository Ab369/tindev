const app=require('express');
const router=app.Router();
const auth=require('../middlewares/auth');
const user=require('../models/user');
const bcrypt=require('bcrypt')

//profile
router.get('/profile/get',auth, async(req,res)=>{
    try{
         const email=req.user.email;
         const loggedUser=await user.findOne({email:email});
         res.json({data:loggedUser});
      }catch(err){
       res.json({message:err.message});
     }
});

//edit profile
router.patch('/profile/edit',auth,async(req,res)=>{
    const updates=req.body;
    const loggedUser=await user.findOne({email:req.user.email});

    try{
        //validations to ensure sanitised data
        const restricted_updates=['email','username'];
        const update_restricted=Object.keys(updates).some((k)=>restricted_updates.includes(k));
        if(update_restricted)throw new Error('updating restricted fields');
        
        await user.findOneAndUpdate({username:loggedUser.username},updates,{runValidators:true}); //true to run db level validations
        res.json({message:'User profile updated!'})
    }catch(err){
        res.json({message:err.message})
    }
})

//delete profile
router.delete('/profile/delete',auth,async(req,res)=>{
    const email=req.user.email;
    try{
        await user.findOneAndDelete({email:email});
        res.json({message:'user deleted'});
    }catch(err){
        res.json({message:err.message});
    }
})

//change password
router.patch('/profile/changePassword',auth,async(req,res)=>{
    const email=req.user.email;
    const newPassword=req.body.newPassword;
    const oldPassword=req.body.oldPassword;
    
    try{
       const loggedUser=await user.findOne({email:email});
       
       //checking entered oldPassword correct or not
       const isOldPassValid=await loggedUser.validateBcryptPassword(oldPassword);
       if(!isOldPassValid)
       throw new Error('invalid old password');
       
       const hashedPass=await bcrypt.hash(newPassword,10);
       loggedUser.password=hashedPass;
       await loggedUser.save();
       
       res.json({message:'Password Changed'});
    }catch(err){
        res.json({message:err.message})
    }
})

module.exports=router;