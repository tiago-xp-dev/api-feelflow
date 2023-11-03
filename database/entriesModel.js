const sequelize = require('sequelize')
const connection = require('./connection')

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

entries.sync({ force: false }).then(() => {
    console.log("Tabela 'entries'\t\t\t\t[OK]")
})

module.exports = entries