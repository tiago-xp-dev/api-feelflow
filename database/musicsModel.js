const sequelize = require('sequelize')
const connection = require('./connection')

const musics = connection.define('musics', {
    spotify_id: {
        type: sequelize.TEXT,
        allowNull: false
    },
    note_id: {
        type: sequelize.INTEGER,
        references: {
            model: 'musics',
            key: 'id'
        },
        allowNull: false
    }
})

musics.sync({ force: false }).then(() => {
    console.log("Tabela 'musics'\t\t\t\t[OK]")
})

module.exports = musics