// src/config/swaggerOptions.js
const swaggerJsDoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Koi Farm API',
      version: '1.0.0',
      description: 'API cho Koi Farm để quản lý cá Koi',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Địa chỉ của API
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Đường dẫn tới các tệp route của bạn
};

const swaggerDocs = swaggerJsDoc(options);
module.exports = swaggerDocs;
