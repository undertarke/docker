
import express from 'express'
import cors from 'cors'

const app = express();

app.use(express.json())
app.use(cors()) // cho phép tất cả
app.use(express.static(".")) // định vị lại đường load tài nguyên

app.listen(8080)


import rootRoute from './routes/rootRoute.js';
app.use(rootRoute)

// ORM: Object Relational mapping
// seque




import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

const options = {
    definition: {
        info: {
            title: "api",
            version: "1.0.0"
        }
    },
    apis: ["src/swagger/index.js"]
}

const specs = swaggerJsDoc(options);

// localhost:8080/swagger
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(specs));



// B1: yarn add prisma @prisma/client

// B2: yarn prisma init => generate file kết nối CSDL và model

// B3: sửa chuỗi kết nối CSDL và schema.prisma

// B4: Database first => yarn prisma db pull
// B5: yarn prisma generate => làm mới lại các đối tượng truy vấn trong prisma/client


import { PrismaClient } from '@prisma/client'

let model = new PrismaClient()

app.get("/get-video-all", async (req, res) => {
    // let data = await model.video_type.findMany({
    //     include: {
    //         video: {
    //             include:{
    //                 users:true
    //             }
    //         },

    //     }
    // })

    let model = {
        video_id: 1,
        video_name: "abc"
    }

    model.video.create({ data: model })
    model.video.update({ data: model, where:{} })


    res.send(data)
})