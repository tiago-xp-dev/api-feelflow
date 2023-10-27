const options = {
    definition: {
        openapi: "3.1.0",
        definitions: {
            schemas: {
                User: {
                    type: "object",
                    properties: {
                        user_name: {
                            type: "string",
                            example: "Fernando"
                        },
                        password: {
                            type: "string",
                            example: "#Senha#1234"
                        },
                        email: {
                            type: "string",
                            example: "fernando@email.com"
                        }
                    }
                },
                UserAuth: {
                    type: "object",
                    properties: {
                        password: {
                            type: "string",
                            example: "#Senha#1234"
                        },
                        email: {
                            type: "string",
                            example: "fernando@email.com"
                        }
                    }
                },
            }
        },
        info: {
            title: "FeelFlow API",
            version: "0.0.1",
            description: "API do Aplicativo FeelFlow. Engenharia de Software Unifae",
            contact: {
                name: "Tiago Xavier de Paiva",
                email: "tiagoxp.desenvolvedor@gmail.com",
            },
        },
        servers: [{
            url: "http://localhost:8000",
        }, ],
    },
    apis: ["./routes/*.js"],
}

module.exports = options