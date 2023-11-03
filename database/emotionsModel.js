const sequelize = require('sequelize')
const connection = require('./connection')

const emotions = connection.define('emotions', {
    description: {
        type: sequelize.STRING(20),
        allowNull: false
    },
    primary_type_id: {
        type: sequelize.INTEGER,
        references: {
            model: 'emotion_types',
            key: 'id'
        },
        allowNull: false
    },
    primary_weight: {
        type: sequelize.FLOAT,
        allowNull: false
    },
    secondary_type_id: {
        type: sequelize.INTEGER,
        references: {
            model: 'emotion_types',
            key: 'id'
        },
        allowNull: false
    },
    secondary_weight: {
        type: sequelize.FLOAT,
        allowNull: false
    },
    user_id: {
        type: sequelize.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        },
        allowNull: true
    }
})

emotions.sync({ force: false }).then(() => {
    console.log("Tabela 'emotions'\t\t\t\t[OK]")
})

module.exports = emotions