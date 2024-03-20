// quản lý đối tượng endpoint
import express from 'express'
import videoRoute from './videoRoute.js';
import authRoute from './authRoute.js';
const rootRoute = express.Router();

rootRoute.use("/video",videoRoute)
rootRoute.use("/auth",authRoute)

// rootRoute.use("/user",userRoute)


export default rootRoute;