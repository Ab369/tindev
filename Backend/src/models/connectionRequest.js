const mongoose=require('mongoose');
const schema=mongoose.Schema;

//earlier toId and fromId not there so was not able to reference to user collection
const connectionSchema=new schema({
    fromId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    // fromEmail:{
    //     type:String,
    //     required:true
    // },
    toId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    // toEmail:{
    //     type:String,
    //     required:true
    // },
    status:{
       type:String,
       required:true,
       enum:{
            values:['interested','ignored','accepted','rejected'],
            message:'invalid status type'
        }
    }
},
{timestamps:true}
)

//index for optimisation 
connectionSchema.index({fromEmail:1,toEmail:1});

//pre middleware use
connectionSchema.pre('save',function(next){
  if(this.fromId.equals(this.toId))
    throw new Error('connection to yourself not allowed');

  next();
})

const connectionModel=mongoose.model('ConnectionRequests',connectionSchema);
module.exports=connectionModel;