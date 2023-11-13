const { Sequelize } = require('sequelize')

const connection = new Sequelize('db_feelflow', 'root', '1234', {
    host: 'localhost',
    port: '3306',
    dialect: 'mysql',
    logging: false
})

module.exports = connection