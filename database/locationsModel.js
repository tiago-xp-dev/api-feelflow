const sequelize = require('sequelize')
const connection = require('./connection')

const locations = connection.define('locations', {
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

locations.sync({ force: false }).then(() => {
    console.log("Tabela 'locations'\t\t\t\t[OK]")
})

module.exports = locations