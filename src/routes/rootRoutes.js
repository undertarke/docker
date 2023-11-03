

// quản lý các đối tượng Router

import express from 'express';
import videoRoute from './videoRoutes.js';
import userRoute from './userRoutes.js';

const rootRoute = express.Router();

rootRoute.use("/video", videoRoute)

rootRoute.use("/user",userRoute)
// rootRoute.use("/product")

export default rootRoute;






// // chuỗi kết nối CSDL
// let connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "1234",
//     port: "3306",
//     database: "db_youtube"
// })
// // ORM: sequelize, prisma
// app.get("/video/get-video", (req, res) => {

//     // truy vấn dữ liệu
//     let sql = "SELECT * FROM video";

//     connection.query(sql, (err, data) => {

//         res.send(data);
//     })

//     // bất đồng bộ
//     // đồng bộ. then catch, async await


// })