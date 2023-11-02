const jwt = require('jsonwebtoken')
// TODO: MOVER PARA ARQUIVO DE ENV.
const secret_key = 'TEST_SECRET_KEY'

function createToken(payload) {
    let token = jwt.sign(
        {
            payload
        },
        secret_key
    )
    return token
}

function validateToken(token) {
    try {
        let normalizedToken = token?.replace('Bearer ', '')
        
        let jwtInfo = jwt.verify(normalizedToken, secret_key)
        
        jwtInfo.validated = true

        return jwtInfo
    } catch (err) {
        if (err instanceof jwt.JsonWebTokenError) {
            return { validated: false }
        } else {
            throw err
        }
    }
}

module.exports = {
    createToken,
    validateToken
}