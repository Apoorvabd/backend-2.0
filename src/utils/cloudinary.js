import dotenv from "dotenv";
dotenv.config();   // <-- ADD THIS

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});



export const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const result = await cloudinary.uploader.upload(
      localFilePath,
      { resource_type: "auto" }
    );

    fs.unlinkSync(localFilePath);
    return result;
  } catch (error) {
    console.log("Cloudinary Upload Error:", error);
    if (localFilePath) fs.unlinkSync(localFilePath);
    return null;
  }
};
