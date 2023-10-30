const sequelize = require('sequelize')
const connection = require('./connection')

const users = connection.define('users', {
    email: {
        type: sequelize.STRING(80),
        allowNull: false,
        unique: "user"

    },
    password: {
        type: sequelize.STRING(30),
        allowNull: false,
        unique: "user"
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