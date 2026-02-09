import asyncHandler from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/user.model.js";
import ApiResponse from "../utils/apiresponce.js"
import cookieParser from "cookie-parser";
import apiError from "../utils/apierror.js";
import jwt from "jsonwebtoken";


const gen_access_refres_tokens=async (userId)=>{
  try{
    const user=await User.findById(userId)
    const accessToken=user.generateAccessToken()
    const refreshToken=user.generateRefreshToken()
    user.refreshToken=refreshToken;
    await user.save({validateBeforeSave:false})

    return {accessToken,refreshToken}
  }
  catch (err){
    throw new apiError(500,"not generatng access token ",err)
  }
}

export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, fullname } = req.body;

  // Validate request
  if (!username || !email || !password || !fullname) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (!req.files) {
    return res.status(400).json({ message: "Files are required" });
  }
  console.log(req.files);
  

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }
  

  // Upload files to Cloudinary
  const uploadedUrls = {};

  for (const fieldName in req.files) {
    const fileArray = req.files[fieldName];

    uploadedUrls[fieldName] = await Promise.all(
      fileArray.map(async (file) => {
        const result = await uploadOnCloudinary(file.path);
        return result.secure_url;
      })
    );
  }

  // Save user in DB
  const newUser = await User.create({
    username,
    email,
    password,
    fullname,
    avatar: uploadedUrls.avatar ? uploadedUrls.avatar[0] : null,
    coverImage: uploadedUrls.coverImage ? uploadedUrls.coverImage[0] : null,
  });

  // Generate tokens
  const accessToken = newUser.generateAccessToken();
  const refreshToken = newUser.generateRefreshToken();

  // Save refresh token in DB
  newUser.refreshToken = refreshToken;
  await newUser.save();

  // Response
  res.status(201).json({
    message: "User registered successfully",
    user: newUser,
    accessToken,
    refreshToken,
  });
});
export const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  if (!username && !email) {
    throw new apiError(400, "enter required part");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }]
  });

  if (!user) {
    throw new apiError(404, "no match in db");
  }

  const checkpassword = await user.isPasswordCorrect(password);
  if (!checkpassword) {
    throw new apiError(400, "password wrong");
  }

  const { accessToken, refreshToken } = await gen_access_refres_tokens(user._id);

  const loggedUser = await User.findById(user._id)
    .select("-password -refreshToken");

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedUser, accessToken, refreshToken },
        "login ho gya"
      )
    );
});

export const logoutUser= asyncHandler(async(req,res)=>{
  User.findOneAndUpdate(
    req.user._id,{
      $set:{
        refreshToken:undefined
      }
    },
    {
      new:true
    }
  )
  const options={
    httpOnly:true,
    secure:true
  }
  return res.status(200)
  .clearCookie("accessToken",options)
  .clearCookie("refreshToken",options)
  .json(new ApiResponse(200,{},"user loggedout"))
})


// fromtermendhh

export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password -refreshToken");

  if (!user) {
    throw new apiError(404, "User not found");
  }

  res.status(200).json({
    success: true,
    user,
  });
});


// const verify refeshtoken=asyncHandler()
export const generateRefreshToken=asyncHandler(async(req,res)=>{
  const incomingRefrshToken=req.cookies.refreshToken || req.body.refreshToken;
if(!incomingRefrshToken){
  throw new apiError(400,"not authorized")

}
const decodedToken=jwt.verify(incomingRefrshToken,process.env.REFRESH_TOKEN_SECRET)

    const user=await User.findById(decodedToken?._id);
    if(!user){
      throw new  apiError(401,"invalid refresh token")
    }


if(incomingRefrshToken !== user?.refreshToken){
  throw new apiError(401,"session expired or not authorized")
}

const options={
  httpOnly:true,
  secure:true
}
const {accessToken,nrefreshToken}=await gen_access_refres_tokens()
return res.status(200).cookie("accessToken",accessToken,options)
.cookie("refreshToken",nrefreshToken,options)
.json(
  new ApiResponse(200, {
    accessToken, nrefreshToken
  }, "access btoken refreshed")
)
})

export const changePass = asyncHandler(async (req, res) => {

  const { oldPass, newPass } = req.body;

  const user = await User.findById(req.user._id);

  const isPasswordCorrect = await user.isPasswordCorrect(oldPass);

  if (!isPasswordCorrect) {
    throw new apiError(400, "Invalid old password");
  }

  user.password = newPass;

  await user.save();

  return res.status(200).json(
    new ApiResponse(200, {}, "Password updated successfully")
  );

});


export const getuser = asyncHandler(async (req, res) => {
  return res.status(200).json(
    new ApiResponse(
      200,
      req.user,
      "Current user fetched successfully"
    )
  );
});

export const updateAccountDetails=asyncHandler(async (req,res)=>{
  const { fullname,email }=req.body;

  if(!fullname,!email){
    throw new apiError(400,"all fields are required")
  }

  const user =User .findByIdAndUpdate(
    req.user?._id,
    {$set:{fullname,email:email,

    }}, 
    {new:true}
  ).select("-password")

  return res
  .status(200)
  .json(new ApiResponse(200,user,"Account details updated successfully"))
}) 
export const updateUserAvatar=asyncHandler(async (req,res,next)=>{
   const avatarlocalpath=req.file?.path

   if(!avatarlocalpath){
    throw new apiError(400,"avatar file does not find able");
    }

    const avatar=await uploadOnCloudinary(avatarlocalpath)
    if(!avatar.url){
          throw new apiError(400,"avatar file upload failed able");
    }

    await User.findById(req.user?._id,{
      $set :{
        avatar:avatar.url
      }
    },
    {
      new:true
    }).select("password")

     return res.status(200).json(new ApiResponse(200,"avatar updated successfully"))
})
export const updatecoverimage=asyncHandler(async (req,res,next)=>{
  const coverimgpath=req.file?.path

  if(!coverimgpath){
    throw new apiError(400,"cover file is missing")
  }
  const cover =await uploadOnCloudinary(coverimgpath)

  if(!cover.url){
    throw new apiError(400,"error while uploading")
  }
    await User.findByIdAndUpdate(req.user?._id,
    {
      $set: {
        coverImage: cover.url
      }
    },
    {
      new: true
    }
  ).select("-password")

  return res.status(200).json(new ApiResponse(200,"cover updated successfully"))

})

export const getUserChannel =asyncHandler(async (req,res,next)=>{
  const {username }=req.params
  if(!username?.trim()){
    throw new apiError(400,"username is missing")
  }
  const cahnnel=await User.aggregate([
    {$match:{
      username:username?.toLowerCase()
    }}
    ,{
      $lookup:{
        from:"subscription",
        localField:"_id",
        foreignField:"channel",
        as:"subscribers"
      }
    },
    {$lookup:{
      from: "subscriptions",
      localField: "_id",
      foreignField: "subscriber",
      as: "subscribedTo"
    }},
    {
      $addFields:{
        subscibersCount:{
          $size:"$subscibers"
        },
        channelSubscribedCount:{
          $size:"$subscribedTo"
        },
        isSubscribed:{
          $cond:{
            if:{$in:[req.user?._id,"$subscribers.subscriber"]},
            then:true,
            else:false
          }
        }
      }
    }
    ,{
      $project:{
        fullname:1,
        username:1,
        subscibersCount:1,
        channelSubscribedCount:1,
        isSubscribed,
        avatar:1,
        email:1,
        coverImage:1,
        subscribedTo:1,

      }
    }
  ])


})