const emotionsModel = require('../database/emotionsModel')
const emotionsEntryModel = require('../database/emotionsEntryModel')
const { Op } = require('sequelize')

async function create(description, intensity_weight, type_id, user_id){
    emotionsModel.create({
        description: description,
        intensity_weight: intensity_weight,
        type_id: type_id,
        user_id: user_id,
    })
}

async function remove(emotion_id){
    emotionsModel.destroy({
        where:{
            id: emotion_id
        }
    })
}

async function getAllByUser(user_id){
    return emotionsModel.findAll({
        raw: true,
        where: {
            user_id: user_id
        }
    })
}


async function addEmotionToEntry(emotion_id, entry_id) {
    emotionsEntryModel.create({
        emotion_id: emotion_id,
        entry_id: entry_id
    })
}


module.exports = {
    create,
    remove,
    getAllByUser
}