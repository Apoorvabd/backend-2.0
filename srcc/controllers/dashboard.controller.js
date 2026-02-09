import mongoose, { isValidObjectId } from "mongoose"
import {Video} from "../models/video.model.js"
import {Subscription} from "../models/subscription.model.js"
import {Like} from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import { getUserChannelSubscribers } from "./subscription.controller.js"

const getChannelStats = asyncHandler(async (req, res) => {
    // TODO: Get the channel stats like total video views, total subscribers, total videos, total likes etc.
    const allSubscribers=getUserChannelSubscribers();
    


})

const getChannelVideos = asyncHandler(async (req, res) => {
    // TODO: Get all the videos uploaded by the channel
    const uId=req.user._id;
    if(!isValidObjectId(uId)){
        throw new ApiError(400,"wrong id")
    }
    const list=await Video.aggregate([
        {
            $match:{owner:uId}
        },
        {
            $project:{
                title:1,
                description:1,
                videoFile:1,
                duration:1,
                thumbnail:1
            }
        }
    ])
    res.status(200).json(new ApiResponse(200,list,"here is list of all videos posted by you"))
})

export {
    getChannelStats, 
    getChannelVideos
    }