const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();
const ip = require("ip");

const HOST = ip.address(); 


const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Gestión de IOT',
            version: '1.0.0',
            description: 'Documentación de la API para gestionar dispositivos IOT.',
        },
        servers: [
            {
                url: `http://${HOST}:${process.env.APP_PORT || 3000}/api`,  
            },
        ],
        components: {
            schemas: {
                Config: {
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'ID de la configuración',
                        },
                        elemento: {
                            type: 'string',
                            description: 'Nombre del componente',
                        },
                        estado: {
                            type: 'number',
                            description: 'Estado del componente',
                        },
                        valor: {
                            type: 'number',
                            description: 'Valor del componente',
                        },
                        unidadMedida: {
                            type: 'string',
                            description: 'Unidad de medida del valor',
                        },
                    },
                },
            },
        },
        paths: {
            '/config': {
                get: {
                    tags: ['Configuración'],
                    summary: 'Obtiene la configuración actual',
                    responses: {
                        200: {
                            description: 'Configuración obtenida correctamente',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        additionalProperties: {
                                            type: 'number',
                                        },
                                    },
                                },
                            },
                        },
                        500: {
                            description: 'Error interno del servidor',
                        },
                    },
                },
                post: {
                    tags: ['Configuración'],
                    summary: 'Guarda una nueva configuración',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Config',
                                },
                            },
                        },
                    },
                    responses: {
                        201: {
                            description: 'Configuración guardada correctamente',
                        },
                        400: {
                            description: 'Datos inválidos',
                        },
                        500: {
                            description: 'Error interno del servidor',
                        },
                    },
                },
            },
            '/config/arduino': {
                get: {
                    tags: ['Configuración'],
                    summary: 'Obtiene la configuración específica para Arduino',
                    responses: {
                        200: {
                            description: 'Configuración obtenida correctamente',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        additionalProperties: {
                                            type: 'object',
                                            properties: {
                                                estado: {
                                                    type: 'number',
                                                },
                                                valor: {
                                                    type: 'number',
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        500: {
                            description: 'Error interno del servidor',
                        },
                    },
                },
            },
            '/config/{elemento}': {
                put: {
                    tags: ['Configuración'],
                    summary: 'Actualiza una configuración por nombre del elemento',
                    parameters: [
                        {
                            name: 'elemento',
                            in: 'path',
                            required: true,
                            schema: { type: 'string' },
                            description: 'Nombre del dispositivo a actualizar',
                        },
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        estado: {
                                            type: 'number',
                                            description: 'Nuevo estado del dispositivo',
                                        },
                                        valor: {
                                            type: 'number',
                                            description: 'Nuevo valor del dispositivo',
                                        },
                                    },
                                },
                            },
                        },
                    },
                    responses: {
                        200: {
                            description: 'Configuración actualizada correctamente',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Config',
                                    },
                                },
                            },
                        },
                        404: {
                            description: 'Configuración no encontrada',
                        },
                        500: {
                            description: 'Error interno del servidor',
                        },
                    },
                },
            },
        },
    },
    apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log(`📄 Documentación disponible en: http://${HOST}:${process.env.APP_PORT || 3000}/api-docs`);
};

module.exports = swaggerDocs;