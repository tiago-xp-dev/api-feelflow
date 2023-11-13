const express = require('express')
const multer = require('multer')
const images = require('../services/images')
const router = express.Router()
const upload = multer()
const authUtils = require('../utils/authenticationUtils')

/**
 * @swagger
 * tags:
 *   name: Images
 *   description: Manejo de Imagens do Diário
 */

/**
 * @swagger
 * /image/upload/{entry_id}:
 *   post:
 *     summary: Adiciona uma Imagem para uma Entrada
 *     tags: [Images]
 *     parameters:
 *       - in: path
 *         name: entry_id
 *         schema:
 *           type: integer
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               fileName:
 *                 type: string
 *                 format: base64
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
router.post('/upload/:entry_id', upload.any(), async function (req, res) {
    try {
        let user = authUtils.validateToken(req.headers.authorization)

        if (user.validated) {      
            let {entry_id } = req.params      
            let file = req.files[0]
            if(file != undefined && file.mimetype == 'image/png' ||file.mimetype == 'image/jpeg'){
                images.create(user?._id, entry_id, file.buffer)
            }else{
                res.sendStatus(400)
            }
            res.sendStatus(200)
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
 * /image/get/{entry_id}/{image_id}:
 *   get:
 *     summary: Lê as Imagens de uma Entrada
 *     tags: [Images]
 *     parameters:
 *       - in: path
 *         name: entry_id
 *         schema:
 *           type: integer
 *         required: true
 *       - in: path
 *         name: image_id
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
 */
 router.get('/get/:entry_id/:image_id', async function (req, res) {
    try {
        let user = authUtils.validateToken(req.headers.authorization)

        if (user.validated) {            
            let { entry_id, image_id } = req.params
            if (!isNaN(entry_id) && !isNaN(image_id)) {
                let result = await images.read(user?._id, entry_id, image_id)
                res.contentType('image/png')
                res.send(result.image).status(200)
            } else {
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
 * /image/getIds/{entry_id}:
 *   get:
 *     summary: Lê os Identificadores das Imagens de uma Entrada
 *     tags: [Images]
 *     parameters:
 *       - in: path
 *         name: entry_id
 *         schema:
 *           type: integer
 *         required: true
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
 router.get('/getIds/:entry_id', async function (req, res) {
    try {
        let user = authUtils.validateToken(req.headers.authorization)

        if (user.validated) {            
            let { entry_id } = req.params
            if (!isNaN(entry_id)) {
                let result = await images.readIds(user?._id, entry_id)
                res.json(result).status(200)
            } else {
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
 * /image/delete/{entry_id}/{image_id}:
 *   delete:
 *     summary: Deleta uma Imagem de uma entrada.
 *     tags: [Images]
 *     parameters:
 *       - in: path
 *         name: entry_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Valor numérico representando o ID da entrada da Imagem a ser removida.
 *       - in: path
 *         name: image_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Valor numérico representando o ID da Imagem a ser removida.
 *     responses:
 *       200:
 *         description: OK
 */
 router.delete('/delete/:entry_id/:image_id', async function (req, res) {
    try {
        let user = authUtils.validateToken(req.headers.authorization)

        if (user.validated) {
            let { entry_id, image_id } = req.params
            if (!isNaN(entry_id)) {
                if (images.destroy(user?._id, entry_id, image_id)) {
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
        console.error('Error deleting Image')
        console.log(err)
        res.sendStatus(500)
    }
})

module.exports = router