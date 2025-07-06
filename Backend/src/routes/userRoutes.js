const app=require('express');
const router=app.Router();
const auth=require('../middlewares/auth');
const connections=require('../models/connectionRequest');
const user=require('../models/user')

const showUserFields='firstName lastName age username gender skills about photo'

router.get('/user/request/received',auth,async(req,res)=>{
    const loggedUser=req.user.id;
    
    try{
      const receivedRequests=await connections.find({
        toId:loggedUser,
        status:'interested'
      }).populate('fromId',showUserFields)

      if(receivedRequests.length==0){
        res.json({data:[]})
      }
      
      res.json({data:receivedRequests.map((e)=>e)});

    }catch(err){
        res.json({message:err.message});
    }
})

router.get('/user/connections',auth,async(req,res)=>{
   const loggedUser=req.user.id;

   try{
     const user_connections=await connections.find({
      $or:[
        {toId:loggedUser,status:'accepted'},
        {fromId:loggedUser,status:'accepted'}
      ]
     }).populate('toId',showUserFields)
     .populate('fromId',showUserFields);

     let result=[];

     if(user_connections.length==0){
       res.json({data:result})
       return;
     }
     
     //to prevent representing fromId data(as both from and toId are in user_connections data)
     user_connections.forEach((connection)=>{
        if(connection.fromId.equals(loggedUser)){
          result.push(connection.toId);
        }
        else{
          result.push(connection.fromId);
        }
     })

     res.json({data:result});
    // res.json({data:user_connections});

   }catch(err){
     res.status(401).json({message:err.message});
   }
})


router.get('/user/feed',auth,async (req,res)=>{
  const page=parseInt(req.query.page)||1;
  const limit=parseInt(req.query.limit)||5;

  try{
    const loggedUser=req.user;
    // const all_users=await user.find({}).select('-password');
    const user_connections_requests=await connections.find(
      {
        $or:[ {fromId:loggedUser.id},{toId:loggedUser.id}]
      }); //getting details of all users whom logged user send request or from whom user received request
     
      //or we can use set and $nin instead of below logic
    const users_requests_ids=user_connections_requests.map((user)=>{
      if(user.fromId.equals(loggedUser.id)){
        return user.toId;  //.toString needed for logic1
      }
      else{
        return user.fromId;
      }
    });

    //logic1
    // const feed=all_users.filter((user)=>{
    //   return (!(users_requests_ids.includes((user._id.toString())))&& user._id!=loggedUser.id);
    // })

    //logic2
    const feed=await user.find({
      $and:
      [
        {_id:{$nin:users_requests_ids}},
        {_id:{$ne:loggedUser.id}}
      ]    
    }).select('-password').skip((page-1)*5).limit(limit);
    
    if(feed.length==0){
      res.json({data:[]});
    }
    res.json({data:feed})
  
  }catch(err){
    res.json({message:err.message})
  }
})

module.exports=router;