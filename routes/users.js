const express = require('express');
const router = express.Router();
const users = require('../services/users');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Manejo de Usuários
 * /user/create:
 *   post:
 *     summary: Cria um usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/schemas/User'
 *     responses:
 *       201:
 *         description: 'Usuário criado com sucesso.'
 *       409:
 *         description: 'E-mail já em uso.'
 *       500:
 *         description: 'Erro interno ao criar o usuário.'
 */
/* POST user. */
router.post('/create', async function(req, res, next) {
    try {
        var { email, user_name, password } = req.body
        res.json(await users.createUser(email, password, user_name)).status(200);
    } catch (err) {
        console.error(`Error while getting users `, err.message);
        next(err);
    }
});


/**
 * @swagger
 * /user/validate:
 *   post:
 *     summary: Valida o Login de um Usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/schemas/UserAuth'
 *     responses:
 *       202:
 *         description: 'Usuário validado.'
 *       204:
 *         description: 'Usuário inexistente ou e-mail ou senha incorretos.'
 *       500:
 *         description: 'Erro interno ao validar o usuário.'
 */
/* GET user. (validation) */
router.get('/', async function(req, res, next) {
    try {
        res.send('teste')
    } catch (err) {
        console.error('Error while getting users ')
    }
})

module.exports = router;