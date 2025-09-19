const mongoose=require('mongoose');
require('dotenv').config();
const db_url='mongodb+srv://ompbabhinav2:U3BrGYnZiKnaUDs3@cluster0.3pz91ie.mongodb.net/tindev';
//connecting to DB
const connectDB=async()=>{
    await mongoose.connect(db_url);
}

module.exports=connectDB;