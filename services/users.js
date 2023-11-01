const model = require('../database/usersModel')
const jwt = require('jsonwebtoken')

async function create(email, password, user_name) {
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
        var token = jwt.sign(
            {
                _id: user?.id,
            },
            // TODO: MOVER PARA ARQUIVO FORA DE ENV E REMOVER DE REPO PUBLICO
            "TEST_SECRET_KEY",
            {
                expiresIn: "1d"
            }
        )
    }

    return { token: token, status: user != undefined }
}

module.exports = {
    createUser: create,
    authenticate
}