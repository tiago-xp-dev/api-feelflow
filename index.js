const express = require("express")
const app = express()
const bodyParser = require('body-parser')

// Porta na qual será disponibilizada a aplicação.
const PORT = 8080

const connection = require('./database/connection')
const userModel = require('./database/usersModel')
const notesModel = require('./database/notesModel')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Utilizando o Request para realizar as chamadas à API.
var request = require('request');
const { json } = require("sequelize")

// Banco de dados.
connection.
authenticate().then(() => {
    console.log("Banco de dados \t[OK]")
}).catch((msgErro) => {
    console.log(msgErro)
})

// Rotas
app.put('/game/:id', (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400)
    } else {
        var id = parseInt(req.params.id)

        gameModel.findOne({
            where: { id: id }
        }).then(game => {
            if (game != undefined) {
                var { title, year } = req.body

                if (title != undefined) {
                    game.title = title
                }

                if (year != undefined) {
                    game.year = year
                }
                game.save()
                res.sendStatus(200);
            } else {
                res.sendStatus(400);
            }
        })
    }
})

app.delete('/game/:id', (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400);
    } else {
        var id = parseInt(req.params.id)

        gameModel.destroy({
            where: {
                id: id
            }
        }).then(() => {
            res.sendStatus(200)
        })
    }
})

app.post('/game', (req, res) => {
    var { title, year } = req.body
    gameModel.create({
        title: title,
        year: year
    }).then(() => {
        res.sendStatus(200)
    })
})

app.get('/games/:id', (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400)
    } else {
        var id = parseInt(req.params.id)

        gameModel.findOne({
            raw: true,
            where: { id, id }
        }).then(game => {
            if (game != undefined) {
                res.json(game)
            } else {
                res.sendStatus(404)
            }
        })
    }
})

app.get('/games', (req, res) => {
    gameModel.findAll({
        raw: true,
        order: [
            ['id', 'DESC']
        ]
    }).then(games => {
        res.json(games);
    })
})

app.listen(PORT, () => {
    console.log('API \t\t[OK]')
    console.log('Porta \t\t[' + PORT + ']')
})