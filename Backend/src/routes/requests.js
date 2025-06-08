const app=require('express');
const router=app.Router();
const auth=require('../middlewares/auth')
const connections=require('../models/connectionRequest');

router.post('/request/send/:status/:id',auth,async(req,res)=>{
     const status=req.params.status;
     const toId=req.params.id;
     const fromId=req.user.id;

     try{
     //validation1
     const allowedStatus=['interested','ignored'];
     if(!allowedStatus.includes(status)){
        throw new Error('invalid status given');
     }
     //validation2
     const isAlreadyExist=await connections.findOne({
        $or:[
            {fromId:fromId,toId:toId},
            {fromId:toId,toId:fromId}
        ]
     })

     if(isAlreadyExist){
        throw new Error('ERROR-duplicate connection request');
     }


     //save to db
     const connectionReqObj=new connections({fromId:fromId,toId:toId,status:status});
     await connectionReqObj.save();
     res.json({message:'connection request sent'});
    }catch(err){
        res.status(500).json({message:err.message});
    }
})

router.post('/request/review/:status/:requestId',auth,async(req,res)=>{
    const {requestId,status}=req.params;
    
    try{
        const allowedStatus=['accepted','rejected'];
        if(!allowedStatus.includes(status)){
            throw new Error('invalid status given');
        }

        const getRequest=await connections.findOne({
            _id:requestId,
            toId:req.user.id,
            status:'interested'
        })

        if(!getRequest){
            throw new Error('connection request not exist');
        }
        
        getRequest.status=status;
        getRequest.save();
        res.json({message:'request '+status});

    }catch(err){
        res.json({message:err.message});
    }
})

module.exports=router;