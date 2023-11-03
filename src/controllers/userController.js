import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import bcrypt from 'bcrypt';
import { createToken, decodeToken } from "../config/jwt.js";


let model = initModels(sequelize);

// { "full_name":"", "email":"" , "pass_word":"" }
// quy định email không trùng => login
const userSignUp = async (req, res) => {
    let { full_name, email, pass_word } = req.body;

    // check email
    let checkEmail = await model.users.findOne({
        where: {
            email: email
        }
    })

    if (checkEmail) {
        res.send("Email đã tồn tại");
        return;
    }
    // yarn add bcrypt => salt
    let passCrypt = bcrypt.hashSync(pass_word, 10);

    let newData = {
        full_name,
        email,
        pass_word: passCrypt, // mã hóa pass word
        avatar: "",
        face_app_id: "",
        role: "user"
    }

    await model.users.create(newData); // INSERT INTO VALUES

    res.send("Đăng ký thành công");
}

const userLogin = async (req, res) => {

    let { email, pass_word } = req.body;

    let checkEmail = await model.users.findOne({
        where: {
            email: email
        }
    })

    if (checkEmail) {

        let checkPass = bcrypt.compareSync(pass_word, checkEmail.pass_word); // true, false
        if (checkPass) {
            // json web token
            // checkEmail => token
            let token = createToken({ checkEmail, pass_word: "" }); // mã hóa 2 chiều
            res.send(token);
        } else {
            res.send("Mật khẩu không đúng");

        }

    } else {
        res.send("Email không đúng");
    }

}

const userLoginFacebook = async (req, res) => {

    let { id, name, email } = req.body;

    let newData = {
        full_name: name,
        email,
        face_app_id: id
    }
    let checkUser = await model.users.findOne({
        where: {
            face_app_id: id
        }
    })

    if (!checkUser) {
        // không tồn tại
        await model.users.create(newData);
        checkUser = await model.users.findOne({
            where: {
                face_app_id: id
            }
        })

    }
    let token = createToken({ checkEmail: checkUser, pass_word: "" });

    res.send(token);

}

const updateInfo = async (req, res) => {
    let { full_name, email, pass_word } = req.body;
    let { token } = req.headers;

    let userInfo = decodeToken(token);
    let { user_id } = userInfo.data.checkEmail;


    let infoUser = await model.users.findOne({
        where: {
            user_id: user_id
        }
    })

    let passCrypt = bcrypt.hashSync(pass_word, 10);
    // spread operator
    infoUser = { ...infoUser, full_name, email, pass_word: passCrypt };

    // UPDATE users SET ... WHERE user_id =1
    await model.users.update(infoUser, {
        where: {
            user_id: user_id
        }
    })

    // DELETE FROM users WHERE user_id
    // await model.users.destroy({where:{user_id}})

    res.send("update info");
}

// file system
import fs from 'fs';
import compress_images from 'compress-images';

export const uploadAvatar = async (req, res) => {
    let file = req.file;
    let { full_name, email } = req.body;
    console.log(full_name, email)

    let { token } = req.headers;

    let userInfo = decodeToken(token);
    let { user_id } = userInfo.data.checkEmail;


    let infoUser = await model.users.findOne({
        where: {
            user_id: user_id
        }
    })
    infoUser = { ...infoUser, avatar: file.filename };

    // UPDATE users SET ... WHERE user_id =1
    await model.users.update(infoUser, {
        where: {
            user_id: user_id
        }
    })

    res.send(file.filename);
    
    // fs.readFile(process.cwd() + "/public/img/" + file.filename, (err, data) => {

    //     let imgBase = `data:${file.mimetype};base64,${Buffer.from(data).toString("base64")}`;
    //     res.send(imgBase);
    // })

    // compress_images(
    //     process.cwd() + "/public/img/" + file.filename,
    //     process.cwd() + "/public/file/",
    //     { compress_force: false, statistic: true, autoupdate: true }, false,
    //     { jpg: { engine: "mozjpeg", command: ["-quality", "1"] } },
    //     { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
    //     { svg: { engine: "svgo", command: "--multipass" } },
    //     { gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
    //     function (error, completed, statistic) {
    //         console.log("-------------");
    //         console.log(error);
    //         console.log(completed);
    //         console.log(statistic);
    //         console.log("-------------");
    //     }
    // );
    // res.send("")

    // tối ưu hình ảnh => giảm quality
    // 1 = 100Kb
    // 10000 = 1Gb
}

export {
    userLogin,
    userSignUp,
    userLoginFacebook,
    updateInfo
}