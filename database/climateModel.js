const sequelize = require('sequelize')
const connection = require('./connection')
    //  TODO
const temperatures = connection.define('temperatures', {
    description: {
        type: sequelize.TEXT,
        allowNull: true
    },
    lat: {
        type: sequelize.DOUBLE,
        allowNull: false
    },
    long: {
        type: sequelize.DOUBLE,
        allowNull: false
    },
    user_id: {
        type: sequelize.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        },
        allowNull: false
    }
})

temperatures.sync({ force: false }).then(() => {
    console.log("Tabela 'temperatures' \t[OK]")
})

module.exports = temperatures