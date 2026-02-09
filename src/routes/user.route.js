import express from "express";
import { upload } from "../middlewares/upload.middleware.js";
import { registerUser, loginUser, logoutUser,generateRefreshToken,changePass, getuser } from "../controllers/user.controler.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getMe } from "../controllers/user.controler.js";




const router = express.Router();
router.get("/me", verifyJWT, getMe);

router.post(
  "/register",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 }
  ]),
  registerUser  
);

router.post("/login", loginUser);
router.post("/logout", verifyJWT, logoutUser);
router.post("/refreshtoken",generateRefreshToken)
router.post("/changepass",changePass)
router.post("/getuser",getuser)

export default router;
