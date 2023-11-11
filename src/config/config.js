
// process // => biến toàn cục chứa thông tin hệ thống máy, môi trường

// yarn add dotenv
import dotenv from 'dotenv';
dotenv.config()

export default {
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT

};
// node src/config/config.js