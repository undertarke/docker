import Video from "../models/video.js"

import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { responseData } from "../config/response.js";
import bcrypt from 'bcrypt';
import { checkToken, checkTokenRef, createToken, createTokenRef, decodeToken } from "../config/jwt.js";
import sendMail from "../config/sendMail.js";
// file system
import fs from 'fs'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// const model = initModels(sequelize)

const signUp = async (req, res) => {

    try {
        let { fullName, email, password } = req.body;

         let data = await model.video_type.findAll()
    // let data ="";
        if (checkEmail) // kiểm tra email trùng
        {
            // thông báo email tồn tại
            responseData(res, "Email đã tồn tại", 400, "");

            return;
        }

        // yarn add bcrypt
        let newData = {
            full_name: fullName,
            email: email,
            pass_word: bcrypt.hashSync(password, 10),
            role: "USER"
        }

    
        responseData(res, "Đăng ký thành công", 200, "");

    } catch (error) {

        responseData(res, "Lỗi hệ thống", 500, "");

    }

}

const login = async (req, res) => {

    // try {


    let { email, password } = req.body;

    let checkEmail = await model.users.findOne({
        where: {
            email: email
        }
    })

    if (checkEmail) // kiểm tra email trùng
    {
        // check pass
        // if (checkEmail.pass_word == password) {
        if (bcrypt.compareSync(password, checkEmail.pass_word)) {

            let key = new Date().getTime(); // minilisecond => 01/01/1970
           
            let token = createToken({ userId: checkEmail.dataValues.user_id, key, fullName: checkEmail.dataValues.full_name });

            // tạo refresh token
            let tokenRef = createTokenRef({ userId: checkEmail.dataValues.user_id, key });
            checkEmail.dataValues.refresh_token = tokenRef;

      

            responseData(res, "Login thành công", 200, token);
            return;
        }

        responseData(res, "Mật khẩu không đúng", 400, "");
        return;
    }

    responseData(res, "Email không đúng", 400, "");

    // } catch (error) {

    //     responseData(res, "Lỗi hệ thống", 500, "");

    // }
}
// yarn add jsonwebtoken
const loginFacebook = async (req, res) => {

    try {
        let { fullName, email, faceAppId } = req.body;

        let checkUser =""
        let token = "";
        if (checkUser) // kiểm tra email trùng
        {

            token = createToken({
                userId: checkUser.dataValues.user_id,
                fullName: checkUser.dataValues.full_name
            });

        } else {
            // yarn add bcrypt
            let newData = {
                full_name: fullName,
                email: email,
                face_app_id: faceAppId,
                pass_word: "",
                role: "USER"
            }

          // let data = await model.video_type.findAll()
    let data ="";
            token = createToken({
                userId: data.dataValues.user_id,
                fullName: checkUser.dataValues.full_name
            });
        }

        responseData(res, "Login thành công", 200, token);


    } catch (error) {

        responseData(res, "Lỗi hệ thống", 500, "");

    }

}

const resetToken = async (req, res) => {

    let { token } = req.headers;
    // check token 
    let errToken = checkToken(token);
    if (errToken != null && errToken.name != "TokenExpiredError") {
        responseData(res, "Không có quyền ", 401, "");
        return;
    }

    // get user => refesh_token
    let { userId } = decodeToken(token);
    let verifyToken = decodeToken(token);

    let getUser ="";
    // check refresh_token => Expired
    let errTokenRef = checkTokenRef(getUser.dataValues.refresh_token)
    if (errTokenRef != null) {
        responseData(res, "Không có quyền ", 401, "");
        return;
    }

    let { key } = decodeToken(getUser.dataValues.refresh_token);

    if (verifyToken.key != key) {
        responseData(res, "Không có quyền ", 401, "");
        return;
    }

    // create token
    let newToken = createToken({ userId: getUser.dataValues.user_id, key });
    responseData(res, "Login thành công", 200, newToken);

}


const randomCode = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const checkEmail = async (req, res) => {

    let { email } = req.body

    let checkEmail = ""

    if (!checkEmail) {
        responseData(res, "Email không tồn tại ", 404, email);
        return;
    }

    // tạo CODE random
    let code = randomCode(6);
    // thêm CODE table
    let newCode = {
        code,
        expired: new Date()
    }
   

    // gửi mail CODE
    sendMail(email, "Lấy lại mật khẩu", code)

    responseData(res, "", 200, "");


}
const checkCode = async (req, res) => {
    let { code } = req.body

    let checkCode = await model.code.findOne({
        where: {
            code
        }
    })
    if (!checkCode) {
        responseData(res, "Mã xác minh không đúng ", 404, code);
        return;
    }

    // check hạn sử dụng

    responseData(res, "", 200, "");


}
const changePass = async (req, res) => { }

// yarn add compress-images
// yarn add pngquant-bin@6.0.1
// yarn add gifsicle@5.2.1

import compress_images from 'compress-images'

const uploadAvatar = async (req, res) => {

    let file = req.file;

    //compress image

    compress_images(
        process.cwd() + "/public/img/" + file.filename,
        process.cwd() + "/public/video/",

        { compress_force: false, statistic: true, autoupdate: true }, false,
        { jpg: { engine: "mozjpeg", command: ["-quality", "20"] } },
        { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
        { svg: { engine: "svgo", command: "--multipass" } },
        { gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
        function (error, completed, statistic) {
            console.log("-------------");
            console.log(error);
            console.log(completed);
            console.log(statistic);
            console.log("-------------");
        }
    );











    // let { token } = req.headers;
    // let { userId } = decodeToken(token);

    // let getUser = await model.users.findByPk(userId);
    // getUser.avatar = file.filename;

    // await model.users.update(getUser.dataValues, {
    //     where: {
    //         user_id: userId
    //     }
    // })





    // tạo file => data.txt: hello world

    // fs.readFile(process.cwd() + "/public/img/" + file.filename, (err, data) => {

    //     let base64 = `data:${file.mimetype};base64,` + Buffer.from(data).toString("base64");


    //     responseData(res, "Uplodd thành công", 200, base64);
    // })


}

const getUser = async (req, res) => {
    let data = await prisma.users.findMany();

    responseData(res, "Get thành công", 200, data);
}

export {
    signUp,
    login,
    loginFacebook,
    resetToken,
    checkEmail,
    checkCode,
    changePass,
    uploadAvatar,
    getUser

}