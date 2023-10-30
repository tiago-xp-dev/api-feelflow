const entriesModel = require('../database/entriesModel')
const emotionsEntryModel = require('../database/emotionsEntryModel')

async function createEntry(reference_date, user_id) {
    entriesModel.create({
        user_id: user_id,
        reference_date: reference_date
    })
}

async function removeEntry(entry_id) {
    if (!isNaN(entry_id)) {

        entriesModel.destroy({
            where: {
                id: entry_id
            }
        })
    } else {
        return false
    }
}

async function addEmotionToEntry(emotion_id, entry_id, user_id) {

}