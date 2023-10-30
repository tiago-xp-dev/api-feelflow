const sequelize = require('sequelize')
const connection = require('./connection')

const entries = connection.define('entries', {
    emotion_id: {
        type: sequelize.INTEGER,
        references: {
            model: 'emotions',
            key: 'id'
        },
        unique: "oneEmotionPerEntry",
        allowNull: false
    },
    user_id: {
        type: sequelize.INTEGER,
        references: {
            model: 'entries',
            key: 'id'
        },
        unique: "oneEmotionPerEntry",
        allowNull: false
    }
})

entries.sync({ force: false }).then(() => {
    console.log("Tabela 'entries' \t[OK]")
})

module.exports = entries