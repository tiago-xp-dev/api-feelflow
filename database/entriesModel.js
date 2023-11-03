const sequelize = require('sequelize')
const connection = require('./connection')
const emotions = require('./emotionsModel')
const entriesEmotions = require('./emotionsEntryModel')

const entries = connection.define('entries', {
    reference_date: {
        type: sequelize.DATE,
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

emotions.belongsToMany(entries, {through: 'entries_emotions'})

entries.sync({ force: false }).then(() => {
    console.log("Tabela 'entries'\t\t\t\t[OK]")
})

module.exports = entries