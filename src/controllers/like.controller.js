import mongoose, {isValidObjectId} from "mongoose"
import {Like} from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const toggleVideoLike = asyncHandler(async (req, res) => {
    const {videoId} = req.params
    //TODO: toggle like on video
})

const toggleCommentLike = asyncHandler(async (req, res) => {
    const {commentId} = req.params
    //TODO: toggle like on comment

})

const toggleTweetLike = asyncHandler(async (req, res) => {
    const {tweetId} = req.params
    //TODO: toggle like on tweet
    if(!mongoose.isValidObjectId(tweetId)){
        throw new ApiError(400,"wrong id")
    }
    const isliked=await Like.findOne(
        {
            tweet: new mongoose.Types.ObjectId(tweetId),
            likedBy: req.user._id
        }
    )
    if(isliked){
        await Like.deleteOne({_id:isliked._id})
        return res.status(200).json(new ApiError(200,"","remove like"))
    }
    await Like.create({
        tweet:tweetId,
        likedBy:req.user._id
    })
}
)

const getLikedVideos = asyncHandler(async (req, res) => {
    //TODO: get all liked videos
    

})

export {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos
}