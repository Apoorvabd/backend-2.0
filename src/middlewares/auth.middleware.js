import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import apiError from "../utils/apierror.js";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {

    //Jab frontend backend ko token bhejta hai, to wo aise bhejta hai:Authorization: Bearer <TOKEN>

    const token =req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    //y a to accesskey cookies ke formme browser ke pas hogi ya to header me ayegii to dono ko chek krna hota hai

    if (!token) {
      throw new apiError(401, "Not authorized");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    //agr successhua to jo payload pda hoga vo return kr dega ye verify function

    const user = await User.findById(decodedToken?.id || decodedToken?._id)
      .select("-password -refreshToken");

    if (!user) {
      throw new apiError(400, "User not found");
    }

    req.user = user;
    next();
  } catch (err) {
    throw new apiError(401, err.message || err);
  }
});
