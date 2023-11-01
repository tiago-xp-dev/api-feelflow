const entriesModel = require('../database/entriesModel')
const { Op } = require('sequelize')

async function create(reference_date, user_id) {
    entriesModel.create({
        user_id: user_id,
        reference_date: reference_date
    })
}

async function remove(entry_id) {
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

async function alter(entry_id, user_id, reference_date) {
    entriesModel.findOne({
        where: {
            id: entry_id,
            user_id: user_id
        }
    }).then(entry => {
        if (entry != undefined) {
            entry.reference_date = reference_date

            entry.save();
            return true
        }

        return false;
    })
}

async function getAll(user_id, year) {
    entriesModel.findAll({
        raw: true,
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

async function get(user_id, entry_id) {
    entriesModel.findOne({
        raw: true,
        where:{
            user_id: user_id,
            entry_id: entry_id,
        }
    }).then(entry => {
        return entry
    })
}

module.exports = {
    create,
    alter,
    remove,
    getAll,
    get
}