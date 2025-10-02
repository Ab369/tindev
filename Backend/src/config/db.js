const mongoose=require('mongoose');
require('dotenv').config();
const db_url=process.env.DB_URL
//connecting to DB
const connectDB=async()=>{
    await mongoose.connect(db_url);
}

module.exports=connectDB;