const sequelize = require('sequelize')
const connection = require('./connection')

const emotions_entry = connection.define('emotions_entry', {
    emotion_id: {
        type: sequelize.INTEGER,
        references: {
            model: 'emotions',
            key: 'id'
        },
        unique: "oneEmotionPerEntry",
        allowNull: false
    },
    entry_id: {
        type: sequelize.INTEGER,
        references: {
            model: 'emotions',
            key: 'id'
        },
        unique: "oneEmotionPerEntry",
        allowNull: false
    }
})

emotions_entry.sync({ force: false }).then(() => {
    console.log("Tabela 'emotions_entry' \t\t[OK]")
})

module.exports = emotions_entry