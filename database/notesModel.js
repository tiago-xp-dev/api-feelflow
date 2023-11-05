const sequelize = require('sequelize')
const connection = require('./connection')
const entries = require('./entriesModel')

const notes = connection.define('notes', {
    content: {
        type: sequelize.TEXT,
        allowNull: false,
    },
    entry_id: {
        type: sequelize.INTEGER,
        references: {
            model: 'entries',
            key: 'id'
        },
        allowNull: false,
        unique: true,
    }
})

entries.hasOne(notes, {foreignKey: 'entry_id', as: 'note'})
notes.belongsTo(entries, { foreignKey: 'entry_id', as: 'note' })

notes.sync({ force: false }).then(() => {
    console.log("Tabela 'notes'\t\t\t\t\t[OK]")
})

module.exports = notes