const entriesModel = require('../database/entriesModel')
//const emotionsEntryModel = require('../database/emotionsEntryModel')
const { Op } = require('sequelize')

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

async function editEntry(entry_id) {
    // TODO
}

async function getAllByUser(user_id, year) {

    // TODO: CONTINUAR
    entriesModel.findAll({
        where: {
            user_id: user_id,
            reference_date: {
                [Op.between]: [Date(`01/01/${year}`), Date(`31/12/${year}`)]
            }
        }
    }).then(entries => {
        return entries
    })
}

async function addEmotionToEntry(emotion_id, entry_id, user_id) {
    
}

module.exports = {
    createEntry,
    editEntry,
    removeEntry,
    getAllByUser,
}