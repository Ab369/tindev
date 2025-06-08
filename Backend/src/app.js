const express=require('express');
const app=express();
const connectDB=require('./config/db');
const user=require('./models/user');
const cookieParser=require('cookie-parser');
const auth=require('./middlewares/auth')

app.use(express.json());//for getting json response
app.use(cookieParser());//for parsing/reading cookies

//importing routes
const authRoute=require('./routes/authentication');
const profileRouter=require('./routes/profile');
const requestRouter=require('./routes/requests')
const userRouter=require('./routes/userRoutes');

//routes
app.use('/',authRoute);
app.use('/',profileRouter);
app.use('/',requestRouter)
app.use('/',userRouter);

connectDB().then(()=>{
    console.log('DB connected');
    app.listen('3000',()=>{console.log('listening at port 3000')});
}).catch((err)=>console.log('error connecting db->'+err));
