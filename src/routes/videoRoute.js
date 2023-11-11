
// quản lý API của đối tượng
// quản lý endpoint theo chức năng

import express from 'express';
import { getVideo, createVideo, getVideoType, getVideoTypeId, getVideoById, getComment, getVideoByName } from '../controllers/videoController.js';
import { checkApi, checkToken } from '../config/jwt.js';

const videoRoute = express.Router();

videoRoute.get("/get-video", getVideo)

// muốn chặn thằng này 
videoRoute.post("/create-video", checkApi, createVideo)

// api get video type
videoRoute.get("/get-video-type",getVideoType)
// api get video the type id
videoRoute.get("/get-video-typeid/:typeId", getVideoTypeId)

// api get video chi tiet
videoRoute.get("/get-video/:id", getVideoById)


//api get comment video
videoRoute.get("/get-comment/:videoId", getComment)

// api get video name
videoRoute.get("/get-video-by-name/:videoName",getVideoByName)

export default videoRoute;