const emotionsEntryModel = require('../database/emotionsEntryModel')

async function addEmotionToEntry(emotion_id, entry_id) {
    emotionsEntryModel.create({
        emotion_id: emotion_id,
        entry_id: entry_id
    })
}