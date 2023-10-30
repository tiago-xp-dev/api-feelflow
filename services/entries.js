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

        await entriesModel.destroy({
            where: {
                id: entry_id
            }
        }).then(() => {
            return true
        })
    } else {
        return false
    }
}

async function editEntry(entry_id){
    // TODO
}

async function getAllByUser(user_id, year){

    // TODO: CONTINUAR
    entriesModel.findAll({
        where: {
            user_id: user_id
        }
    })
}

async function addEmotionToEntry(emotion_id, entry_id, user_id) {

}