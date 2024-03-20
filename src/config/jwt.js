// yarn add jsonwebtoken
import jwt from 'jsonwebtoken';
import { responseApi } from './response.js';

// tạo token
// data => object {}
export const createToken = (data) => jwt.sign(data, "BI_MAT", { algorithm: "HS256", expiresIn: "5s" })
// HS256, thời hạn sử dụng: expiresIn
// kiểm tra token
// 1: sai khóa bảo mật
// 2: hết hạn sử dụng
// 3: token sai định dạng, token thiếu dữ liệu,....
// err = null => token hợp lệ
// err != null => token ko hợp lệ
export const checkToken = (token) => jwt.verify(token, "BI_MAT", (err, decode) => err)

export const createTokenRef = (data) => jwt.sign(data, "BI_MAT_2", { algorithm: "HS256", expiresIn: "7d" })
export const checkTokenRef = (token) => jwt.verify(token, "BI_MAT_2", (err, decode) => err)

// giải mã token
export const dataToken = (token) => jwt.decode(token)

export const midVerifyToken = (req, res, next) => {
    let { token } = req.headers;
    
    let check = checkToken(token)

    if (check == null)
        next()
    else
        responseApi(res, 401, "", check)
}