const entriesModel = require('../database/entriesModel')
const { Op } = require('sequelize')
const moment = require('moment')

async function create(user_id, reference_date) {
    entriesModel.create({
        user_id: user_id,
        reference_date: reference_date
    })
}

async function remove(user_id, entry_id) {
    if (!isNaN(entry_id)) {
        return await entriesModel.destroy({
            where: {
                id: entry_id,
                user_id: user_id,
            }
        }).then(delete_count => {
            return delete_count > 0
        })
    }
    return false
}

async function edit(user_id, entry_id, reference_date) {
    let result = await entriesModel.findOne({
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

    return result
}

async function getAll(user_id, year) {
    return await entriesModel.findAll({
        raw: true,
        attributes: ['id', 'user_id', 'reference_date'],
        where: {
            user_id: user_id,
            reference_date: {
                [Op.between]:
                    [
                        moment(`${year}-01-01`, 'YYYY-MM-dd').toDate(),
                        moment(`${year}-12-31`, 'YYYY-MM-dd').toDate()
                    ]
            }
        }
    })
}

async function get(user_id, entry_id) {
    let entry = await entriesModel.findOne({
        raw: true,
        attributes: ['id', 'user_id', 'reference_date'],
        where: {
            id: entry_id,
            user_id: user_id,
        }
    })

    return entry
}

module.exports = {
    create,
    edit,
    remove,
    get,
    getAll,
}