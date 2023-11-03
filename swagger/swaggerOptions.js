const specs = {
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
                    properties: {
                        reference_date: {
                            type: "string",
                            format: "date-time"
                        }
                    }
                },
                ParameterEmotion: {
                    type: "object",
                    properties: {
                        description: {
                            type: "string",
                            example: "Alegre"
                        },
                        primary_type_id: {
                            type: "integer",
                            example: 1,
                        },
                        primary_weight: {
                            type: "float",
                            example: 1.1234,
                        },
                        secondary_type_id: {
                            type: "integer",
                            example: 3,
                        },
                        secondary_weight: {
                            type: "float",
                            example: 1.1234,
                        }
                    }
                },
                ReturnEmotion: {
                    type: "object",
                    properties: {
                        user_id: {
                            type: "integer",
                            example: 0,
                        },
                        description: {
                            type: "string",
                            example: "Alegre"
                        },
                        primary_type: {
                            type: "object",
                            properties: {
                                id: {
                                    type: "integer",
                                    example: 1,
                                },
                                description: {
                                    type: "string",
                                    example: "Energizado",
                                }
                            }
                        },
                        primary_weight: {
                            type: "float",
                            example: 1.1234,
                        },
                        secondary_type: {
                            type: "object",
                            properties: {
                                id: {
                                    type: "integer",
                                    example: 3,
                                },
                                description: {
                                    type: "string",
                                    example: "Agradável",
                                }
                            }
                        },
                        secondary_weight: {
                            type: "float",
                            example: 1.1234,
                        }
                    }
                }
            }
        },
        info: {
            title: "FeelFlow API",
            version: "0.0.1",
            description: "API do Aplicativo FeelFlow. Engenharia de Software Unifae"
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            }
        },
        security: [{
            bearerAuth: []
        }]
    },
    apis: ["./routes/*.js"],
}

const options = {

}

module.exports = {
    specs,
    options
}