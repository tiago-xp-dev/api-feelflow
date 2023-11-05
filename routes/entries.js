// TODO: REALIZAR A DOCUMENTAÇÃO SWAGGER ADEQUADAMENTE 
//       E MELHORAR OS RETORNOS DOS ENDPOINTS PARA 
//       ALGUMA FORMA PADROZINADA AFIM DE FACILITAR O CONSUMO

const express = require('express');
const router = express.Router();
const entries = require('../services/entries');
const authUtils = require('../utils/authenticationUtils')
const moment = require('moment')

/**
 * @swagger
 * tags:
 *   name: Entries
 *   description: Manejo de Entradas do Diário
 */

/**
 * @swagger
 * /entry/create:
 *   post:
 *     summary: Cria uma entrada
 *     tags: [Entries]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/schemas/Entry'
 *     responses:
 *       200:
 *         description: OK
 */
router.post('/create', async function (req, res) {
    try {
        let user = authUtils.validateToken(req.headers.authorization)

        if (user.validated) {
            let { reference_date } = req.body
            res.json(await entries.create(user?._id, reference_date)).status(200);
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
 * /entry/delete/{entry_id}:
 *   delete:
 *     summary: Delete uma entrada.
 *     tags: [Entries]
 *     parameters:
 *       - in: path
 *         name: entry_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Valor numérico representando o ID da entrada a ser removida
 *     responses:
 *       200:
 *         description: OK
 */
router.delete('/delete/:id', async function (req, res) {
    try {
        let user = authUtils.validateToken(req.headers.authorization)

        if (user.validated) {
            var { id } = req.params

            if (!isNaN) {
                res.json(await entries.remove(user?._id, id)).status(200);
            } else {
                res.sendStatus(204)
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
 * /entry/edit/{entry_id}:
 *   put:
 *     summary: Altera uma entrada de um usuário/ano especificado.
 *     tags: [Entries]
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
 *         description: OK
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
 * /entry/get/{entry_id}:
 *   get:
 *     summary: Obtem a entrada de um identificador especificado.
 *     tags: [Entries]
 *     parameters:
 *       - in: path
 *         name: entry_id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: OK
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
 * /entry/getAll/{year}:
 *   get:
 *     summary: Obtem todas as entradas para um usuário/ano especificados.
 *     tags: [Entries]
 *     parameters:
 *       - in: path
 *         name: year
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: OK
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