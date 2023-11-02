const emotionTypeModel = require('../database/emotionTypesModel')
const emotionsModel = require('../database/emotionsModel')
const stringUtils = require('../utils/stringUtils')
const { Op } = require('sequelize')

async function create(user_id, description, intensity_weight, type_id) {
    emotionsModel.create({
        description: description,
        intensity_weight: intensity_weight,
        type_id: type_id,
        user_id: user_id,
    })
}

async function edit(user_id, emotion_id, description, intensity_weight, type_id) {
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
            if(!stringUtils.isNullOrEmpty(description)){
                emotion.description = description
            }

            if(intensity_weight != undefined && !isNaN(intensity_weight)){
                emotion.intensity_weight = intensity_weight
            }

            if(type_id != undefined && !isNaN(type_id)){
                emotion.type_id = type_id
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
    return await emotionsModel.findAll({
        raw: true,
        where: {
            user_id: user_id
        }
    })
}

async function get(user_id, emotion_id) {
    return await emotionsModel.findOne({
        raw: true,
        where: {
            id: emotion_id,
            user_id: {
                [Op.or]:
                    [
                        { user_id: undefined },
                        { user_id: user_id },
                    ]
            }
        }
    })
}

module.exports = {
    create,
    edit,
    remove,
    get,
    getAll,
}