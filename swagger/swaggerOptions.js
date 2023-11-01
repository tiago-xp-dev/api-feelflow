const options = {
    definition: {        
        openapi: "3.0.0",        
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
                Entry: {
                    type: "object",
                    properties:{
                        reference_date:{
                            type: "string",
                            format: "date-time"
                        },
                        user_id:{
                            type:"integer"
                        }
                    }
                }
            }
        },
        info: {
            title: "FeelFlow API",
            version: "0.0.1",
            description: "API do Aplicativo FeelFlow. Engenharia de Software Unifae"          
        }        
    },
    apis: ["./routes/*.js"],
}

module.exports = options