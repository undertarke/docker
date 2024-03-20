
// quản lý API
import express from 'express'
import { commentVideo, createVideo, getCommentVideo, getVidePage, getVideo, getVideoDetail, getVideoType, getVideoWithType } from '../controllers/videoController.js';
import { midVerifyToken } from '../config/jwt.js';

const videoRoute = express.Router();

// middleware
// quyền lấy video
videoRoute.get("/get-video", getVideo)

videoRoute.post("/create-video", createVideo)

// API get video type
videoRoute.get("/get-video-type", getVideoType)

// API get video with type
videoRoute.get("/get-video-with-type/:typeId", getVideoWithType)

// API get video page
videoRoute.get("/get-video-page/:page",midVerifyToken, getVidePage)

// API get video detail
videoRoute.get("/get-video-detail/:videoId", getVideoDetail)

// API get danh sach comment theo videoId
videoRoute.get("/get-comment-video/:videoId",getCommentVideo)

// API post comment theo videoId và userId
videoRoute.post("/comment-video",commentVideo)

export default videoRoute;