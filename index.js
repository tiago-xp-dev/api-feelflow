// Porta na qual será disponibilizada a aplicação.
const PORT = 8000

//#region IMPORTS
// Importação do Express + Body Parser.
const express = require('express'),
    app = express(),
    bodyParser = require('body-parser')

// Importação do Swagger.
const swaggerJsdoc = require('swagger-jsdoc'),
    swaggerUi = require('swagger-ui-express'),
    swaggerOptions = require('./swagger/swaggerOptions')

// Importação do Banco de Dados.
const connection = require('./database/connection')

// Importação dos Modelos (Garante a sequência de criação das Tabelas).
const usersModel = require('./database/usersModel'),
    entriesModel = require('./database/entriesModel'),    
    emotionsModel = require('./database/emotionsModel'),
    emotionTypesModel = require('./database/emotionTypesModel'),
    emotionsEntryModel = require('./database/emotionsEntryModel'),
    notesModel = require('./database/notesModel')
    //locationsModel = require('./database/locationsModel'),

// Importação das Rotas.
const usersRoutes = require('./routes/users'),
    entriesRoutes = require('./routes/entries'),
    emotionsRoutes = require('./routes/emotions'),
    compositionRoutes = require('./routes/composition'),
    notesRoutes = require('./routes/notes')

// Importando o Request (realizar chamadas à APIs externas).
const request = require('request');
//#endregion

// Configurando Body Parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Conectando ao Banco de dados.
connection.authenticate().then(() => {
    console.log('Banco de dados\t\t\t\t\t[OK]')
}).catch((msgErro) => {
    console.log('Banco de dados\t\t\t\t\t[FAILED]')
    console.log(msgErro)
})

// Inicialização das Rotas.
app.use('/user', usersRoutes)
app.use('/entry', entriesRoutes)
app.use('/emotion', emotionsRoutes)
app.use('/composition', compositionRoutes)
app.use('/note', notesRoutes)

// Inicialização do Swagger.
const specs = swaggerJsdoc(swaggerOptions.specs);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.listen(PORT, () => {
    console.log('API\t\t\t\t\t\t[OK]')
    console.log('Porta\t\t\t\t\t\t[' + PORT + ']')
})