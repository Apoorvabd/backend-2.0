//sara kuch ho gya hai isme bs selecting reh gai hai || vo bhi abhi kr dunga ahi koi oor controler likhne jaa rha hunn


import mongoose, {isValidObjectId} from "mongoose"

import {Video} from "../models/video.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"


const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query

    //TODO: get all videos based on query, sort, pagination
    
    
})

const publishAVideo = asyncHandler(async (req, res) => {
    
    const { title, description} = req.body
    // TODO: get video, upload to cloudinary, create video
    if(!title || !description){
        throw new ApiError(400,"give all details");
    }
    const vdopath=req.files?.videoFile[0]?.path;
    const thumbnailpath=req.files?.thumbnail[0]?.path

    const videoFile=await uploadOnCloudinary(vdopath);
    const thumbnail=await uploadOnCloudinary(thumbnailpath);

    if(!videoFile){
        throw new ApiError(400,"videoFile path not found")
    }

    if(!thumbnail){
        throw new ApiError(400,"thumbnail path not found")
    }
    const video=await Video.create({
        title,
        description,
        videoFile:videoFile.secure_url,
        thumbnail:thumbnail.secure_url || "",
        duration:Math.round(videoFile.duration),
        owner:req.user?._id
    })
    const createdUser=await Video.findById(video._id)
    if(!createdUser){
        throw new ApiError(400,"nhi yar hua nhi vdo upload")
    }
    res.status(200)
    .json(new ApiResponse(200,createdUser,"ho gya vdo upload sabas "))

})

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: get video by id
    if(!videoId){
        throw new ApiError(400 ,"unable to get vdo id")
    }
    const video=await Video.findById(videoId)

    if(!video){
        throw new ApiError(400,"video not found ")
    }
    res.status(200).
    json(new ApiResponse(200,video,"video find "))
})

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: update video details like title, description, thumbnail
    const video=await Video.findById(videoId)
    if(!video){
        throw new ApiError(400,"bad request")
    }

    if(video.owner.toString() !== req.user._id.toString()){
   throw new ApiError(403,"Not authorized")
}

    if(!isValidObjectId(videoId)){
        throw new ApiError(400,"not found video id")
    }
    if(!video){
        throw new ApiError(400,"video not found")
    }
    const {title , description}=req.body;
    if(title){
        video.title=title
    }
     if(description){
        video.description=description;
     } 
    const thumbnail=req.file?.path;

     const thumbnailupdated =await uploadOnCloudinary(thumbnail)
    if(!thumbnailupdated){
        throw new ApiError(400,"not able to upload thumbnail")
    }
    video.thumbnail=thumbnailupdated.secure_url;
    await video.save();
    res.status(200)
    .json(new ApiResponse(200,video,"video updated"))
})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: delete video
    if(!videoId){
        throw new ApiError(400,"not found video id")
    }
    const video=await Video.findById(videoId)

    if(!video){
        throw new ApiError(400,"video not found")
    }
    if(video.owner.toString() !== req.user._id.toString()){
   throw new ApiError(403,"Not authorized")
}

    await Video.findByIdAndDelete(videoId)
    res.status(200)
    .json(new ApiResponse(200,null,"video delete successfully"))

})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    if(!videoId){
        throw new ApiError(400,"not found video id")
    }
    const video=await Video.findById(videoId)

    if(!video){
        throw new ApiError(400,"video not found")
    }
    video.isPublished=!video.isPublished
    await video.save()
    res.status(200)
    .json(new ApiResponse(200,video,"video publish status toggled successfully"))
})

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}
