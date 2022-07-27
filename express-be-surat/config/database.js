const dotenv = require('dotenv')
const Sequelize = require('sequelize')
dotenv.config();

// create connection
const sequelizeConf = new Sequelize(process.env.DB_NAME, 'root', '', {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    define: {
        charset: "utf8mb4",
    },
    timezone: "+07:00",
    retry: { max: 5 },
});

module.exports = sequelizeConf;