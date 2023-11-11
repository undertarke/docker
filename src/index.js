import express from 'express';

const app = express();
app.use(express.json()) // hàm chèn middle ware trước khi FE truyền request tới BE
app.use(express.static(".")) // định vị đường dẫn để tải tài nguyên từ BE

// chặn thông qua domain của FE
import cors from 'cors';
app.use(cors({
    origin:["http://localhost:3000","http://cybersoft.vn","https://cybersoft.vn"]
}))

app.listen(8080); // => khởi tạo server BE nodejs với port tự động 
import rootRoute from './routes/rootRoute.js';
app.use(rootRoute);

// localhost:8080/video/get-video

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
app.use("/api-swagger", swaggerUi.serve, swaggerUi.setup(specs));







// import http from 'http'

// const server = http.createServer((req, res) => {
//     if (req.url === '/api/greeting' && req.method === 'GET') {
//         res.writeHead(200, { 'Content-Type': 'application/json' });
//         res.end(JSON.stringify({ message: 'Hello, World!' }));
//     } else {
//         res.writeHead(404, { 'Content-Type': 'application/json' });
//         res.end(JSON.stringify({ error: 'Resource not found' }));
//     }
// });

// const PORT = 3000;
// server.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });