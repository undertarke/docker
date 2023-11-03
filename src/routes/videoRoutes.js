

// quản lý API
// quản lý chức năng của đối tượng

import express from "express";

const videoRoute = express.Router();

import {
    getVideo,
    createVideo, getVideoType,
    getVideoTypeId, getVideoId,
    likeVideo,
    commentVideo,
    getVideoByName
} from '../controllers/videoController.js';
import { checkToken, khoaApi } from "../config/jwt.js";

// ORM: sequelize, prisma
videoRoute.get("/get-video", getVideo);

videoRoute.post("/create-video", createVideo);

// API trả về danh sách video type
videoRoute.get("/get-video-type", getVideoType);

// API trả về danh sách video theo type_id
// localhost:8080/api/video/get-video-typeid/{params.id}
videoRoute.get("/get-video-typeid/:typeId", getVideoTypeId);

// localhost:8080/api/video/get-video-id/{videoId}
videoRoute.get("/get-video-id/:videoId", getVideoId);


// API chức năng like
videoRoute.post("/like", likeVideo);

// API chức năng comment
videoRoute.post("/comment", commentVideo);

// API tìm kiếm theo tên sản phẩm
videoRoute.get("/get-video-by-name/:nameVideo", getVideoByName)
export default videoRoute