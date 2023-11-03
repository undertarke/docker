import express from 'express';
const app = express();
app.use(express.json());
app.use(express.static(".")) // định vị lại đường dẫn để load tài nguyên ở BE

// yarn add cors
import cors from 'cors';
// mở chặn cho tất cả FE
app.use(cors())

app.listen(8080);

import rootRoute from './routes/rootRoutes.js';
app.use("/api", rootRoute);


// localhost:8080/api/video/get-video


// localhost:8080/api/user/get-user
// localhost:8080/api/product/get-product


// yarn add prisma @prisma/client
// yarn primsa init

// Databast First: yarn prisma db pull 

// yarn prisma generate => làm mới lại model trong @prisma/client

// Code First: yarn prisma db push


// yarn add swagger-ui-express swagger-jsdoc
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

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(specs));


