// import Video from '../models/video.js'
import initModels from '../models/init-models.js';
import sequelize from '../models/connect.js';
import { Op } from 'sequelize';
import { responseApi } from '../config/response.js';
import { dataToken } from '../config/jwt.js';

const model = initModels(sequelize);

// localhost:8080/video/get-video
let getVideo = async (req, res) => {

    // SELECT * FROM Video WHERE video_name LIKE '%a%'
    // JOIN
    let data = await model.video.findAll({
        include: ["type", "user"]
    });

    // res.send(data)
    responseApi(res, 200, data, "Thành công")

}

let createVideo = (req, res) => {
    res.send("create video")
}

let getVideoType = async (req, res) => {
    let data = await model.video_type.findAll();
    responseApi(res, 200, data, "Thành công")
}

let getVideoWithType = async (req, res) => {
    let { typeId } = req.params;

    let data = await model.video.findAll({
        where: {
            type_id: typeId
        }
    })
    responseApi(res, 200, data, "Thành công")
}

let getVidePage = async (req, res) => {
    let { page } = req.params
    let pageSize = 3

    let countVideo = await model.video.count()
    let totalPage = Math.ceil(countVideo / 3)

    let index = (page - 1) * pageSize;
    // SELECT * FROM video LIMIT page, pageSize
    let data = await model.video.findAll({
        offset: index,
        limit: pageSize
    })
    responseApi(res, 200, { content: data, totalPage }, "Thành công")
}

let getVideoDetail = async (req, res) => {
    let { videoId } = req.params;

    // {}
    let data = await model.video.findOne({
        where: {
            video_id: videoId
        },
        include: ["user"]
    })
    // let data = await model.video.findByPk(videoId)

    responseApi(res, 200, data, "Thành công")
}

let getCommentVideo = async (req, res) => {

    let { videoId } = req.params;

    let data = await model.video_comment.findAll({
        where: {
            video_id: videoId
        },
        order:[
            ['date_create','DESC']
        ],
        include:["user"]
    })

    responseApi(res, 200, data, "Thành công")
}

let commentVideo = async (req, res) => {
    let { videoId, content } = req.body
    let { token } = req.headers

    let decode = dataToken(token);
    let { userId } = decode;

    let newComment = {
        video_id: videoId,
        user_id: userId,
        content: content,
        date_create: new Date()
    }

    await model.video_comment.create(newComment);


    responseApi(res, 200, "", "Thành công")

}

export {
    getVideo,
    createVideo,
    getVideoType,
    getVideoWithType,
    getVidePage,
    getVideoDetail,
    getCommentVideo,
    commentVideo
}