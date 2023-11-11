// quản lý các đối tượng endpoint
import express from 'express';
import videoRoute from './videoRoute.js';
import userRoute from './userRoute.js';

const rootRoute = express.Router();

rootRoute.use("/video", videoRoute);
rootRoute.use("/user", userRoute);
// rootRoute.use("/product");

export default rootRoute;
