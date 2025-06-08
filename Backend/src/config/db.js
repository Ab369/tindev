const mongoose=require('mongoose');

//connecting to DB
const connectDB=async()=>{
    await mongoose.connect('mongodb+srv://ompbabhinav2:U3BrGYnZiKnaUDs3@cluster0.3pz91ie.mongodb.net/tindev');
}

module.exports=connectDB;