import express from 'express'
import cors from 'cors'


const app = express()
app.use(express.json())
app.use(cors())

app.use(express.static(".")) // định vị đường dẫn load tài nguyên

app.listen(8080)

import rootRouter from './routes/rootRouter.js'
app.use(rootRouter)


// yarn add prisma @prisma/client
// yarn prisma init
// update biến .env và file schema.prisma
// database first => yarn prisma db pull
// yarn prisma generate => lam mới lại các đối tượng trong prisma/client



// yarn add socket.io


import { createServer } from "http";
import { Server } from "socket.io";
import { PrismaClient } from '@prisma/client';
let prisma = new PrismaClient();

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: "*"
    }
});

io.on("connection", (socket) => {

    socket.on("join-room", async (roomId) => {

        socket.join(roomId)

        let data = await prisma.chat.findMany({
            where: {
                room_id: roomId
            }
        })
        io.to(roomId).emit("data-chat", data)

        // socket.rooms.forEach(item => {
        //     socket.leave(item)
        // })


    })

    socket.on("send-message", async (data) => {
        // lưu database
        let newData = {
            user_id: data.user_id,
            content: data.content,
            room_id: data.roomId,
            date: new Date()
        }

        await prisma.chat.create({ data: newData })

        io.to(data.roomId).emit("sv-send-message", data)
    })


});

httpServer.listen(8081);




// const express = require('express');
// ===================== index.js ========================
// const app = express();

// app.use(express.json());
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

// const rootRouter = require('./routes/index');

// app.use("/api", rootRouter);


const options = {
    definition: {
        info: {
            title: "api",
            version: "1.0.0"
        }
    },
    apis: ["src/swagger/index.js"] // load API
}

const specs = swaggerJsDoc(options);

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(specs));


