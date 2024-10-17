// src/config/swaggerOptions.js
const swaggerJsDoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Koi Farm Shop API',
      version: '1.0.0',
      description: 'API cho Koi Farm để quản lý cá loại cá Koi',
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(options);
module.exports = swaggerDocs;
