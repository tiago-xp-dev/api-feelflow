const emotionsEntryModel = require('../database/emotionsEntryModel')

async function addEmotionToEntry(emotion_id, entry_id) {
    emotionsEntryModel.create({
        emotion_id: emotion_id,
        entry_id: entry_id
    })
}

async function removeEmotionFromEntry(emotion_id, entry_id) {
    return await emotionsEntryModel.destroy({
        emotion_id: emotion_id,
        entry_id: entry_id
    }).then(delete_count => {
        return delete_count > 0
    })
}

module.exports = {
    addEmotionToEntry,
    removeEmotionFromEntry,
}