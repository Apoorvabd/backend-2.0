import mongoose,{Schema} from 'mongoose'
const subscriptionSchema =new Schema({
    susbcriber:{
        type:Schema.Type.ObjectId,//who is subscribing
        ref:"user"
    },
    channel:{
         type:Schema.Type.ObjectId,//who is sub scribing
        ref:"user"
    }
},{timestamps:true})

export const Subscription=mongoose.model("Subscription",subscriptionSchema)