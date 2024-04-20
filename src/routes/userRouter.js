
import express from 'express'
import { changePass, checkCode, checkEmail, getUser, login, loginFacebook, resetToken, signUp, uploadAvatar } from '../controllers/userController.js';
import { upload } from '../config/upload.js';

const userRouter = express.Router()

userRouter.post("/signup", signUp)
userRouter.post("/login", login)

userRouter.post("/login-facebook", loginFacebook)

userRouter.post("/reset-token", resetToken)


userRouter.post("/check-email", checkEmail)
userRouter.post("/check-code", checkCode)
userRouter.post("/change-pass", changePass)


// API update avatar
userRouter.post("/upload-avatar", upload.single("avatar"), uploadAvatar)

// API danh sach user
userRouter.get("/get-user",getUser)


export default userRouter;
