const { response } = require('express');
const express = require('express');
const router = express.Router();
const entries = require('../services/entries');

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
/* POST user. */
router.post('/create', async function (req, res) {
    try {
        var { user_id, reference_date} = req.body
        res.json(await entries.createEntry(reference_date, user_id)).status(200);
    } catch (err) {
        console.error('Error while creating Entry')
        res.sendStatus(500)
    }
});


/**
 * @swagger
 * /entry/delete/{id}:
 *   delete:
 *     summary: Cria uma entrada
 *     tags: [Entries]
 *     parameters:
 *       - in: id
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Valor numérico representando o ID da entrada a ser removida
 *     responses:
 *       200:
 *         description: OK
 */
/* POST user. */
router.delete('/delete/:id', async function (req, res) {
    try {
        var {id} = req.params
        res.json(await entries.removeEntry(id)).status(200);
    } catch (err) {
        console.error('Error while creating Entry')
        res.sendStatus(500)
    }
});

router.get('/getAll/:user_id/:year', async function (req, res) {
    try{
        var { user_id } = req.params
        res.json(await entries.getAllByUser(user_id))
    } catch (err){
        console.error('Error while fetching all Entries')
        res.sendStatus(500);
    }
})

module.exports = router;