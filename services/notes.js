const entries = require('../database/entriesModel')
const notesModel = require('../database/notesModel'),
    stringUtils = require('../utils/stringUtils')


async function create(user_id, entry_id, content) {
    try {
        return await entries.findOne({
            where: {
                user_id: user_id,
                id: entry_id,
            }
        }).then(async (entry) => {
            if (entry != undefined) {
                await notesModel.create({
                    content: content,
                    entry_id: entry_id,
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

async function read(user_id, entry_id) {
    return await entries.findOne({
        where: {
            user_id: user_id,
            id: entry_id,
        }
    }).then(async (entry) => {
        if (entry != undefined) {
            return await notesModel.findOne({
                attributes: ['id', 'content', 'entry_id'],
                where: {
                    entry_id: entry_id
                }
            })
        }
    })
}


async function update(user_id, entry_id, content) {
    return await entries.findOne({
        where: {
            user_id: user_id,
            id: entry_id,
        }
    }).then(async (entry) => {
        if (entry != undefined) {
            return await notesModel.findOne({
                where: {
                    entry_id: entry_id
                }
            }).then(note => {
                if (note != undefined) {
                    if (!stringUtils.isNull(content)) {                        
                        note.content = content
                    }
                    
                    note.save()
                    return true
                }
                return false
            })
        }
    })
}

async function destroy(user_id, entry_id) {
    return await entries.findOne({
        where: {
            user_id: user_id,
            id: entry_id,
        }
    }).then(async (entry) => {
        if (entry != undefined) {
            return await notesModel.destroy({
                where: {
                    entry_id: entry_id,
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
    update,
    destroy,
}