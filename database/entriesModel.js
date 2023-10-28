const sequelize = require('sequelize')
const connection = require('./connection')

const entries = connection.define('entries', {
    content: {
        type: sequelize.TEXT,
        allowNull: false
    },
    emission: {
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

entries.sync({ force: false }).then(() => {
    console.log("Tabela 'entries' \t[OK]")
})

module.exports = entries