const sequelize = require('sequelize')
const connection = require('./connection')

const emotions_entries = connection.define('emotions_entries',
    {
        emotion_id: {
            type: sequelize.INTEGER,
            references: {
                model: 'emotions',
                key: 'id'
            },
            unique: "EmotionPerEntry",
            allowNull: false
        },
        entry_id: {
            type: sequelize.INTEGER,
            references: {
                model: 'entries',
                key: 'id'
            },
            unique: "EmotionPerEntry",
            allowNull: false
        }
    },
    {
        timestamps: false
    }
)

emotions_entries.sync({ force: false }).then(() => {
    console.log("Tabela 'emotions_entries'\t\t\t[OK]")
})

module.exports = emotions_entries