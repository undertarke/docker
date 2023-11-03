import { Sequelize } from "sequelize";
import { decodeToken } from "../config/jwt.js";
import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";

let model = initModels(sequelize);
let Op = Sequelize.Op;

import { PrismaClient } from "@prisma/client";

let prisma = new PrismaClient();

export const getVideoByName = async (req, res) => {

    let { nameVideo } = req.params;

    // SELECT * FROM video
    // findAll()
    // findOne()

    // let data = await prisma.video.findMany({
    //     include: {
    //         video_comment: {
    //             include: {
    //                 users: true
    //             }
    //         }
    //     }
    // });


    let data = await prisma.video.findMany({
        where: {
            video_name: {
                contains: nameVideo
            }
        }
    });

    // let data2 = await prisma.video.findFirst();

    // await prisma.video.create({ data: { full_name, email, pass_word } });
    // await prisma.video.update({ data: { full_name, email, pass_word } }, { where });
    // await prisma.video.delete({ where });

    // SELECT * FROM video WHERE video_name LIKE '%a%'
    // let data = await model.video.findAll({
    //     where: {
    //         video_name: {
    //             [Op.like]: `%${nameVideo}%`
    //         }
    //     }
    // });

    res.send(data);
}

const getVideo = async (req, res) => {

    // SELECT * FROM video;
    let data = await model.video.findAll();

    res.send(data);
}

const createVideo = (req, res) => {
    res.send("create video")
}

const getVideoType = async (req, res) => {
    let data = await model.video_type.findAll();

    res.send(data);
}


const getVideoTypeId = async (req, res) => {
    let { typeId } = req.params;
    // SELECT * FROM video WHERE type_id = {typeId}
    let data = await model.video.findAll({
        where: {
            type_id: typeId
        }
    });

    res.send(data);
}
const getVideoId = async (req, res) => {
    let { videoId } = req.params;

    // => [{}]
    // => {}
    // let data = await model.video.findOne({
    //     where: {
    //         video_id: videoId
    //     }
    // });

    let data = await model.video.findByPk(videoId, {
        include: ["user"]
    });

    let dataComment = await model.video_comment.findAll({
        where: {
            video_id: videoId
        },
        include: ["user"]
    })

    res.send({
        data,
        dataComment
    });
}

const likeVideo = async (req, res) => {
    let { videoId } = req.body;
    let { token } = req.headers;

    let userInfo = decodeToken(token);
    let { user_id } = userInfo.data.checkEmail;


    let checkLike = await model.video_like.findAll({
        where: {
            user_id: user_id,
            video_id: videoId
        }
    })

    if (checkLike.length == 0) {
        let newData = {
            video_id: videoId,
            user_id: user_id,
            date_create: new Date(),
            dis_like: 0
        }
        await model.video_like.create(newData);

    } else {

    }

    res.send(true);
}

const commentVideo = async (req, res) => {
    let { videoId, content } = req.body;
    let { token } = req.headers;

    let userInfo = decodeToken(token);
    let { user_id } = userInfo.data.checkEmail;

    let newData = {
        video_id: videoId,
        user_id: user_id,
        content: content,
        date_create: new Date(),
        reply_list: "",
        timestamp: new Date()
    }
    await model.video_comment.create(newData);

    res.send(true);
}

export {
    getVideo, createVideo,
    getVideoType, getVideoTypeId, getVideoId,
    likeVideo, commentVideo
}