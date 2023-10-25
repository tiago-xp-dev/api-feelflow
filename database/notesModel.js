const sequelize = require('sequelize')
const connection = require('./connection')

const notes = connection.define('notes', {
    content: {
        type: sequelize.TEXT,
        allowNull: false
    },
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

notes.sync({ force: false }).then(() => {
    console.log("Tabela 'notes' \t[OK]")
})

module.exports = notes