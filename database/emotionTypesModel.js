const sequelize = require('sequelize')
const connection = require('./connection')
const emotions = require('./emotionsModel')

const emotion_types = connection.define('emotion_types',
    {
        description: {
            type: sequelize.STRING(20),
            allowNull: false
        },
        kind: {
            type: sequelize.STRING(10),
            allowNull: false,
            defaultValue: "PRIMARY"
        },
        weight_type:{
            type: sequelize.STRING(10),
            allowNull: false,
            defaultValue: "POSITIVE"
        }

    },
    {
        timestamps: false
    }
)

emotions.hasOne(emotion_types, {sourceKey: 'primary_type_id', foreignKey: 'id', as: 'primary_type'})
emotions.hasOne(emotion_types, {sourceKey: 'secondary_type_id', foreignKey: 'id', as: 'secondary_type'})

emotion_types.sync({ force: false }).then(() => {
    console.log("Tabela 'emotion_types'\t\t\t\t[OK]")
})

module.exports = emotion_types