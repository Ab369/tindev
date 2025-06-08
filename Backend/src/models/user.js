const {mongoose,Schema}=require('mongoose');
const validator=require('validator');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');

//creating user schema
const userSchema=new Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
        minLength:3,
        maxLength:50
    },
    lastName:{
        type:String,
        trim:true,
        minLength:3,
        maxLength:50
    },
    age:{
        type:Number,
        required:true,
        min:1,
        max:120
    },
    username:{
        type:String,
        trim:true,
        unique:true,
        required:true,
        maxLength:20
    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        lowercase:true,
        validate:{
            validator:function(value){
                return validator.isEmail(value)
            }
        },
    },
    password:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        enum:{
            values:['Male','Female','male','female'],
            message:'Gender invalid'
        }
    },
    skills:{
        type:[String],
        default:['No skills added'],
        validate:{
            validator:(arr)=>arr.length>0 && arr.length<10,
            message:'skills cannot be more than 10'
        }
    },
    about:{
        type:String,
        default:'No about',
        maxLength:200
    },
    photo:{
        type:String,
        default:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
        validate:(value)=>validator.isURL(value)
    },
},
  { timestamps: true }
)

//creating schema methods
userSchema.methods.getJWTtoken=function(){
    const token=jwt.sign({id:this._id,email:this.email},'jwtKey',{expiresIn:'1d'});
    return token;
}


userSchema.methods.validateBcryptPassword=async function(password){
  const hashedPass=this.password;
  const isPasswordValid=await bcrypt.compare(password,hashedPass);
  return isPasswordValid;
}

//creaing user model of above schema
const User=mongoose.model('User',userSchema);

module.exports=User;