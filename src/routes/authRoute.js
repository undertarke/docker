// authentication: xác minh (login)
// authorization: ủy quyền (signup)

import express from 'express'
import { checkCode, checkEmail, login, loginFacebook, resetToken, signUp } from '../controllers/authController.js';

const authRoute = express.Router();

//login
authRoute.post("/login", login)

//signup
authRoute.post("/signup", signUp)

// login facebook
authRoute.post("/login-facebook", loginFacebook)

// check email
authRoute.post("/check-email/:email", checkEmail)

// check code
authRoute.post("/check-code/:code", checkCode)

// đổi mật khẩu
// email, mật khẩu mới từ client


// refresh token
authRoute.post("/reset-token", resetToken)

// __dirname // trả đường dẫn file đang đứng
// process.cwd() // trả đường dẫn gốc

// yarn add multer
import multer from 'multer';

// đường dẫn lưu và tên  (ko trùng)
let storage = multer.diskStorage({
    destination: process.cwd() + "/public/img",
    filename: (req, file, callback) => {
        let newName = new Date().getTime() + "_" + file.originalname
        callback(null, newName) // 1704214124124_thor.jpeg
    }
})

let upload = multer({
    storage
});

import fs from 'fs' // file system
import compress_images from 'compress-images'

authRoute.post("/upload-avatar", upload.single("avatar"), async (req, res) => {
    let { file } = req;
    // gifsicle@5.2.1   
    // pngquant-bin@6.0.1
    await compress_images(
        process.cwd() + "/public/img/" + file.filename,
        process.cwd() + "/public/file/",

        { compress_force: false, statistic: true, autoupdate: true }, false,
        { jpg: { engine: "mozjpeg", command: ["-quality", "1"] } },
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



    // luu vao table 


    // tao file, tham so 1: destination (gom ten file), noi dung cua file
    //fs.writeFile(process.cwd() + "/test.txt", "hello world", (error) => { })

    // fs.readFile(process.cwd() + "/public/img/" + file.filename, (err, data) => {
    //     //data:image/jpg;base64,
    //     let nameImg = `data:${file.mimetype};base64` + Buffer.from(data).toString("base64")
    //     // xoa file 
    //     res.send(nameImg)
    // })



})



export default authRoute;