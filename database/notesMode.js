const sequelize = require('sequelize')
const connection = require('./connection')

const notes = connection.define('notes', {
    content: {
        type: sequelize.TEXT,
        allowNull: false
    },
    entry_id: {
        type: sequelize.INTEGER,
        references: {
            model: 'entries',
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
        allowNull: false
    }
})

notes.sync({ force: false }).then(() => {
    console.log("Tabela 'notes' \t[OK]")
})

module.exports = notes