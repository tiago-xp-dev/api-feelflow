const express = require('express');
const router = express.Router();
const emotionModel = require('../services/emotions');
const authUtils = require('../utils/authenticationUtils')
const strUtils = require('../utils/stringUtils')

/**
 * @swagger
 * tags:
 *   name: Emotions
 *   description: Manejo de Emoções
 */

/**
 * @swagger
 * /emotion/create:
 *   post:
 *     summary: Cria uma Emoção
 *     tags: [Emotions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/schemas/ParameterEmotion'
 *     responses:
 *       200:
 *         description: OK
 */
router.post('/create', async (req, res) => {
    try {
        let user = authUtils.validateToken(req.headers.authorization)

        if (user.validated) {
            let {
                description,
                primary_type,
                primary_weight,
                secondary_type,
                secondary_weight
            } = req.body

            await emotionModel.create(
                user?._id,
                description,
                primary_type,
                primary_weight,
                secondary_type,
                secondary_weight,
            )

            res.sendStatus(200);
        } else {
            res.sendStatus(401)
        }
    } catch (err) {
        console.error('Error while creating Emotion')
        console.log(err)
        res.sendStatus(500)
    }
})

/**
 * @swagger
 * /emotion/delete/{emotion_id}:
 *   delete:
 *     summary: Deleta uma emoção.
 *     tags: [Emotions]
 *     parameters:
 *       - in: path
 *         name: emotion_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Valor numérico representando o Id da emoção a ser removida
 *     responses:
 *       200:
 *         description: OK
 */
router.delete('/delete/:id', async (req, res) => {
    try {
        let user = authUtils.validateToken(req.headers.authorization)

        if (user.validated) {
            let { id } = req.params

            if (!isNaN) {
                res.json(await emotionModel.remove(user?._id, id)).status(200)
            } else {
                res.sendStatus(204)
            }
        } else {
            res.sendStatus(401)
        }
    } catch (err) {
        console.error('Error while deleting Emotion')
        console.log(err)
        res.sendStatus(500)
    }
})

/**
 * @swagger
 * /emotion/edit/{emotion_id}:
 *   put:
 *     summary: Altera uma emoção de um Id especificado.
 *     tags: [Emotions]
 *     parameters:
 *       - in: path
 *         name: emotion_id
 *         schema:
 *           type: integer
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/schemas/ParameterEmotion'
 *     responses:
 *       200:
 *         description: OK
 */
router.put('/edit/{emotion_id}', async (req, res) => {
    try {
        let user = authUtils.validateToken(req.headers.authorization)

        if (user.validated) {
            let { emotion_id } = req.params
            let { description, intensity_weight, type_id } = req.body

            if (!isNaN(emotion_id) && strUtils.isNullOrEmpty(description) && !isNaN(intensity_weight) && !isNaN(type_id)) {
                if (await emotionModel.edit(user?._id, emotion_id, description, intensity_weight, type_id)) {
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
        console.error('Error while altering Emotion')
        console.log(err)
        res.sendStatus(500)
    }
})

/**
 * @swagger
 * /emotion/get/{emotion_id}:
 *   get:
 *     summary: Obtem uma emoção para um Id especificado.
 *     tags: [Emotions]
 *     parameters:
 *       - in: path
 *         name: emotion_id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/get/:emotion_id', async (req, res) => {
    try {
        let user = authUtils.validateToken(req.headers.authorization)

        if (user.validated) {
            let { emotion_id } = req.params
            if (!isNaN(emotion_id)) {
                let result = await emotionModel.get(user?._id, emotion_id)

                res.json(result).status(200)
            }
        } else {
            res.sendStatus(401)
        }
    } catch (error) {
        console.log('Error while fetching a Emotion')
        console.log(err)
        res.sendStatus(500)
    }
})

/**
 * @swagger
 * /emotion/getAll:
 *   get:
 *     summary: Obtem todas as emoções.
 *     tags: [Emotions]
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/getAll', async (req, res) => {
    try {
        let user = authUtils.validateToken(req.headers.authorization)

        if (user.validated) {
            let result = await emotionModel.getAll(user?._id)

            res.json(result).status(200)
        } else {
            res.sendStatus(401)
        }
    } catch (err) {
        console.log('Error while fetching all Emotions')
        console.log(err)
        res.sendStatus(500)
    }
})

module.exports = router