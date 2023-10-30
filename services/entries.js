const model = require('../database/entriesModel')

async function create(content, emission, user_id){
    model.create({
        user_id: user_id
    })
}