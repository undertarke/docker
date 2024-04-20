import Video from "../models/video.js"

import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { responseData } from "../config/response.js";
import { decodeToken } from "../config/jwt.js";

const model = initModels(sequelize)

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// Event Loop
// localhost:8080/video/get-video
const getVideo = async (req, res) => {

    // SELECT * FROM video WHERE video_id = 2

    // SELECT * FROM video WHERE video LIKE '%a%'

    // [{} , {} , {} , {}]
    // {}
    let dataPrisma = await model.video.findAll({
        include: ["video_type", "user"]
    });

    // let dataPrisma = await prisma.video.findMany({
    //     include: {
    //         video_comment: {
    //             include: {
    //                 users: true
    //             }
    //         }
    //     }
    // })

    // prisma.video.create({ data: newData })
    // prisma.video.update({ data: newDat , where })

    // let data = await Video.findByPk(2);

    responseData(res, "Thành công", 200, dataPrisma)

}

const getVideoType = async (req, res) => {

    // let data = await model.video_type.findAll()
    let data ="";
    responseData(res, "Thành công", 200, data)


}

const getVideoByType = async (req, res) => {
    let { typeId } = req.params;

       // let data = await model.video_type.findAll()
       let data ="";
    responseData(res, "Thành công", 200, data)


}

const searchVideo = (req, res) => {

    res.send("hello world MVC !")

}

const getVideoPage = async (req, res) => {

    let { page } = req.params;
    let pageSize = 3
    let index = (page - 1) * pageSize;

    // SELECT * FROM video LIMIT index , pageSize
    // let data = await model.video_type.findAll()
    let data ="";
    let dataCount = 2

    responseData(res, "Thành công", 200, { data, pagination: Math.ceil(dataCount / pageSize) })

}


const getVideoById = async (req, res) => {

    let { videoId } = req.params;

    // let data = await model.video_type.findAll()
    let data ="";

    responseData(res, "Thành công", 200, data)

}

const getComment = async (req, res) => {

    let { videoId } = req.params;
    // let data = await model.video_type.findAll()
    let data ="";


    responseData(res, "Thành công", 200, data)

}
const postComment = async (req, res) => {

    let { videoId, content } = req.body;
    let { token } = req.headers;

    let { userId } = decodeToken(token);

    let newComment = {
        video_id: videoId,
        user_id: userId,
        content,
        date_create: new Date()
    }

    // await model.video_comment.create(newComment);

    responseData(res, "Thành công", 200, "")

}

export {
    getVideo,
    searchVideo,
    getVideoType,
    getVideoByType,
    getVideoPage,
    getVideoById,
    getComment,
    postComment,

}