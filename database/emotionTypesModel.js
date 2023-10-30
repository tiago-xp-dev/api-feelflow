const sequelize = require('sequelize')
const connection = require('./connection')

const emotion_types = connection.define('emotion_types', {
    description: {
        type: sequelize.STRING(20),
        allowNull: false
    }
})

emotion_types.sync({ force: false }).then(() => {
    console.log("Tabela 'emotion_types' \t[OK]")
})

module.exports = emotion_types