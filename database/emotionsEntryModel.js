const sequelize = require('sequelize')
const connection = require('./connection')
const emotions = require('./emotionsModel')
const entries = require('./entriesModel')

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

entries.belongsToMany(emotions,
    {
        through: 'emotions_entries',
        as: 'emotions',
        foreignKey: { name: 'entry_id' },        
    }
)

emotions.belongsToMany(entries,
    {
        through: 'emotions_entries',
        as: 'entries',
        foreignKey: { name: 'emotion_id' },
    }
)

emotions_entries.sync({ force: false }).then(() => {
    console.log("Tabela 'emotions_entries'\t\t\t[OK]")
})

module.exports = emotions_entries