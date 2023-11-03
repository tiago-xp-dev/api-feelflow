// TODO: REALIZAR A DOCUMENTAÇÃO SWAGGER ADEQUADAMENTE 
//       E MELHORAR OS RETORNOS DOS ENDPOINTS PARA 
//       ALGUMA FORMA PADROZINADA AFIM DE FACILITAR O CONSUMO

const emotionTypesModel = require('../database/emotionTypesModel')
const emotionsModel = require('../database/emotionsModel')
const stringUtils = require('../utils/stringUtils')
const { Op } = require('sequelize')

async function create(user_id, description, primary_type_id, primary_weight, secondary_type_id, secondary_weight) {
    emotionsModel.create({
        user_id: user_id,
        description: description,
        primary_type_id: primary_type_id,
        primary_weight: primary_weight,
        secondary_type_id: secondary_type_id,
        secondary_weight: secondary_weight,
    })
}

async function edit(user_id, emotion_id, description, primary_type_id, primary_weight, secondary_type_id, secondary_weight) {
    if (!isNaN(emotion_id)) {
        return await emotionsModel.findOne({
            where: {
                id: emotion_id,
                user_id: {
                    [Op.eq]: user_id,
                    [Op.and]: { [Op.ne]: undefined }
                }
            }
        }).then(emotion => {
            if (!stringUtils.isNullOrEmpty(description)) {
                emotion.description = description
            }

            if (primary_type_id != undefined && !isNaN(primary_type_id)) {
                emotion.primary_type_id = primary_type_id
            }

            if (primary_weight != undefined && !isNaN(primary_weight)) {
                emotion.primary_weight = primary_weight
            }

            if (secondary_type_id != undefined && !isNaN(secondary_type_id)) {
                emotion.secondary_type_id = secondary_type_id
            }

            if (secondary_weight != undefined && !isNaN(secondary_weight)) {
                emotion.secondary_weight = secondary_weight
            }
        })
    }
}

async function remove(user_id, emotion_id) {
    if (!isNaN(emotion_id)) {
        return await emotionsModel.destroy({
            where: {
                id: emotion_id,
                user_id: user_id,
            }
        }).then(delete_count => {
            return delete_count > 0
        })
    }
    return false
}

async function getAll(user_id) {
    if (!isNaN(user_id)) {
        return await emotionsModel.findAll({
            attributes: ['id', 'description', 'primary_weight', 'secondary_weight', 'user_id'],
            where: {
                user_id: user_id
            },
            include:
                [
                    { model: emotionTypesModel, as: 'primary_type' },
                    { model: emotionTypesModel, as: 'secondary_type' }
                ]
        })
    }
    return []
}

async function get(user_id, emotion_id) {
    if (!isNaN(user_id), !isNaN(emotion_id)) {
        return await emotionsModel.findOne({
            where: {
                id: emotion_id,
                user_id: {
                    [Op.or]:
                        [
                            { user_id: undefined },
                            { user_id: user_id },
                        ]
                }
            },
            include:
                [
                    { model: emotionTypesModel, as: 'primary_type' },
                    { model: emotionTypesModel, as: 'secondary_type' }
                ]
        })
    }
    return null
}

module.exports = {
    create,
    edit,
    remove,
    get,
    getAll,
}