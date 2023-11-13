const imagesModel = require('../database/imagesModel'),
      entries = require('../database/entriesModel')

async function create(user_id, entry_id, imageBuffer) {
    try {
        return await entries.findOne({
            where: {
                user_id: user_id,
                id: entry_id,
            }
        }).then(async (entry) => {
            if (entry != undefined) {
                imagesModel.create({
                    image: imageBuffer,
                    entry_id: entry_id
                })
                return true
            }
            return false
        })
    } catch (err) {
        console.error(err)
        return false
    }
}

async function read(user_id, entry_id, image_id) {
    return await entries.findOne({
        where: {
            user_id: user_id,
            id: entry_id,
        }
    }).then(async (entry) => {
        if (entry != undefined) {
            return await imagesModel.findOne({
                raw: true,
                attributes: ['image'],
                where: {
                    entry_id: entry_id,
                    id: image_id,
                }
            })
        }
    })
}

async function readIds(user_id, entry_id) {
    return await entries.findOne({
        where: {
            user_id: user_id,
            id: entry_id,
        }
    }).then(async (entry) => {
        if (entry != undefined) {
            return await imagesModel.findAll({
                attributes: ['id'],
                where: {
                    entry_id: entry_id
                }
            })
        }
    })
}

async function destroy(user_id, entry_id, image_id) {
    return await entries.findOne({
        where: {
            user_id: user_id,
            id: entry_id,
        }
    }).then(async (entry) => {
        if (entry != undefined) {
            return await imagesModel.destroy({
                where: {
                    entry_id: entry_id,
                    id: image_id
                }
            }).then(delete_count => {
                return delete_count > 0
            })
        }
    })
}

module.exports = {
    create,
    read,
    readIds,
    destroy
}