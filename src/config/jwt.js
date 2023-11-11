// yarn add jsonwebtoken
import jwt from 'jsonwebtoken';

// mã hóa data
const createToken = (data) => {
    // tạo ra token
    let token = jwt.sign({ data }, "BIMAT", { algorithm: "HS256", expiresIn: "5y" }) // HS256, ES256

    return token;
}

// kiểm tra token
const checkToken = (token) => {
    return jwt.verify(token, "BIMAT");
}

// giải mã token
const decodeToken = (token) => {
    return jwt.decode(token);
}

export const checkApi = (req, res, next) => {
    try {
        let { token } = req.headers;
        console.log( req.query)
        checkToken(token)
        next()
    } catch (exception) {

        res.status(401).send("Không có quền")
    }

}

export {
    createToken,
    checkToken,
    decodeToken

}