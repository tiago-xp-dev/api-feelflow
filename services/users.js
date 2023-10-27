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

    if (user != undefined) {
        return true
    }
    return false
}

module.exports = {
    createUser,
    authenticate
}