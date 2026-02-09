
import express from 'express';
const app=express();
import cors from 'cors';
import cookieParser from 'cookie-parser';
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true,
}));
//cors ia a middleware that allow cross origin requests to be accessed from deferent domins 
//isme config bhi kr skte hai jaise origin set krna ki konsa domain access kr skta hai
app.use(express.urlencoded({ extended: true }));

app.use(express.json({limit:"16kb"}));//ye middleware json data ko parse krta hai jo request me aata hai
app.use(cookieParser());//ye middleware cookies ko parse krta hai jo request me aata hai
import userRouter from './routes/user.route.js'
app.use('/api/v1/user',userRouter)

export{app}

