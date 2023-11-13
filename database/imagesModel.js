const sequelize = require('sequelize')
const connection = require('./connection')
const entries = require('./entriesModel')

const images = connection.define('images', {
    image: {
        type: sequelize.BLOB('long'),
        allowNull: false
    },
    entry_id: {
        type: sequelize.INTEGER,
        references: {
            model: 'entries',
            key: 'id'
        },
        allowNull: false
    }
})

entries.hasMany(images, {foreignKey: 'entry_id', as: 'images'})

images.sync({ force: false }).then(() => {
    console.log("Tabela 'images'\t\t\t\t\t[OK]")
})

module.exports = images