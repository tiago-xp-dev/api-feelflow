const model = require('../database/usersModel')

async function createUser(email, password, user_name) {
    model.create({
        email: email,
        password: password,
        user_name: user_name
    })
}

async function authenticate(email, password) {
    let user = await model.findOne({
        raw: true,
        where: {
            email: email,
            password: password
        }
    })
    // TODO: SUBSTITUIR ID POR TOKEN DE AUTH
    return { id: user?.id, status: user != undefined }
}

module.exports = {
    createUser,
    authenticate
}