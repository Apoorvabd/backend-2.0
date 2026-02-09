import dotenv from "dotenv";
dotenv.config();   // loads .env file
import {app} from "./app.js";

import connectDB from "./db/index.js";

// connect to database
connectDB()
.then(()=>{
    app.on("error",(error)=>{
        console.log(error);
        throw error;
    });
    app.listen(process.env.PORT || 8000 ,()=>{
        console.log(`server is running on ${process.env.PORT}`);
    });

})
.catch((err)=>{
    console.log(`your process in failed`,err);
})

console.log("API_KEY:", process.env.API_KEY);



// const app=express();

// (async ()=>{
//     try{
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
//         app.on("error",(error)=>{
//             console.log("ERROR:",error);
//         throw error;
//         })
//         app.listen(process.env.PORT,()=>{
//             console.log("error on listining");
            
//         })
//     }catch(error){
//         console.log("ERROR:",error);
//         throw err;
//     }

// })
// ();