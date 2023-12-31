const { Op } = require('sequelize')
const moment = require('moment')
const entriesModel = require('../database/entriesModel')
const emotionsModel = require('../database/emotionsModel')
const emotionTypesModel = require('../database/emotionTypesModel')
const notesModel = require('../database/notesModel')
const imagesModel = require('../database/imagesModel')

async function create(user_id, reference_date) {
    entriesModel.create({
        user_id: user_id,
        reference_date: reference_date
    })
}

async function remove(user_id, entry_id) {
    return await entriesModel.destroy({
        where: {
            id: entry_id,
            user_id: user_id,
        }
    }).then(delete_count => {
        return delete_count > 0
    })
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
        attributes: ['id', 'user_id', 'reference_date'],
        where: {
            id: entry_id,
            user_id: user_id,
        },
        include:
            [
                {
                    model: emotionsModel,
                    as: 'emotions',
                    through: { attributes: [] },
                    attributes: ['id','description','primary_type_id','primary_weight','secondary_type_id','secondary_weight','user_id'],
                    include: [
                        { model: emotionTypesModel, as: 'primary_type' },
                        { model: emotionTypesModel, as: 'secondary_type' }
                    ]
                },
                {
                    model: notesModel,
                    as: 'note',
                    attributes: ['content']
                },
                {
                    model: imagesModel,
                    as: 'images',
                    attributes: ['id']
                }
            ]
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