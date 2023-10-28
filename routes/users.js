const { response } = require('express');
const express = require('express');
const router = express.Router();
const users = require('../services/users');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Manejo de Usuários
 */

/**
 * @swagger
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
router.post('/create', async function (req, res) {
    try {
        var { email, user_name, password } = req.body
        res.json(await users.createUser(email, password, user_name)).status(200);
    } catch (err) {
        console.error('Error while creating User')
        res.sendStatus(500)
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
 *       '202':
 *         description: Usuário validado.
 *       '204':
 *         description: Usuário inexistente ou e-mail ou senha incorretos.
 *       '500':
 *         description: Erro interno ao validar o usuário.
 */
/* POST user. (validation) */
router.post('/validate', async function (req, res) {
    try {
        var { email, password } = req.body
        let response = await users.authenticate(email, password)

        if (response.status) {
            response.message = 'Validated'
            res.status(202).json(response)
        } else {
            response.message = 'Inexistent User or Incorrect E-mail/Password'
            res.status(204).json(response, status)
        }
    } catch (err) {
        console.error('Error while validating user')
        res.sendStatus(500)
    }
})

module.exports = router;