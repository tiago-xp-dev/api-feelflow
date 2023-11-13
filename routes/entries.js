const express = require('express');
const router = express.Router();
const entries = require('../services/entries');
const authUtils = require('../utils/authenticationUtils')
const moment = require('moment')

/**
 * @swagger
 * tags:
 *   name: Entradas
 *   description: Manejo de Entradas do Diário
 */

/**
 * @swagger
 * /entrada/create:
 *   post:
 *     summary: Cria uma entrada
 *     tags: [Entradas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/schemas/Entry'
 *     responses:
 *       200:
 *         description: 'Operação realizada com Sucesso.'
 *       400:
 *         description: 'Parâmetros fornecidos são inválidos.'
 *       401:
 *         description: 'Não autorizado, ou token expirado.'
 *       500:
 *         description: 'Erro interno.'
 */
router.post('/create', async function (req, res) {
    try {
        let user = authUtils.validateToken(req.headers.authorization)

        if (user.validated) {
            let { reference_date } = req.body
            if(moment(reference_date).isValid()){
                res.json(await entries.create(user?._id, reference_date)).status(200);
            }else{
                res.sendStatus(400)
            }
        } else {
            res.sendStatus(401)
        }
    } catch (err) {
        console.error('Error while creating Entry')
        console.log(err)
        res.sendStatus(500)
    }
});


/**
 * @swagger
 * /entrada/delete/{entry_id}:
 *   delete:
 *     summary: Delete uma entrada.
 *     tags: [Entradas]
 *     parameters:
 *       - in: path
 *         name: entry_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Valor numérico representando o ID da entrada a ser removida
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
router.delete('/delete/:id', async function (req, res) {
    try {
        let user = authUtils.validateToken(req.headers.authorization)

        if (user.validated) {
            var { id } = req.params

            if (!isNaN(id)) {
                if(await entries.remove(user?._id, id)){
                    res.sendStatus(200)
                }else{
                    res.sendStatus(204)
                }                
            } else {
                res.sendStatus(400)
            }
        } else {
            res.sendStatus(401)
        }
    } catch (err) {
        console.error('Error while deleting Entry')
        res.sendStatus(500)
    }
});

/**
 * @swagger
 * /entrada/edit/{entry_id}:
 *   put:
 *     summary: Altera uma entrada de um usuário/ano especificado.
 *     tags: [Entradas]
 *     parameters:
 *       - in: path
 *         name: entry_id
 *         schema:
 *           type: integer
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reference_date:
 *                 type: string
 *                 format: date-time
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
            var { entry_id } = req.params
            var { reference_date } = req.body

            if (moment(reference_date).isValid() || !isNaN(entry_id)) {
                if (await entries.alter(user?._id, entry_id, reference_date)) {
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
        console.error('Error while altering Entry')
        res.sendStatus(500);
    }
})

/**
 * @swagger
 * /entrada/get/{entry_id}:
 *   get:
 *     summary: Obtem a entrada de um identificador especificado.
 *     tags: [Entradas]
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
 *                 $ref: '#/definitions/schemas/ReturnEntry'
 */
router.get('/get/:entry_id', async function (req, res) {
    try {
        let user = authUtils.validateToken(req.headers.authorization)

        if (user.validated) {
            let { entry_id } = req.params
            if (!isNaN(entry_id)) {
                let result = await entries.get(user?._id, entry_id)

                res.json(result).status(200)
            } else {
                res.sendStatus(400)
            }
        } else {
            res.sendStatus(401)
        }
    } catch (err) {
        console.error('Error while fetching a Entry')
        console.error(err)
        res.sendStatus(500)
    }
})

/**
 * @swagger
 * /entrada/getAll/{year}:
 *   get:
 *     summary: Obtem todas as entradas para um usuário/ano especificados.
 *     tags: [Entradas]
 *     parameters:
 *       - in: path
 *         name: year
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
 *                 $ref: '#/definitions/schemas/ReturnEntries'
 */
router.get('/getAll/:year', async function (req, res) {
    try {
        let user = authUtils.validateToken(req.headers.authorization)

        if (user.validated) {
            let { year } = req.params
            if (!isNaN(year)) {
                let result = await entries.getAll(user?._id, year)

                res.json(result).status(200)
            } else {
                res.sendStatus(400)
            }
        } else {
            res.sendStatus(401)
        }
    } catch (err) {
        console.error('Error while fetching all Entries')
        console.error(err)
        res.sendStatus(500);
    }
})

module.exports = router;