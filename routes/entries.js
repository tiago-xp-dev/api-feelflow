const { response } = require('express');
const express = require('express');
const router = express.Router();
const entries = require('../services/entries');
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
        var { user_id, reference_date} = req.body
        res.json(await entries.create(reference_date, user_id)).status(200);
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
router.delete('/delete/:id', async function (req, res) {
    try {
        var {id} = req.params
        res.json(await entries.remove(id)).status(200);
    } catch (err) {
        console.error('Error while creating Entry')
        res.sendStatus(500)
    }
});

/**
 * @swagger
 * /entry/get/{user_id}/{year}:
 *   get:
 *     summary: Obtem todas as entradas para um usuário/ano especificados.
 *     tags: [Entries]
 *     parameters:
 *       - in: user_id
 *         name: user_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Valor numérico representando o ID do usuário detentor da entrada.
 *       - in: year
 *         name: year
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/getAll/:user_id/:year', async function (req, res) {
    try{
        var { user_id } = req.params
        res.json(await entries.getAll(user_id))
    } catch (err){
        console.error('Error while fetching all Entries')
        res.sendStatus(500);
    }
})

/**
 * @swagger
 * /entry/put/{user_id}/{entry_id}:
 *   put:
 *     summary: Altera uma entrada de um usuário/ano especificado.
 *     tags: [Entries]
 *     parameters:
 *       - in: user_id
 *         name: user_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Valor numérico representando o ID do usuário detentor da entrada.
 *       - in: entry_id
 *         name: entry_id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: OK
 */
router.put('/edit/:user_id/:entry_id/', async function (req, res){ 
    try{
        var { user_id, entry_id} = req.params
        var { reference_date} = req.body

        if(moment(reference_date).isValid()){
            if(entries.alter(entry_id, user_id, reference_date)){
                res.sendStatus(200)
            }else{
                // TODO: VERIFICAR SE O STATUS ESTÁ ADEQUADO.
                res.sendStatus(204)
            }
        }else{
            res.sendStatus(400)
        }        
    }catch(err){
        console.error('Error while altering Entry')
        res.sendStatus(500);
    }
})

module.exports = router;