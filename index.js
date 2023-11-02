// Porta na qual será disponibilizada a aplicação.
const PORT = 8000

//#region IMPORTS
// Importação do Express + Body Parser.
const express = require("express")
const app = express()
const bodyParser = require('body-parser')

// Importação do Swagger.
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const swaggerOptions = require('./swagger/swaggerOptions')

// Importação do Banco de Dados.
const connection = require('./database/connection')

// Importação das Rotas.
const usersRoutes = require('./routes/users')
const entriesRoutes = require('./routes/entries')
const emotionsRoutes = require('./routes/emotions')

// Importando o Request (realizar chamadas à APIs externas).
const request = require('request');
//#endregion

// Configurando Body Parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Conectando ao Banco de dados.
connection.authenticate().then(() => {
    console.log("Banco de dados \t\t[OK]")
}).catch((msgErro) => {
    console.log("Banco de dados \t\t[FAILED]")
    console.log(msgErro)
})

// Inicialização das Rotas.
app.use("/user", usersRoutes)
app.use("/entry", entriesRoutes)
app.use("/emotion", emotionsRoutes)

// Inicialização do Swagger.
const specs = swaggerJsdoc(swaggerOptions.specs);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(PORT, () => {
    console.log('API \t\t\t[OK]')
    console.log('Porta \t\t\t[' + PORT + ']')
})