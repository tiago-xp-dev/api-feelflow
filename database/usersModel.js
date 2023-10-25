const sequelize = require('sequelize')
const connection = require('./connection')

const users = connection.define('users', {
    email: {
        type: sequelize.TEXT,
        allowNull: false
    },
    password: {
        type: sequelize.TEXT,
        allowNull: false
    },
    user_name: {
        type: sequelize.TEXT,
        allowNull: false
    }
})

users.sync({ force: false }).then(() => {
    console.log("Tabela 'users' \t[OK]")
})

module.exports = users