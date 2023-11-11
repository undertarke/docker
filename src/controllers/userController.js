import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import bcrypt from 'bcrypt';
import { createToken, decodeToken } from "../config/jwt.js";
import { toiUuHinh } from "./uploadController.js";

// sequelize.query("SELECT * FROM users")

let model = initModels(sequelize);

// yarn add bcrypt

const userSignUp = async (req, res) => {

    let { full_name, email, pass_word } = req.body;

    let checkEmail = await model.users.findAll({
        where: {
            email: email
        }
    })

    if (checkEmail.length > 0) {
        res.send("Email đã tồn tại !");
        return;
    }
    let newPass = bcrypt.hashSync(pass_word, 10);

    let newData = {
        full_name,
        email,
        pass_word: newPass,
        avatar: "",
        face_app_id: "",
        role: "user"
    };
    // INSERT INTO VALUE
    await model.users.create(newData);

    res.send("Đăng ký thành công");

}
// localhost:8080/'SELECT * FROM users'

const userLogin = async (req, res) => {
    let { email, pass_word } = req.body;

    let checkEmail = await model.users.findOne({
        where: {
            email: email
        }
    })

    if (checkEmail) {
        // check pass word
        let checkPass = bcrypt.compareSync(pass_word, checkEmail.pass_word);

        if (checkPass) {
            let token = createToken({ checkEmail });
            res.send(token);
        } else {
            res.send("Mật khẩu không đúng !");

        }
    } else {
        res.send("Email không đúng !");
    }
}

export const userLoginFacebook = async (req, res) => {
    let { facebook_app_id } = req.body;
    let checkEmail = await model.users.findOne({
        where: {
            face_app_id: facebook_app_id
        }
    })
    // chưa tồn tại => create user => token 
    if (!checkEmail) {
        let newUser = {
            full_name: "",
            email: "",
            pass_word: "",
            avatar: "",
            face_app_id: facebook_app_id,
            role: "user"
        }
        await model.users.create(newUser);
        checkEmail = await model.users.findOne({
            where: {
                face_app_id: facebook_app_id
            }
        })
    }
    let token = createToken({ checkEmail });
    res.send(token);
}

export const updateInfo = async (req, res) => {
    let { full_name, email, pass_word } = req.body;

    let { token } = req.headers;
    let infoUser = decodeToken(token);

    let { user_id } = infoUser.data.checkEmail;

    let getUser = await model.users.findByPk(user_id);

    // spread opertor
    let updateUser = { ...getUser, full_name, email, pass_word }

    // model.users.build();

    // UPDATE users SET ful_name =..... WHERE user_id
    await model.users.update(updateUser, {
        where: {
            user_id
        }
    });
    // DELETE FROM users WHERE
    // model.users.destroy({where})
    res.send("Cập nhật thành công");

}
// file system
import fs from 'fs';


export const uploadAvatar = async (req, res) => {
    let file = req.file;
    // let { token } = req.headers;
    // let infoUser = decodeToken(token);

    // let { user_id } = infoUser.data.checkEmail;
    // let getUser = await model.users.findByPk(user_id);
    // let updateUser = { ...getUser, avatar: file.filename }
    // await model.users.update(updateUser, {
    //     where: {
    //         user_id
    //     }
    // });

    // let data = fs.readFileSync(process.cwd() + "/public/img/" + file.filename);

    // let base64 = `data:${file.mimetype};base64,` + Buffer.from(data).toString("base64");

    // //xóa hình
    
    // return base64

    let imgBase = await toiUuHinh(file);

    res.send(file)
}

export {
    userSignUp,
    userLogin
}