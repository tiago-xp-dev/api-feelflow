const express = require('express');
const router = express.Router();
const authUtils = require('../utils/authenticationUtils')
const entryCompositionModel = require('../services/entryComposition')

/**
 * @swagger
 * tags:
 *   name: Composição
 *   description: Manejo de Informações Compostas
 */

/**
 * @swagger
 * /composicao/entrada/{entry_id}/emotion/{emotion_id}:
 *   post:
 *     summary: Agrega uma Emoção para uma Entrada
 *     tags: [Composição]
 *     parameters:
 *       - in: path
 *         name: entry_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Valor numérico representando o ID da Entrada
 *       - in: path
 *         name: emotion_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Valor numérico representando o ID da Emoção
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
router.post('/entrada/:entry_id/emotion/:emotion_id', async (req, res) => {
    try {
        let user = authUtils.validateToken(req.headers.authorization)

        if (user.validated) {
            let { emotion_id, entry_id } = req.params

            if(!isNaN(emotion_id) && !isNaN(entry_id)){
                await entryCompositionModel.addEmotionToEntry(emotion_id, entry_id)
                res.sendStatus(200)
            }else{
                res.sendStatus(400)
            }
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
 * /composicao/entrada/{entry_id}/emotion/{emotion_id}:
 *   delete:
 *     summary: Remove uma Emoção de uma Entrada
 *     tags: [Composição]
 *     parameters:
 *       - in: path
 *         name: entry_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Valor numérico representando o ID da Entrada
 *       - in: path
 *         name: emotion_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Valor numérico representando o ID da Emoção
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
 router.delete('/entrada/:{entry_id}/emotion/:{emotion_id}', async (req, res) => {
    try {
        let user = authUtils.validateToken(req.headers.authorization)

        if (user.validated) {
            let { emotion_id, entry_id } = req.params

            if(!isNaN(emotion_id) && !isNaN(entry_id)){
                await entryCompositionModel.removeEmotionFromEntry(emotion_id, entry_id)
                res.sendStatus(200);
            }else{
                res.sendStatus(400)
            }
        } else {
            res.sendStatus(401)
        }
    } catch (err) {
        console.error('Error while creating Emotion')
        console.log(err)
        res.sendStatus(500)
    }
})

module.exports = router