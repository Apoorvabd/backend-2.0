import { Router } from 'express';
import {
    deleteVideo,
    getAllVideos,
    getVideoById,
    publishAVideo,
    togglePublishStatus,
    updateVideo,
} from "../controllers/video.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"
import {upload} from "../middlewares/multer.middleware.js"

const router = Router();
//router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file
console.log("🔥 VIDEO ROUTER LOADED");

router.post("/test", (req, res) => {
  res.send("🔥 VIDEO ROUTE WORKING");
});

router.route("/").get(getAllVideos).post(
        upload.fields([
            {
                name: "videoFile",
                maxCount: 1,
            },
            {
                name: "thumbnail",
                maxCount: 1,
            },
            
        ]),
        publishAVideo
    );

router.route("/:videoId").get(getVideoById).delete(deleteVideo)
.patch(upload.single("thumbnail"), updateVideo);

router.route("/toggle/publish/:videoId").patch(togglePublishStatus);

export default router