import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema=new Schema({
    videofile:{
        type:URL,
        require:true,
    },
     thumbnail:{
        type:URL,
        require:true,
    },
     title:{
        type:String,
        require:true,
    },
     description:{
        type:String,
        require:true,
    },
     duration:{
        type:Number,
        require:true,
    },
    views:{
        type:Number,
        default:0,
    },
     owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    isPublished:{
        type:Boolean,
        default:0,
    },

},
{
    timestamps:true,
});

export const Video=mongoose.model("Video",videoSchema);