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

  console.log("FILES 👉", req.files);

  const { title, description } = req.body;

  if (!title || !description) {
    throw new ApiError(400, "give all details");
  }

  const videoPath = req.files?.videoFile?.[0]?.path;
  const thumbnailPath = req.files?.thumbnail?.[0]?.path;

  // 🔒 SAFETY CHECKS (PEHLE)
  if (!videoPath) {
    throw new ApiError(400, "videoFile path not found");
  }

  if (!thumbnailPath) {
    throw new ApiError(400, "thumbnail path not found");
  }

  // ☁️ UPLOAD TO CLOUDINARY
const videoFile = await uploadOnCloudinary(videoPath);
console.log("CLOUDINARY VIDEO 👉", videoFile);
const thumbnail = await uploadOnCloudinary(thumbnailPath);

  if (!videoFile?.secure_url) {
    throw new ApiError(400, "video upload failed");
  }

  if (!thumbnail?.secure_url) {
    throw new ApiError(400, "thumbnail upload failed");
  }

  // 📦 SAVE TO DB
  const video = await Video.create({
    title,
    description,
    videoFile: videoFile.secure_url,
    thumbnail: thumbnail.secure_url,
    duration: Math.round(videoFile.duration || 0),
    owner: req.user?._id || null
  });

  if (!video) {
    throw new ApiError(500, "video save failed");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, video, "ho gya vdo upload sabas 🔥"));
});

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
    Video.findByIdAndUpdate(videoId,{
        $inc:{views:1}
    },
    {new:true},)
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
