import express from 'express';
import { updateInfo, uploadAvatar, userLogin, userLoginFacebook, userSignUp } from '../controllers/userController.js';

const userRoute = express.Router();

// đăng ký
userRoute.post("/sign-up", userSignUp);

// đăng nhập
userRoute.post("/login", userLogin);

// đăng nhập facebook
userRoute.post("/login-facebook", userLoginFacebook);


// cập nhật thông tin user
userRoute.put("/update-info", updateInfo)

// yarn add multer => lưu hình vào source BE

import { upload } from '../controllers/uploadController.js';

// process.cwd() => trả về đường dẫn gốc
// __dirname => trả về đường dẫn file đang đứng


userRoute.put("/upload-avatar", upload.single("file"), uploadAvatar)

export default userRoute;

// (...rest) =>{}