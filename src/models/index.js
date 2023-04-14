const { Sequelize } = require('sequelize');
const config = require('../config/index');

const sequelize = new Sequelize(config.db_name, config.db_user, config.db_pass, {
    host: "127.0.0.1",
    dialect: config.db_dialect,
    port: config.db_port
})

module.exports = sequelize;

//Code first

//yarn sequelize-cli init
//npm sequelize-cli init
//npx sequelize-cli init