import { port } from './config.js';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';


const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Courier API',
            version: '1.0.0',
            description: 'API documentation for Courier application',
        },
        servers: [
            {
                url: `http://localhost:${port}/api`,
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./routes/*.js'], // Archivos que contienen anotaciones Swagger
};

const specs = swaggerJsdoc(options);

export { swaggerUi, specs };