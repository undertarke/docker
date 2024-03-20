import initModels from '../models/init-models.js';
import sequelize from '../models/connect.js';
import { Op } from 'sequelize';
import { responseApi } from '../config/response.js';
import bcrypt from 'bcrypt'
import { checkTokenRef, createToken, createTokenRef, dataToken } from '../config/jwt.js';
import nodemailer from 'nodemailer'

const model = initModels(sequelize);


const login = async (req, res) => {
    // find data email, password

    let { email, password } = req.body
    // SELECT * FROM user WHERE email = email AND pass_word = password
    let checkEmail = await model.users.findOne({
        where: {
            email: email
        }
    })

    if (checkEmail) {
        // check password
        if (bcrypt.compareSync(password, checkEmail.pass_word)) {
            let key = new Date().getTime()
            // chuỗi mã hóa chứa thông tin user
            let token = createToken({ userId: checkEmail.dataValues.user_id, key });

            // khởi tạo refresh token
            let tokenRef = createTokenRef({ userId: checkEmail.dataValues.user_id, key });

            checkEmail.dataValues.refresh_token = tokenRef

            await model.users.update(checkEmail.dataValues, {
                where: {
                    user_id: checkEmail.dataValues.user_id
                }
            })

            responseApi(res, 200, token, "login thành công !")
        } else {
            responseApi(res, 400, "", "Mật khẩu không đúng !")

        }

    } else {
        responseApi(res, 400, "", "Email không đúng !")

    }

}

// yarn add bcrypt
const signUp = async (req, res) => {
    try {
        // create data
        let { fullName, email, password } = req.body

        let newUser = {
            full_name: fullName,
            email: email,
            pass_word: bcrypt.hashSync(password, 10),
            avatar: "",
            face_app_id: "",
            role: "USER"
        }
        let checkEmail = await model.users.findOne({
            where: {
                email: email
            }
        })
        // email không trùng
        if (checkEmail) {
            responseApi(res, 400, "", "Email đã tồn tại !")
            return;
        }

        await model.users.create(newUser);

        responseApi(res, 200, "", "Đăng ký thành công")
    } catch {
        responseApi(res, 500, "", "Lỗi ..")
    }

}

const loginFacebook = async (req, res) => {
    try {
        let { faceAppId, name, email } = req.body
        let checkUser = await model.users.findOne({
            where: {
                face_app_id: faceAppId
            }
        })
        let token = ""
        if (checkUser) {

            // đã login facebook trước đó
            token = createToken({ userId: checkUser.dataValues.user_id });

        } else {
            let newUser = {
                full_name: name,
                email: email,
                pass_word: "",
                avatar: "",
                face_app_id: faceAppId,
                role: "USER"
            }

            let checkEmail = await model.users.findOne({
                where: {
                    email: email
                }
            })
            // email không trùng
            if (checkEmail) {
                responseApi(res, 400, "", "Email đã tồn tại !")
                return;
            }

            let data = await model.users.create(newUser);

            token = createToken({ userId: data.dataValues.user_id })

        }

        responseApi(res, 200, token, "login thành công !")

    } catch {
        responseApi(res, 500, "", "Lỗi ...")

    }
}

const checkEmail = async (req, res) => {
    // find data email, password

    let { email } = req.params
    // SELECT * FROM user WHERE email = email AND pass_word = password
    let checkEmail = await model.users.findOne({
        where: {
            email: email
        }
    })


    if (checkEmail) {

        // tạo code
        let code = new Date().getTime();// trả về milisecond từ 01/01/1970

        let newCode = {
            code,
            expired: new Date()
        }
        await model.code.create(newCode);

        // gửi mail code
        // yarn add nodemailer
        let transfor = nodemailer.createTransport({
            auth: {
                user: "sangrom2003@gmail.com",
                pass: "myxwkadcycuwxukz"
            },
            service: "gmail"
        })

        let sendOption = {
            from: "sangrom2003@gmail.com",
            to: email,
            subject: "Lấy lại mật khẩu",
            text: "Code: " + code
        }
        // gửi mail
        transfor.sendMail(sendOption, (error, info) => { })

        responseApi(res, 200, true, "Email tồn tại !")

    } else {
        responseApi(res, 200, false, "Email không đúng !")

    }

}

const checkCode = async (req, res) => {
    let { code } = req.params

    let checkCode = await model.code.findOne({
        where: {
            code
        }
    })

    if (checkCode) {
        // check expired
        responseApi(res, 200, true, "")
    } else {
        responseApi(res, 200, false, "Code không đúng!")
    }

}

const resetToken = async (req, res) => {
    let { token } = req.headers
    let decode = dataToken(token)

    // check token hợp lệ

    // check user => lấy refresh token
    let checkUser = await model.users.findOne({
        where: {
            user_id: decode.userId
        }
    })

    if (checkUser) {
        // check refresh token hợp lệ
        let checkRefToken = checkTokenRef(checkUser.dataValues.refresh_token)

        let decodeRef = dataToken(checkUser.dataValues.refresh_token)

        if (checkRefToken == null && decode.key == decodeRef.key) {
            // kiểm tra key

            // tạo token
            let token = createToken({ userId: checkUser.dataValues.user_id, key: decode.key });
            responseApi(res, 200, token, "thành công !")
            return


        }

    }
    responseApi(res, 401, "", "Unauthoried")

}

export {
    login,
    signUp,
    loginFacebook,
    checkEmail,
    checkCode,
    resetToken
}