const sequelize = require('sequelize')
const connection = require('./connection')

const emotions = connection.define('emotions', {
    description: {
        type: sequelize.DATE,
        allowNull: false
    },
    intensity_weight:{
        type: sequelize.FLOAT,
        allowNull: false
    },
    type: {
        type: sequelize.INTEGER,
        references: {
            model: 'emotion_types',
            key: 'id'
        },
        allowNull: false
    },
    user_id: {
        type: sequelize.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        },
        allowNull: true
    }
})

emotions.sync({ force: false }).then(() => {
    console.log("Tabela 'emotions' \t\t[OK]")
})

module.exports = emotions