const express = require('express')
const router = express.Router()
const notes = require('../services/notes')
const authUtils = require('../utils/authenticationUtils')
const strUtils = require('../utils/stringUtils')

/**
 * @swagger
 * tags:
 *   name: Anotações
 *   description: Manejo de Anotações do Diário
 */

/**
 * @swagger
 * /anotacoes/create/{entry_id}:
 *   post:
 *     summary: Cria uma anotação para a entrada especificada
 *     tags: [Anotações]
 *     parameters:
 *       - in: path
 *         name: entry_id
 *         schema:
 *           type: integer
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/schemas/ParameterNote'
 *     responses:
 *       200:
 *         description: 'Operação realizada com Sucesso.'
 *       400:
 *         description: 'Parâmetros fornecidos são inválidos.'
 *       403:
 *         description: 'Operação não permitida.'
 *       401:
 *         description: 'Não autorizado, ou token expirado.'
 *       500:
 *         description: 'Erro interno.'
 */
router.post('/create/:entry_id', async function (req, res) {
    try {
        let user = authUtils.validateToken(req.headers.authorization)

        if (user.validated) {
            let { entry_id } = req.params
            let { content } = req.body

            if (!isNaN(entry_id) && !strUtils.isNull(content)) {
                if (await notes.create(user?._id, entry_id, content)) {
                    res.sendStatus(200)
                } else {
                    res.sendStatus(403)
                }
            } else {
                res.sendStatus(400)
            }
        } else {
            res.sendStatus(401)
        }
    } catch (err) {
        console.error('Error while creating Note')
        console.log(err)
        res.sendStatus(500)
    }
})

/**
 * @swagger
 * /anotacoes/get/{entry_id}:
 *   get:
 *     summary: Obtem a anotação de um identificador de entrada especificado.
 *     tags: [Anotações]
 *     parameters:
 *       - in: path
 *         name: entry_id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: 'Operação realizada com Sucesso.'
 *       400:
 *         description: 'Parâmetros fornecidos são inválidos.'
 *       401:
 *         description: 'Não autorizado, ou token expirado.'
 *       500:
 *         description: 'Erro interno.'
 *       'default':
 *         description: 'Retorno'
 *         content:
 *             application/json:
 *               schema:
 *                 $ref: '#/definitions/schemas/ReturnNote'
 */
router.get('/get/:entry_id', async function (req, res) {
    try {
        let user = authUtils.validateToken(req.headers.authorization)

        if (user.validated) {
            let { entry_id } = req.params
            if (!isNaN(entry_id)) {
                let result = await notes.read(user?._id, entry_id)

                res.json(result).status(200)
            } else {
                res.sendStatus(400)
            }
        } else {
            res.sendStatus(401)
        }
    } catch (err) {
        console.error('Error while fetching Note')
        console.log(err)
        res.sendStatus(500)
    }
})

/**
 * @swagger
 * /anotacoes/edit/{entry_id}:
 *   put:
 *     summary: Altera uma anotação de uma entrada pelo Id especificado.
 *     tags: [Anotações]
 *     parameters:
 *       - in: path
 *         name: entry_id
 *         schema:
 *           type: integer
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/schemas/ParameterNote'
 *     responses:
 *       200:
 *         description: 'Operação realizada com Sucesso.'
 *       204:
 *         description: 'O alvo desta operação não foi encontrado.'
 *       400:
 *         description: 'Parâmetros fornecidos são inválidos.'
 *       401:
 *         description: 'Não autorizado, ou token expirado.'
 *       500:
 *         description: 'Erro interno.'
 */
router.put('/edit/:entry_id', async function (req, res) {
    try {
        let user = authUtils.validateToken(req.headers.authorization)

        if (user.validated) {
            let { entry_id } = req.params
            let { content } = req.body

            if (!isNaN(entry_id) && !strUtils.isNull(content)) {
                if (await notes.update(user?._id, entry_id, content)) {
                    res.sendStatus(200)
                } else {
                    res.sendStatus(204)
                }
            } else {
                res.sendStatus(400)
            }
        } else {
            res.sendStatus(401)
        }
    } catch (error) {
        console.error('Error while altering Note')
        console.log(err)
        res.sendStatus(500)
    }
})

/**
 * @swagger
 * /anotacoes/delete/{entry_id}:
 *   delete:
 *     summary: Delete a anotação de uma entrada.
 *     tags: [Anotações]
 *     parameters:
 *       - in: path
 *         name: entry_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Valor numérico representando o ID da entrada da anotação a ser removida.
 *     responses:
 *       200:
 *         description: 'Operação realizada com Sucesso.'
 *       204:
 *         description: 'O alvo desta operação não foi encontrado.'
 *       400:
 *         description: 'Parâmetros fornecidos são inválidos.'
 *       401:
 *         description: 'Não autorizado, ou token expirado.'
 *       500:
 *         description: 'Erro interno.'
 */
router.delete('/delete/:entry_id', async function (req, res) {
    try {
        let user = authUtils.validateToken(req.headers.authorization)

        if (user.validated) {
            let { entry_id } = req.params
            if (!isNaN(entry_id)) {
                if (notes.destroy(user?._id, entry_id)) {
                    res.sendStatus(200)
                } else {
                    res.sendStatus(204)
                }
            } else {
                res.sendStatus(400)
            }
        } else {
            res.sendStatus(401)
        }
    } catch (err) {
        console.error('Error while fetching Note')
        console.error(err)
        res.sendStatus(500)
    }
})

module.exports = router