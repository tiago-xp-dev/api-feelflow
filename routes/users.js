const express = require('express');
const router = express.Router();
const users = require('../services/users');
const strUtils = require('../utils/stringUtils')

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Manejo de Usuários
 */

/**
 * @swagger
 * /usuario/create:
 *   post:
 *     summary: Cria um usuário
 *     tags: [Usuarios]
 *     security: []
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
 *       400:
 *         description: 'Parâmetros fornecidos são inválidos'
 *       500:
 *         description: 'Erro interno ao criar o usuário.'
 */
/* POST user. */
router.post('/create', async function (req, res) {
    try {
        var { email, user_name, password } = req.body

        if(!strUtils.isNullOrEmpty(email) &&
         !strUtils.isNullOrEmpty(user_name) &&
         !strUtils.isNullOrEmpty(password)){
            if(await users.createUser(email, password, user_name)){
                res.sendStatus(200)
            }else{
                res.sendStatus(409)
            }
        }else{
            res.sendStatus(400)
        }        
    } catch (err) {
        console.error('Error while creating User')
        res.sendStatus(500)
    }
});

/**
 * @swagger
 * /usuario/validate:
 *   post:
 *     summary: Valida o Login de um Usuário
 *     tags: [Usuarios]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/schemas/UserAuth'
 *     responses:
 *       '202':
 *         description: 'Usuário validado.'
 *       '204':
 *         description: 'Usuário inexistente ou e-mail ou senha incorretos.'
 *       '500':
 *         description: 'Erro interno ao validar o usuário.'
 *       'default':
 *         description: 'Retorno da validação'
 *         content:
 *             application/json:
 *               schema:
 *                 $ref: '#/definitions/schemas/UserAuthReturn'
 */
/* POST user. (validation) */
router.post('/validate', async function (req, res) {
    try {
        var { email, password } = req.body
        let response = await users.authenticate(email, password)

        if (response.status) {
            response.message = 'Validated'
            res.json(response).status(202)
        } else {
            response.message = 'Inexistent User or Incorrect E-mail/Password'
            res.json(response).status(204)
        }
    } catch (err) {
        console.error('Error while validating user')
        console.error(err)
        res.sendStatus(500)
    }
})

module.exports = router;