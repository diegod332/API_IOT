const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Gestión de Citas en IOT',
            version: '1.0.0',
            description: 'Documentación de la API para gestionar citas en un consultorio dental.',
        },
        servers: [
            {
                url: `http://localhost:${process.env.APP_PORT || 3000}/api`,  
            },
        ],
        components: {
            schemas: {
                Appointment: {
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'ID de la cita',
                        },
                        client: {
                            type: 'object',
                            properties: {
                                first_name: {
                                    type: 'string',
                                    description: 'Nombre del cliente',
                                },
                                last_name: {
                                    type: 'string',
                                    description: 'Apellido del cliente',
                                },
                            },
                        },
                        appointment_date: {
                            type: 'string',
                            format: 'date',
                            description: 'Fecha de la cita',
                        },
                        appointment_time: {
                            type: 'string',
                            description: 'Hora de la cita',
                        },
                        notified: {
                            type: 'boolean',
                            description: 'Indica si el cliente ha sido notificado',
                        },
                    },
                },
            },
        },
        paths: {
            '/next-appointment': {
                get: {
                    tags: ['Citas'],
                    summary: 'Obtener próximas citas',
                    description: 'Devuelve una lista de las próximas citas agendadas.',
                    responses: {
                        200: {
                            description: 'Lista de próximas citas',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'array',
                                        items: {
                                            $ref: '#/components/schemas/Appointment',
                                        },
                                    },
                                },
                            },
                        },
                        404: {
                            description: 'No hay citas disponibles',
                        },
                        500: {
                            description: 'Error interno del servidor',
                        },
                    },
                },
            },
            '/mark-notified/{id}': {
                post: {
                    tags: ['Citas'],
                    summary: 'Marca una cita como notificada',
                    parameters: [
                        {
                            name: 'id',
                            in: 'path',
                            required: true,
                            schema: { type: 'string' },
                            description: 'ID de la cita a actualizar',
                        },
                    ],
                    responses: {
                        200: { description: 'Cita marcada como notificada' },
                        400: { description: 'ID inválido' },
                        404: { description: 'Cita no encontrada' },
                        500: { description: 'Error interno' },
                    },
                },
            },
            '/create-appointment': {
                post: {
                    tags: ['Citas'],
                    summary: 'Crea una nueva cita',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        first_name: { type: 'string' },
                                        last_name: { type: 'string' },
                                        appointment_date: { type: 'string', format: 'date' },
                                        appointment_time: { type: 'string' },
                                    },
                                    required: ['first_name', 'last_name', 'appointment_date', 'appointment_time'],
                                },
                            },
                        },
                    },
                    responses: {
                        201: { description: 'Cita creada exitosamente' },
                        400: { description: 'Faltan datos obligatorios' },
                        500: { description: 'Error interno' },
                    },
                },
            },
            '/appointment-status/{id}': {
                get: {
                    tags: ['Citas'],
                    summary: 'Obtiene el estado de una cita',
                    parameters: [
                        {
                            name: 'id',
                            in: 'path',
                            required: true,
                            schema: { type: 'string' },
                            description: 'ID de la cita',
                        },
                    ],
                    responses: {
                        200: { description: 'Estado de la cita obtenido' },
                        400: { description: 'ID inválido' },
                        404: { description: 'Cita no encontrada' },
                        500: { description: 'Error interno' },
                    },
                },
            },
            '/update-appointment-status/{id}': {
                post: {
                    tags: ['Citas'],
                    summary: 'Actualiza el estado de una cita',
                    parameters: [
                        {
                            name: 'id',
                            in: 'path',
                            required: true,
                            schema: { type: 'string' },
                            description: 'ID de la cita',
                        },
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        notified: { type: 'boolean' },
                                    },
                                    required: ['notified'],
                                },
                            },
                        },
                    },
                    responses: {
                        200: { description: 'Estado actualizado correctamente' },
                        400: { description: 'Datos inválidos' },
                        404: { description: 'Cita no encontrada' },
                        500: { description: 'Error interno' },
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
    console.log(`📄 Documentación disponible en: http://localhost:${process.env.APP_PORT || 3000}/api-docs`);
};

module.exports = swaggerDocs;
