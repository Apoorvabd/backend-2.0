import mongoose, { isValidObjectId } from "mongoose"
import {Tweet} from "../models/tweet.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const createTweet = asyncHandler(async (req, res) => {
    //TODO: create tweet
    const {content}=req.body
    if(!content){
        throw new ApiError(400,"fil all details")
    }
    const newtweet=await Tweet.create({
        content:content,
        owner:req.user?._id
    })
    res.status(200).json(new ApiResponse(200,newtweet,"new tweet published"))
    

})

const getUserTweets = asyncHandler(async (req, res) => {
    // TODO: get user tweets
    const alltweet=await Tweet.find({
        owner:req.user._id
    }) 
    res.status(200).json(alltweet);
})

const updateTweet = asyncHandler(async (req, res) => {
    //TODO: update tweet
    const tweetid=req.params.tweetId

    if(isValidObjectId(tweetid)){
    const tweet=await Tweet.findById(tweetid)
    if (!tweet) {
    throw new ApiError(404, "Tweet not found"); // <-- prevents null error
   }

    if(tweet.owner.toString() !== req.user._id.toString()) {
   throw new Error("Not authorized")
}

    const {updatetweet}=req.body

    if(!updatetweet || updatetweet==""){
        throw ApiError(400,"update context is required")
    }
    const updatedtweet=await Tweet.findByIdAndUpdate(tweetid,{content:updatetweet},{new:true})
    res.status(200).json(200,updatedtweet,"kam ho gya updation ka")
    }
    else{
        res.status(404).json(404,"invalid tweet id found")
    }

})

const deleteTweet = asyncHandler(async (req, res) => {
    //TODO: delete tweet
    console.log("req.user:", req.user);


    const tweetid=req.params.tweetId
    const tweet=await Tweet.findById(tweetid)
    if(!tweet){
        throw new ApiError(404,"tweet not found")
    }

    if(tweet.owner.toString() !== req.user._id.toString()) {
   throw new Error("Not authorized")
}


    const deltweet=await Tweet.findByIdAndDelete(tweetid)
    res.status(200).json(200,deltweet,"deleted successfully")
})

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}
