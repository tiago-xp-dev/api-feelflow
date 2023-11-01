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

async function getAll(user_id){
    emotionsModel.findAll({
        raw: true,
        where: {
            user_id: user_id
        }
    }).then(emotions => {
        return emotions
    })
}

async function get(emotion_id){
    emotionsModel.findOne({
        raw: true,
        where: {
            emotion_id: emotion_id
        }
    }).then(emotion => {
        return emotion
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
    getAll,
    get,
    addEmotionToEntry
}